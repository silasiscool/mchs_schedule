// Functions to update the visuals for the main panel

// Function to add and update the week calendar boxes
function updateCalendar() {
    // Set up calendar container
    calendarSection.innerHTML = '';

    // Define size of calendar based on settings
    let startDay = data().settings.showWeekends ? 0 : 1;
    let endDay = data().settings.showWeekends ? 6 : 5;

    // Create each box
    for (let i = startDay; i <= endDay; i++) {
        // Find the date associated wih the box
        let loopDate = new Date(currentTime())
        loopDate.setDate(loopDate.getDate()-loopDate.getDay()+i)

        // Get the schedule type for the box
        let loopDaySchedule = getDaySchedule(loopDate);
        
        let loopScheduleType = getScheduleType(loopDaySchedule?.schedule)

        // Get properties for the box
        let boxTag = loopScheduleType?.tag ? loopScheduleType.tag : loopDate.getDate();
        let boxBackground = loopScheduleType?.color;
        let boxTextColor = loopScheduleType?.text_color;
        let boxName = loopDaySchedule?.alt_name ? loopDaySchedule.alt_name : loopScheduleType?.display_name;
        
        // Create element using found data
        let element = document.createElement('div');
        element.dataset.weekDay = i;
        element.classList.add('calendar-box');
        element.textContent = boxTag;
        element.style.background = boxBackground;
        element.style.color = boxTextColor;
        element.title = boxName;

        // Apply style information to the box for the current day
        if (getMDY(loopDate)==getMDY(currentTime())) {
            element.classList.add('current-day')
            element.style.setProperty('--current-day-box-color', boxTextColor)
        }

        // Add the element to the DOM
        calendarSection.appendChild(element);
    }
}

// Function to update current day info
function updateInfo() {
    // Get current day type
    let daySchedule = getDaySchedule(currentTime());

    // Get schedule type for the day
    let dayScheduleType = getScheduleType(daySchedule?.schedule)

    // Get day name
    let dayName = daySchedule?.alt_name ? daySchedule.alt_name : dayScheduleType?.display_name
    

    // Get the current class name
    let currentClassIndex
    dayScheduleType.schedule.forEach((item, i) => {
        if (
            !currentClassIndex 
            && currentTime()<timeStrAsDate(item.time)
        ) {
            currentClassIndex = i-1;
            return
        }
    });
    let currentClass = dayScheduleType.schedule[currentClassIndex]?.name;


    // Get end time string
    let nextClass = dayScheduleType.schedule.find((item)=>{
        return currentTime()<timeStrAsDate(item.time)
    })

    // Get the next class by incrementing the days offset
    let daysOffset;
    if (!nextClass) {
        daysOffset = 1;
        while (daysOffset<365) {
            // Get the new search date
            let loopDate = new Date()
            loopDate.setDate(loopDate.getDate()+daysOffset)
            let loopDaySchedule = data().scheduleData?.day_schedule.find((item)=>item.date==getMDY(loopDate));
            let loopScheduleType = data().scheduleData?.day_types.find((item)=>item.name==loopDaySchedule?.schedule)
            if (loopScheduleType?.schedule.length>0) {
                nextClass = loopScheduleType.schedule[0];
                break
            }
            // If no class found, increment days offset, and search the next day
            daysOffset++
        }
    }

    // Get end time for the next class based on the next class and offset
    let endTime = timeStrAsDate(nextClass?.time);
    endTime.setDate(endTime.getDate()+(daysOffset?daysOffset:0));
    

    let endTimeStr = `Ends ${convert24to12(get24Time(endTime))}${daysOffset?` on ${getMDY(endTime)}`:''}`

    // Get countdown time    
    let countdownStr = endTime-currentTime()
    

    // Update DOM elements
    dayTypeSection.textContent = dayName;
    classNameSection.textContent = currentClass;
    endTimeSection.textContent = endTimeStr;
    countdownSection.textContent = countdownStr;
}