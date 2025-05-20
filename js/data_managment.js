// Functions for managing stored data

// Object for default data 
const defaultData = {
    settings: {
        showWeekends: false
    }
};


function data() {
    let data = storedData() ?
        storedData():
        defaultData;
    return data
}

/**
 * Updates the localStorage entry 'mchs_schedule' with the latest data from remoteData().
 * Fetches data asynchronously using remoteData(), stringifies it, and stores it in localStorage.
 * @async
 * @returns {Promise<void>}
 */
async function updateStoredData() {
    let newData = data()
    newData.scheduleData = await remoteScheduleData()
    localStorage.mchs_schedule = JSON.stringify(newData)
}