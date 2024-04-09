// everything
function updateMainPanel() {
  updateCalendarSection()
  updateInfoPanelSection()
}

// calendar section
let calendarPanelSection = document.getElementById('calendar-panel-section');
let calendarWrapper = document.getElementById('calendar-wrapper');
let prevWeekScrollButton = document.getElementById('prev-week-scroll-button');
let nextWeekScrollButton = document.getElementById('next-week-scroll-button')

function updateCalendarSection() {
  Array.from(calendarWrapper.children).forEach((item, i) => {
    let tempBoxDate = mondayDate(addCalendarOffset(adjustedTime()));
    tempBoxDate.setDate(tempBoxDate.getDate()+i);
    tempBoxInfo = dayInfo(dayType(tempBoxDate));
    if (!tempBoxInfo) {
      return
    }
    if (i == adjustedTime().getDay()-1 && calendarOffsetWeeks == 0) {
      item.classList.add('current-day');
    } else {
      item.classList.remove('current-day');
    }
    item.style.backgroundColor = tempBoxInfo.color;
    item.style.setProperty('--calendar-box-text-color', tempBoxInfo.text_color);
    item.textContent = tempBoxDate.getDate()
    item.title = dayName(tempBoxDate);
    if (tempBoxInfo.tag) {
      item.textContent = tempBoxInfo.tag;
    }

    if (i == 0) {
      prevWeekScrollButton.getElementsByTagName('svg')[0].style.fill = tempBoxInfo.text_color;
    } else if (i == calendarWrapper.children.length - 1) {
      nextWeekScrollButton.getElementsByTagName('svg')[0].style.fill = tempBoxInfo.text_color;
    }

    if (showJazz && isJazzDay(tempBoxDate)) {
      item.classList.add('is-jazz-day');
    }
    if (showChamber && isChamberDay(tempBoxDate)) {
      item.classList.add('is-chamber-day')
    }
  });


}

// info panel section
let dayTypeSectionLine = document.getElementById('day-type');
let periodNameSectionLine = document.getElementById('period-name');
let countdownWrapper = document.getElementById('countdown-wrapper');
let countdown = document.getElementById('countdown');
let countdownWeeks = document.getElementById('weeks-number');
let countdownDays = document.getElementById('days-number');
let countdownHours = document.getElementById('hours-number');
let countdownMinutes = document.getElementById('minutes-number');
let countdownSeconds = document.getElementById('seconds-number');
let countdownMilliseconds = document.getElementById('milliseconds-number');
let endTimeSectionLine = document.getElementById('end-time');


function updateInfoPanelSection() {
  updateDayTypeLine()
  updateCurrentAndCountdown()
  updateCurrentClass()
}

function updateDayTypeLine() {
  dayTypeSectionLine.textContent = dayName(adjustedTime());
}

function updateCurrentAndCountdown() {
  if (showMilliseconds) {
    countdown.classList.add('show-milliseconds');
  } else {
    countdown.classList.remove('show-milliseconds');
  }
  let tempEndTime = nextPeriod(adjustedTime())?.dateObject
  if (tempEndTime) {
    countdownWrapper.classList.remove('summer');
  } else {
    countdownWrapper.classList.add('summer');
    return
  }
  if(monthDayYear(tempEndTime) == monthDayYear(adjustedTime())) {
    endTimeSectionLine.textContent = `Ends ${hourMinute12(tempEndTime, true)}`
  } else if (monthDayYear(tempEndTime) == monthDayYear(new Date(adjustedTime().setDate(adjustedTime().getDate()+1)))) {
    endTimeSectionLine.textContent = `Ends ${hourMinute12(tempEndTime, true)} Tomorrow`
  } else {
    endTimeSectionLine.textContent = `Ends ${hourMinute12(tempEndTime, true)} on ${monthDayYear(tempEndTime, true)}`
  }
  let tempDuration = tempEndTime - adjustedTime();

  let tempMilliseconds = tempDuration % 1000;
  tempDuration -= tempMilliseconds
  let tempSeconds = tempDuration % (1000 * 60);
  tempDuration -= tempSeconds
  let tempMinutes = tempDuration % (1000 * 60 * 60)
  tempDuration -= tempMinutes
  let tempHours = tempDuration % (1000 * 60 * 60 * 24)
  tempDuration -= tempHours
  let tempDays = tempDuration % (1000 * 60 * 60 * 24 * 7)
  tempDuration -= tempDays
  let tempWeeks = tempDuration
  tempDuration -= tempWeeks

  if (tempDuration != 0) {
    throw 'Time Calculation Error'
  }

  countdownMilliseconds.textContent = (Math.floor(tempMilliseconds/10).toString().padStart(2, '0')).replace(/0/g, "O");
  countdownSeconds.textContent = ((tempSeconds/1000).toString().padStart(2, '0')).replace(/0/g, "O");
  countdownMinutes.textContent = ((tempMinutes/(1000 * 60)).toString().padStart(2, '0')).replace(/0/g, "O");
  countdownHours.textContent = ((tempHours/(1000 * 60 * 60)).toString().padStart(2, '0')).replace(/0/g, "O");
  countdownDays.textContent = ((tempDays/(1000 * 60 * 60 * 24)).toString().padStart(2, '0')).replace(/0/g, "O");
  countdownWeeks.textContent = ((tempWeeks/(1000 * 60 * 60 * 24 * 7)).toString().padStart(2, '0')).replace(/0/g, "O");
  countdownMilliseconds.dataset.time = parseInt(countdownMilliseconds.textContent.replace(/O/g, "0"));
  countdownSeconds.dataset.time = parseInt(countdownSeconds.textContent.replace(/O/g, "0"));
  countdownMinutes.dataset.time = parseInt(countdownMinutes.textContent.replace(/O/g, "0"));
  countdownHours.dataset.time = parseInt(countdownHours.textContent.replace(/O/g, "0"));
  countdownDays.dataset.time = parseInt(countdownDays.textContent.replace(/O/g, "0"));
  countdownWeeks.dataset.time = parseInt(countdownWeeks.textContent.replace(/O/g, "0"));
}

function updateCurrentClass() {

  let tempNextClass = prevPeriod(adjustedTime());
  let tempCustomName = getCustomClassName(tempNextClass?.name);
  if (!tempCustomName) {
    tempCustomName = 'Free'
  }
  periodNameSectionLine.textContent = tempCustomName;
}

prevWeekScrollButton.addEventListener('click', () => calendarOffsetWeeks -= 1)

nextWeekScrollButton.addEventListener('click', () => calendarOffsetWeeks += 1)
