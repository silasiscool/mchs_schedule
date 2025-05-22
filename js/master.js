// DOM Elements
const calendarSection = document.querySelector('#main-panel .calendar-section');
const dayTypeSection = document.querySelector('#main-panel .day-type');
const classNameSection = document.querySelector('#main-panel .class-name');
const countdownSection = document.querySelector('#main-panel .countdown')
const endTimeSection = document.querySelector('#main-panel .end-time');

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

// for testing only
setInterval(() => {
    updateCalendar() 
    updateInfo()
}, 100);



// Debugging functions
function clearAllData() {
    localStorage.clear()
}