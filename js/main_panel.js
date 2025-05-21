// Functions to update the visuals for the main panel

// Function to add and update the week calendar boxes
function updateCalendar() {
    let currentDate = currentTime()

    // Set up calendar container
    calendarSection.innerHTML = '';

    // Define size of calendar based on settings
    let startDay = data().settings.showWeekends ? 0 : 1;
    let endDay = data().settings.showWeekends ? 6 : 5;

    // Create each box
    for (let i = startDay; i <= endDay; i++) {
        // Find the date associated wih the box
        let loopDate = new Date(currentDate)
        loopDate.setDate(loopDate.getDate()-loopDate.getDay()+i)

        // Get the schedule type for the box
        let loopScheduleType = data().scheduleData?.day_schedule.find((item)=>item.date==getMDY(loopDate))?.schedule;
        let loopSchedule = data().scheduleData?.day_types.find((item)=>item.name==loopScheduleType)

        // Get properties for the box
        let boxTag = loopSchedule?.tag ? loopSchedule.tag : loopDate.getDate();
        let boxBackground = loopSchedule?.color;
        let boxTextColor = loopSchedule?.text_color;
        let boxName = loopSchedule?.display_name;
        
        // Create element using found data
        let element = document.createElement('div');
        element.dataset.weekDay = i;
        element.classList.add('calendar-box');
        element.textContent = boxTag;
        element.style.background = boxBackground;
        element.style.color = boxTextColor;
        element.title = boxName;

        // Apply style information to the box for the current day
        if (getMDY(loopDate)==getMDY(currentDate)) {
            element.classList.add('current-day')
            element.style.setProperty('--current-day-box-color', boxTextColor)
        }

        // Add the element to the DOM
        calendarSection.appendChild(element);
    }
}