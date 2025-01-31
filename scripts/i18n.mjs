/* eslint-disable no-console, no-cond-assign */
import fs from 'fs';
import path from 'path';
import axios, { all } from 'axios';
import { globby } from 'globby';
import mkdirp from 'mkdirp';
import pLimit from 'p-limit';

import { AVAILABLE_LANGUAGES } from '../src/constants/Languages.js';

const projectToken = 'proj_readonly_R0wcL2vUtMVWm58iLDD1zA';
const targetDir = 'static/langs';
const projectLabel = 'projectecho-bookingflow-mobile';
const MAX_SIMULTANEOUS_DOWNLOADS = 30;
const MAX_LABEL_UPDATES_PER_INTERVAL = 20;
const LABEL_UPDATE_INTERVAL = 800; // 800ms

/**
 * Retrieves the last page number from the "link" header in the HTTP response.
 * @param {Object} headers - The HTTP response headers.
 * @returns {number} The total number of pages.
 */
function getTotalPagesFromHeaders(headers) {
  const regex = /strings\.json\?[^>]*page=(\d+)[^>]*>; rel="last"/;
  let totalPages = -1;

  if (headers.link) {
    const match = headers.link.match(regex);
    if (match) {
      [, totalPages] = match;
    }
  }
  return parseInt(totalPages, 10);
}

/**
 * Downloads all strings from WebTranslateIt, respecting concurrency limits.
 * @returns {Promise<Array>} Returns the complete list of strings (across all pages).
 */
async function getAllStrings() {
  const targetLangs = AVAILABLE_LANGUAGES.join();
  const baseUrl = `https://webtranslateit.com/api/projects/${projectToken}/strings.json?locale=${targetLangs}`;

  try {
    // 1) Download the first page to check how many pages are in total.
    const firstPageResponse = await axios.get(`${baseUrl}&page=1`);
    const totalPages = getTotalPagesFromHeaders(firstPageResponse.headers);

    // 2) If there's only one page, return that data directly.
    if (totalPages <= 1) {
      return firstPageResponse.data;
    }

    // 3) Generate all URLs for subsequent pages.
    const requests = [];
    for (let i = 2; i <= totalPages; i += 1) {
      requests.push(`${baseUrl}&page=${i}`);
    }

    // 4) Control concurrency using p-limit.
    const limit = pLimit(MAX_SIMULTANEOUS_DOWNLOADS);

    let count = 1;
    const promises = requests.map((url) =>
      limit(async () => {
        const response = await axios.get(url);
        process.stdout.write(`\rWTI requests done: ${count} of ${requests.length}`);
        count++;
        return response.data;
      })
    );

    // 5) Wait for all requests to complete.
    const pagesData = await Promise.all(promises);

    // 6) Concatenate the data from the first page with the rest.
    return firstPageResponse.data.concat(...pagesData);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

/**
 * Sends a request to update the labels of a specific key in WebTranslateIt.
 * @param {string} stringId - The ID of the string in WebTranslateIt.
 * @param {string} stringKey - The key of the string.
 * @param {Object} dataToUpdate - The object containing data to update (labels).
 * @returns {Promise<void>}
 */
async function updateLabelsRequest(stringId, stringKey, dataToUpdate) {
  const url = `https://webtranslateit.com/api/projects/${projectToken}/strings/${stringId}`;

  try {
    await axios.put(url, dataToUpdate, {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(`Error when updating labels for "${stringKey}": `, err.message);
  }
}

/**
 * Handles updating labels in batches, to avoid exceeding the WTI rate limit.
 * Every LABEL_UPDATE_INTERVAL ms, a maximum of MAX_LABEL_UPDATES_PER_INTERVAL requests are processed.
 * @param {Array} queue - Pending update requests.
 */
function batchUpdateLabels(queue) {
  let timeoutId;

  const dequeue = async () => {
    // Take the next batch of requests.
    const currentRequestsData = queue.splice(0, MAX_LABEL_UPDATES_PER_INTERVAL);

    if (!currentRequestsData.length) return;

    console.log(
      `Updating ${currentRequestsData.length} keys, ${queue.length} remaining...`
    );

    // Send update requests in parallel.
    await Promise.all(
      currentRequestsData.map((requestData) =>
        updateLabelsRequest(
          requestData.id,
          requestData.key,
          requestData.dataToUpdate
        )
      )
    );

    if (queue.length === 0) {
      console.log('\nLabels update is complete.');
      clearTimeout(timeoutId);
    } else {
      // Schedule the next batch.
      timeoutId = setTimeout(dequeue, LABEL_UPDATE_INTERVAL);
    }
  };

  // Start the process.
  dequeue();
}

/**
 * Converts a key like "foo.bar.baz" into a nested object.
 * @param {string} key - The key to transform (e.g. "foo.bar.baz").
 * @param {string} value - The final value to be inserted.
 * @returns {Object} The resulting nested object.
 */
function transformKeyToNestedObject(key, value) {
  return key.split('.').reduceRight((acc, part) => ({ [part]: acc }), value);
}

/**
 * Scans the specified files for i18n keys using a set of regular expressions that detect strings IDs.
 * @returns {Promise<string[]>} - Returns an array containing the keys found.
 */
async function findKeysUsedInProject() {
  const filesToSearchForKeys = await globby(['src/**/*.ts', 'src/app/'], {
    ignore: ['src/__test__/**/*.js'],
  });

  const keysUsedInProject = [];
  const detectKeysExpressions = [
    /i18next\.t\(\s*['"]([^'"]*)['"]\s*\)/gi,
    /t\(\s*['"]([^'"]*)['"]\s*\)/gi, 
  ];

  filesToSearchForKeys.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    detectKeysExpressions.forEach((regExp) => {
      let matches;
      while ((matches = regExp.exec(fileContent)) !== null) {
        const id = matches[1];
        if (!keysUsedInProject.includes(id)) {
          keysUsedInProject.push(id);
        }
      }
    });
  });

  return keysUsedInProject;
}

/**
 * Main entry point. Coordinates downloading strings, detecting keys, generating files,
 * and updating labels in WTI.
 */
async function main() {
  // 1) Find keys actually used in the project.
  console.log('Searching for keys used in the project...');
  const keysUsedInProject = await findKeysUsedInProject();
  console.log(`Total detected keys: ${keysUsedInProject.length}`);

  // 2) Download all strings from WebTranslateIt.
  console.log('Downloading all existing strings...');
  const allStrings = await getAllStrings();
  console.log({allStrings});
  console.log(`\nDownloaded ${allStrings.length} string entries.\n`);

  // 3) Process translations and build objects per language.
  const messagesByLangs = {};
  AVAILABLE_LANGUAGES.forEach((lang) => {
    messagesByLangs[lang] = {};
  });

  // 4) Build the queue of label update requests.
  const updateLabelsRequestsData = [];

  allStrings.forEach((item) => {
    const { labels, key, id, translations } = item;
    const currentLabels = labels.split(', ').filter(Boolean);

    const projectLabelIndex = currentLabels.indexOf(projectLabel);
    const hasProjectLabel = projectLabelIndex > -1;
    const isKeyUsed = keysUsedInProject.includes(key);

    // Determine whether the labels need to be updated.
    let shouldUpdateLabels = false;
    if (isKeyUsed && !hasProjectLabel) {
      currentLabels.push(projectLabel);
      shouldUpdateLabels = true;
    } else if (!isKeyUsed && hasProjectLabel) {
      currentLabels.splice(projectLabelIndex, 1);
      shouldUpdateLabels = true;
    }

    if (shouldUpdateLabels) {
      updateLabelsRequestsData.push({
        dataToUpdate: { labels: currentLabels.join(', ') },
        id,
        key,
      });
    }

    // For each language, insert the translation into the final object if the key is used.
    AVAILABLE_LANGUAGES.forEach((lang) => {
      const translationObject = translations.find((t) => t.locale === lang);
      const translationText = translationObject?.text ?? '';

      if (isKeyUsed) {
        // If the translation is empty, fall back to the 'en' text.
        const fallback = messagesByLangs.en[key] || '';
        const nestedObject = transformKeyToNestedObject(
          key,
          translationText || fallback
        );
        messagesByLangs[lang] = { ...messagesByLangs[lang], ...nestedObject };
      }
    });
  });

  // 5) Write the JSON files for each language.
  mkdirp.sync(targetDir);
  AVAILABLE_LANGUAGES.forEach((lang) => {
    const filePath = path.join(targetDir, `${lang}.json`);
    try {
      fs.writeFileSync(filePath, JSON.stringify(messagesByLangs[lang], null, 2));
      console.log(`${filePath} was updated.`);
    } catch (error) {
      console.error(`Error writing file ${filePath}:`, error);
    }
  });

  // 6) Update labels in WTI (only in production, if there are keys to change).
  if (process.env.NODE_ENV === 'production' && updateLabelsRequestsData.length > 0) {
    console.log('\nStarting label update in WTI...');
    console.log(`Keys to update: ${updateLabelsRequestsData.length}`);
    console.log(
      `~${Math.ceil(
        updateLabelsRequestsData.length / MAX_LABEL_UPDATES_PER_INTERVAL
      )} batches will be made (of ${MAX_LABEL_UPDATES_PER_INTERVAL} requests each ${LABEL_UPDATE_INTERVAL}ms)\n`
    );

    batchUpdateLabels(updateLabelsRequestsData);
  }
}

main().catch((err) => {
  console.error('Error in main execution:', err);
  process.exit(1);
});