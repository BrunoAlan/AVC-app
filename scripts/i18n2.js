/* eslint-disable no-console, no-cond-assign */
const axios = require('axios');
const fs = require('fs');
const mkdirp = require('mkdirp');
const { AVAILABLE_LANGUAGES } = require('../src/constants/Languages');
const cwait = require('cwait');

const projectToken = 'proj_readonly_R0wcL2vUtMVWm58iLDD1zA';
const targetDir = 'static/langs';
const projectLabel = 'projectecho-bookingflow-mobile';

async function main() {
    const globby = (await import('globby')).default; // Dynamically import globby
    
    function getTotalPagesFromHeaders(headers) {
        const regex = /strings\.json\?[^>]*page=(\d+)[^>]*>; rel="last"/;
        let totalPages = -1;
        Object.keys(headers).forEach((header) => {
            if (header === 'link') {
                const match = headers[header].match(regex);
                if (match) {
                    [, totalPages] = match;
                }
            }
        });
        return totalPages;
    }

    function getStrings() {
        // https://webtranslateit.com/en/docs/api/string/#list-string
        const targetLangs = AVAILABLE_LANGUAGES.join();
        const getStringsUrl = `https://webtranslateit.com/api/projects/${projectToken}/strings.json?locale=${targetLangs}`;

        return axios.get(`${getStringsUrl}&page=1`)
            .then(async (firstPageResponse) => {
                const totalPages = getTotalPagesFromHeaders(firstPageResponse.headers);
                if (totalPages > 1) {
                    const allRequests = [];
                    for (let i = 2; i <= totalPages; i++) {
                        const promise = `${getStringsUrl}&page=${i}`;
                        allRequests.push(promise);
                    }
                    // normal request: return axios.all(allRequests).then(axios.spread((...args) => firstPageResponse.data.concat(...args)));
                    const MAX_SIMULTANEOUS_DOWNLOADS = 30;
                    const queue = new cwait.TaskQueue(Promise, MAX_SIMULTANEOUS_DOWNLOADS);
                    let count = 1;
                    return axios.all(
                        allRequests.map(
                            queue.wrap(
                                async (url) => axios.get(url).then(response => {
                                    process.stdout.write(`\rWTI requests done: ${count} of ${allRequests.length} \n`);
                                    count++;
                                    return response.data;
                                }),
                            ),
                        ),
                    ).then(axios.spread((...arg) => firstPageResponse.data.concat(...arg)));
                }
                return firstPageResponse.data;
            })
            .catch((error) => {
                console.log(error);
                // If there is some error, we should finish the execution with a non-zero status code to be caught outside the script.
                process.exit(1);
            });
    }

    function updateLabelsRequest(stringId, stringKey, dataToUpdate) {
        // https://webtranslateit.com/en/docs/api/string/#update-string
        const updateStringUrl = `https://webtranslateit.com/api/projects/${projectToken}/strings/${stringId}`;

        return axios
            .put(updateStringUrl, dataToUpdate, { headers: { 'Content-Type': 'application/json' } })
            .catch(() => console.error(`error when updating the labels for "${stringKey}"`));
    }

    function updateLabels(queue, maxRequestsPerInterval, interval) {
        let timeout;

        const dequeue = () => {
            const currentRequestsData = queue.splice(0, maxRequestsPerInterval);
            const requests = currentRequestsData.map(requestData => updateLabelsRequest(requestData.id, requestData.key, requestData.dataToUpdate));

            console.log(`updating ${currentRequestsData.length} keys, ${queue.length} remaining...`);
            axios.all(requests).then(() => {
                if (queue.length === 0) {
                    clearTimeout(timeout);
                    console.log('\nlabels update is complete');
                } else {
                    timeout = setTimeout(dequeue, interval);
                }
            });
        };

        dequeue();
    }

    function transformKeyToNestedObject(key, value) {
        return key.split('.').reduceRight((acc, part) => ({ [part]: acc }), value);
    }

    const keysUsedInProject = [];

    const filesToSearchForKeys = await globby(['pages/*.js', 'src/**/*.js', 'src/app/'], { ignore: ['src/__test__/**/*.js'] });
    console.log(filesToSearchForKeys)
    filesToSearchForKeys.forEach((filePath) => {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        // TODO: RegExp to get getIntl('bf.i18n')
        const detectKeysExpressions = [
            new RegExp('<FormattedMessage[^]*?id="([^"]*?)"', 'ig'),
            new RegExp("intl.formatMessage[^]*?id: '([^']*?)'[^]*?}", 'ig'),
            new RegExp('<FormattedHTMLMessage[^]*?id="([^"]*?)"', 'ig'),
            new RegExp('i18nLabel\\[(.*?)\\]', 'ig'),
        ];

        detectKeysExpressions.forEach((regExp) => {
            let matches;
            while (matches = regExp.exec(fileContent)) {
                const id = matches[1];
                if (keysUsedInProject.indexOf(id) === -1) {
                    keysUsedInProject.push(id);
                }
            }
        });
    });

    console.log('requesting all existing segments...');
    getStrings().then((langData) => {
        console.log('processing...\n');

        const messagesByLangs = {};
        AVAILABLE_LANGUAGES.forEach((lang) => {
            messagesByLangs[lang] = {};
        });
        const updateLabelsRequestsData = [];

        langData.forEach((data) => {
            const currentLabels = data.labels.split(', ').filter(x => x);
            const projectLabelIndex = currentLabels.indexOf(projectLabel);
            const hasProjectLabel = projectLabelIndex > -1;
            const isKeyUsed = keysUsedInProject.indexOf(data.key) > -1;
            let shouldUpdateLabels = false;
            if (isKeyUsed && !hasProjectLabel) {
                // should add the projectLabel
                currentLabels.push(projectLabel);
                shouldUpdateLabels = true;
            } else if (!isKeyUsed && hasProjectLabel) {
                // should remove the projectLabel
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

            AVAILABLE_LANGUAGES.forEach((lang) => {
                const translationObject = data.translations.find(v => v.locale === lang);
                const translationText = translationObject && translationObject.text !== null ? translationObject.text : '';
                if (isKeyUsed) {
                    const nestedObject = transformKeyToNestedObject(data.key, translationText || messagesByLangs.en[data.key]);
                    messagesByLangs[lang] = { ...messagesByLangs[lang], ...nestedObject };
                }
            });
        });

        mkdirp.sync(targetDir);
        AVAILABLE_LANGUAGES.forEach((lang) => {
            const filePath = `${targetDir}/${lang}.json`;
            try {
                fs.writeFileSync(filePath, JSON.stringify(messagesByLangs[lang]));
                console.log(`${filePath} was updated.`);
            } catch (error) {
                console.error(error);
            }
        });

        if (process.env.NODE_ENV === 'production' && updateLabelsRequestsData.length > 0) {
            console.log('\nstarting to update labels...');
            console.log(`keys to update: ${updateLabelsRequestsData.length}`);
            console.log(`number of requests: ${Math.ceil(updateLabelsRequestsData.length / 20)} (20 requests every 1 second)\n`);
            // https://webtranslateit.com/en/docs/api#rate-limiting
            updateLabels(updateLabelsRequestsData, 20, 800);
        }
    });
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});