// Functions for retreving stored data

// URL for main config file data
const configFileURL = 'https://script.google.com/macros/s/AKfycbzmPlGpgvvgZRqerq2xx-M_PikKISc6cLKy6Apkk1Rhefo7H12gJ9oVH8QlU0v09FiCDA/exec';

/**
 * Retrieves stored data from the browser's localStorage for the "mchs_schedule" key.
 * If the data exists, it parses the JSON string into a JavaScript object.
 * If the data does not exist, it returns null.
 *
 * @returns {Object|null} The parsed data object if it exists, or null if no data is stored.
 */
function storedData() {
    let storedData = localStorage.mchs_schedule ? 
        JSON.parse(localStorage.mchs_schedule): 
        null;
    return storedData
}


/**
 * Fetches and returns JSON data from a remote URL specified by `configFileURL`.
 *
 * @async
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON data from the remote source.
 */
async function remoteScheduleData() {
    let remoteScheduleData = await fetch(configFileURL).then(res=>res.json())
    return remoteScheduleData
}