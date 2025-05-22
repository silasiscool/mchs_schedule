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
        let loopDaySchedule = data().scheduleData?.day_schedule.find((item)=>item.date==getMDY(loopDate));
        let loopSchedule = data().scheduleData?.day_types.find((item)=>item.name==loopDaySchedule?.schedule)

        // Get properties for the box
        let boxTag = loopSchedule?.tag ? loopSchedule.tag : loopDate.getDate();
        let boxBackground = loopSchedule?.color;
        let boxTextColor = loopSchedule?.text_color;
        let boxName = loopDaySchedule?.alt_name ? loopDaySchedule.alt_name : loopSchedule?.display_name;
        
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
    let dayType = data().scheduleData?.day_schedule.find((item)=>item.date==getMDY(currentTime()))
    let dayName = dayType?.alt_name ? dayType.alt_name : data().scheduleData?.day_types.find((item)=>item.name==dayType?.schedule)?.display_name

    // Get current class name
    let dayTypeSchedule = data().scheduleData?.day_types.find((item)=>item.name==dayType?.schedule).schedule

    let currentClassIndex
    dayTypeSchedule.forEach((item, i) => {
        if (
            !currentClassIndex 
            && currentTime()<timeStrAsDate(item.time)
        ) {
            currentClassIndex = i-1;
            return
        }
    });
    let currentClass = dayTypeSchedule[currentClassIndex].name;


    // Get end time string
    let nextClass = dayTypeSchedule.find((item)=>{
        return currentTime()<timeStrAsDate(item.time)
    })

    let endTimeStr = `Ends ${convert24to12(nextClass.time)}`

    // Get countdown time
    // console.log(timeStrAsDate(nextClass.time)-currentTime())
    // console.log(currentTime());
    let countdownStr = timeStrAsDate(nextClass.time)-currentTime()
    

    // Update DOM elements
    dayTypeSection.textContent = dayName;
    classNameSection.textContent = currentClass;
    endTimeSection.textContent = endTimeStr;
    countdownSection.textContent = countdownStr;
}