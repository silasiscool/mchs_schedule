// Functions to extract desired data from stored data

function getDaySchedule(time) {
    return data().scheduleData?.day_schedule.find((item) => item.date == getMDY(time));
}

function getScheduleType(scheduleName) {
    return data().scheduleData?.day_types.find((item) => item.name == scheduleName);
}