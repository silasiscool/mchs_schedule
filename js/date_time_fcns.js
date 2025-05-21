// Functions to get and manipulate dates and times

/**
 * Returns the current date and time as a Date object.
 *
 * @returns {Date} The current date and time.
 */
function currentTime() {
    let currentTime = new Date()
    currentTime.setDate(currentTime.getDate()+7*0)
    return currentTime
}


/**
 * Returns a string representing the given Date object in MM/DD/YYYY format.
 *
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string in MM/DD/YYYY format.
 */
function getMDY(date) {
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    let year = String(date.getFullYear());
    return `${month}/${day}/${year}`
}