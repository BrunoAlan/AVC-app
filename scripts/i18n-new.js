/* eslint-disable no-console, no-cond-assign */
const axios = require("axios");
const fs = require("fs");
const mkdirp = require("mkdirp");
const { AVAILABLE_LANGUAGES } = require("../src/constants/Languages");

const projectToken = "proj_readonly_R0wcL2vUtMVWm58iLDD1zA";
const targetDir = "static/langs";
const projectLabel = "projectecho-bookingflow-mobile";

async function main() {
  // Cargamos globby dinámicamente (podrías usar import estático si tu versión de Node lo permite).
  const { default: globby } = await import("globby");
  const { default: pLimit } = await import("p-limit");

  // Retorna el número total de páginas desde los headers de la respuesta.
  function getTotalPagesFromHeaders(headers) {
    // El link header es algo como:
    // <https://webtranslateit.com/api/projects/...&page=2>; rel="next",
    // <https://webtranslateit.com/api/projects/...&page=14>; rel="last"
    const regex = /strings\.json\?[^>]*page=(\d+)[^>]*>; rel="last"/;
    let totalPages = -1;
    Object.keys(headers).forEach((header) => {
      if (header === "link") {
        const match = headers[header].match(regex);
        if (match) {
          [, totalPages] = match;
        }
      }
    });
    return totalPages;
  }

  /**
   * Obtiene todos los strings de WebTranslateIt (WTI),
   * juntando la información de todas las páginas que devuelva su API.
   */
  async function getStrings() {
    try {
      const targetLangs = AVAILABLE_LANGUAGES.join();
      const baseUrl = `https://webtranslateit.com/api/projects/${projectToken}/strings.json`;
      const getStringsUrl = `${baseUrl}?locale=${targetLangs}`;
      
      // Pedimos la primera página para saber cuántas hay en total.
      const firstPageResponse = await axios.get(`${getStringsUrl}&page=1`);
      const totalPages = getTotalPagesFromHeaders(firstPageResponse.headers);

      // Si solo hay una página, devolvemos directamente sus datos.
      if (totalPages <= 1) {
        return firstPageResponse.data;
      }

      // Preparamos el resto de requests.
      const allRequests = [];
      for (let i = 2; i <= totalPages; i++) {
        allRequests.push(`${getStringsUrl}&page=${i}`);
      }

      // Configuramos p-limit para hacer hasta 30 descargas simultáneas.
      const limit = pLimit(30);
      let count = 1;

      console.log(`WTI requests done: 1 of ${totalPages} (page=1 descargada)`);

      // Descargamos todas las páginas restantes en paralelo con límite de concurrencia.
      const otherPagesData = await Promise.all(
        allRequests.map((url) =>
          limit(async () => {
            const response = await axios.get(url);
            count += 1;
            process.stdout.write(
              `\rWTI requests done: ${count} of ${totalPages}\n`
            );
            return response.data;
          })
        )
      );

      // Concatenamos la data de la primera página y del resto.
      return firstPageResponse.data.concat(...otherPagesData);
    } catch (error) {
      console.error(error);
      // Si hay error, cortamos con código distinto de 0.
      process.exit(1);
    }
  }

  /**
   * Envía un request para actualizar las labels de un string en WTI.
   * @param {Number} stringId
   * @param {String} stringKey
   * @param {Object} dataToUpdate
   */
  async function updateLabelsRequest(stringId, stringKey, dataToUpdate) {
    // https://webtranslateit.com/en/docs/api/string/#update-string
    const updateStringUrl = `https://webtranslateit.com/api/projects/${projectToken}/strings/${stringId}`;
    try {
      await axios.put(updateStringUrl, dataToUpdate, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(`Error when updating the labels for "${stringKey}"`);
    }
  }

  /**
   * Para evitar la limitación de tasa de WTI (20 requests/segundo),
   * procesamos en chunks de un tamaño fijo y esperamos un intervalo entre chunks.
   * @param {Array} labelsData Array con datos para actualizar.
   * @param {Number} maxRequestsPerInterval Cantidad de requests por chunk.
   * @param {Number} interval Tiempo de espera entre chunks (ms).
   */
  async function updateLabels(labelsData, maxRequestsPerInterval, interval) {
    while (labelsData.length > 0) {
      const currentChunk = labelsData.splice(0, maxRequestsPerInterval);
      console.log(
        `updating ${currentChunk.length} keys, ${labelsData.length} remaining...`
      );

      // Esperamos a que se completen todas las requests de este chunk en paralelo.
      await Promise.all(
        currentChunk.map(({ id, key, dataToUpdate }) =>
          updateLabelsRequest(id, key, dataToUpdate)
        )
      );

      // Si aún quedan, esperamos el intervalo antes de continuar.
      if (labelsData.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    }
    console.log("\nlabels update is complete");
  }

  // Escaneamos el proyecto para obtener todos los keys usados.
  const filesToSearchForKeys = await globby(["pages/*.js", "src/**/*.js", "src/app/"], {
    ignore: ["src/__test__/**/*.js"],
  });

  const keysUsedInProject = [];
  filesToSearchForKeys.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf8");
    // Podemos tener varias expresiones para detectar más patrones.
    const detectKeysExpressions = [
      /\bt\(\s*['"]([^'"]+)['"]\s*\)/gi, // t('key')
    ];

    detectKeysExpressions.forEach((regExp) => {
      let matches;
      // Buscamos coincidencias en cada archivo
      while ((matches = regExp.exec(fileContent)) !== null) {
        const keyFound = matches[1];
        if (!keysUsedInProject.includes(keyFound)) {
          keysUsedInProject.push(keyFound);
        }
      }
    });
  });

  console.log("Requesting all existing segments from WTI...");
  const langData = await getStrings();
  console.log("Processing...\n");

  // Armamos objetos para cada idioma.
  const messagesByLangs = {};
  AVAILABLE_LANGUAGES.forEach((lang) => {
    messagesByLangs[lang] = {};
  });

  const updateLabelsRequestsData = [];

  // Recorremos todos los strings que existen en WTI.
  for (const data of langData) {
    const currentLabels = data.labels.split(", ").filter((x) => x);
    const projectLabelIndex = currentLabels.indexOf(projectLabel);
    const hasProjectLabel = projectLabelIndex > -1;
    const isKeyUsed = keysUsedInProject.includes(data.key);

    let shouldUpdateLabels = false;
    if (isKeyUsed && !hasProjectLabel) {
      // Debe agregarse la etiqueta.
      currentLabels.push(projectLabel);
      shouldUpdateLabels = true;
    } else if (!isKeyUsed && hasProjectLabel) {
      // Debe eliminarse la etiqueta.
      currentLabels.splice(projectLabelIndex, 1);
      shouldUpdateLabels = true;
    }

    if (shouldUpdateLabels) {
      updateLabelsRequestsData.push({
        dataToUpdate: { labels: currentLabels.join() },
        id: data.id,
        key: data.key,
      });
    }

    // Armamos los diccionarios por idioma para luego exportar a .json
    for (const lang of AVAILABLE_LANGUAGES) {
      const translationObject = data.translations.find((v) => v.locale === lang);
      const translationText =
        translationObject && translationObject.text !== null
          ? translationObject.text
          : "";

      if (isKeyUsed) {
        // Si la key se usa en el proyecto, la agregamos.
        messagesByLangs[lang][data.key] = translationText;

        // Pequeña lógica para que no quede vacío si un idioma no tiene traducción.
        if (!translationText && lang !== "en") {
          // Copiamos la traducción de "en" si existe.
          messagesByLangs[lang][data.key] = messagesByLangs["en"][data.key] || "";
        }
      }
      // Si no se usa la key, no hacemos nada con ella.
    }
  }

  // Creamos el directorio destino si no existe.
  mkdirp.sync(targetDir);

  // Guardamos los archivos de traducciones a disco.
  AVAILABLE_LANGUAGES.forEach((lang) => {
    const filePath = `${targetDir}/${lang}.json`;
    try {
      fs.writeFileSync(filePath, JSON.stringify(messagesByLangs[lang], null, 2));
      console.log(`${filePath} was updated.`);
    } catch (error) {
      console.error(error);
    }
  });

  // Si estamos en producción y hay datos por actualizar, los mandamos a WTI.
  if (process.env.NODE_ENV === "production" && updateLabelsRequestsData.length > 0) {
    console.log("\nStarting to update labels on WTI...");
    console.log(`Keys to update: ${updateLabelsRequestsData.length}`);
    console.log(
      `Number of chunks: ${Math.ceil(
        updateLabelsRequestsData.length / 20
      )} (20 requests every 800ms)\n`
    );
    // https://webtranslateit.com/en/docs/api#rate-limiting
    await updateLabels(updateLabelsRequestsData, 20, 800);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});