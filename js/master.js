// DOM Elements
const calendarSection = document.querySelector('#main-panel .calendar-section');

// Object for default data 
const defaultData = {
    settings: {
        showWeekends: false
    }
};

// Runtime data
let runtimeData = {
    weekOffset:0
}

// Initialization
updateStoredData() // Begin updating local data

updateCalendar() // for testing only


// Debugging functions
function clearAllData() {
    localStorage.clear()
}