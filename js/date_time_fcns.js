// Functions to get and manipulate dates and times

/**
 * Returns the current date and time as a Date object.
 *
 * @returns {Date} The current date and time.
 */
function currentTime() {
    let currentTime = new Date()
    // currentTime.setDate(currentTime.getDate()+2) // for dev only
    // currentTime.setHours(10); // for dev only 
    // currentTime.setMinutes(currentTime.getMinutes()+10) // for dev only
    return currentTime
}


/**
 * Returns a string representing the given Date object in MM/DD/YYYY format.
 *
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string in MM/DD/YYYY format.
 */
function getMDY(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    return `${month}/${day}/${year}`
}

function get24Time(date) {
    let hour = String(date.getHours()).padStart(2,0)
    let minute = String(date.getMinutes()).padStart(2,0)
    return `${hour}:${minute}`
}

// function timeStrAsNum(timeStr) {
//     let timeArray = timeStr.split(':');
//     return timeArray[0]*60+timeArray[1]
// }

function timeStrAsDate(timeStr) {
    let timeArray = timeStr.split(':');
    let date = currentTime()
    date.setHours(timeArray[0]);
    date.setMinutes(timeArray[1]);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date
}

function convert24to12(timeStr) {
    let timeArray = timeStr?.split(':');
    if (!timeArray) {
        throw new Error("Invalid Time String");
    }
    let hour = parseInt(timeArray[0]);
    let minute = timeArray[1];
    let dayPeriod = hour < 12 ? "AM" : "PM";
    hour = hour > 12 ? hour-12 : hour;

    return `${hour}:${minute} ${dayPeriod}`
}

