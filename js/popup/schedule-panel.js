let schedulePanel = document.getElementById('schedule-container');
let showOnlyRemaining = document.getElementById('show-only-remaining');

schedulePanel.addEventListener('click', () => schedulePanel.classList.toggle('show'));
document.getElementById('main-panel').addEventListener('click', () => schedulePanel.classList.remove('show'));

function updateSchedulePanel() {
  let tempTimeString = hourMinute(adjustedTime())
  let tempSchedule = dayInfo(dayType(adjustedTime()))?.schedule
  if (!tempSchedule) {
    return
  }
  schedulePanel.innerHTML = '';
  tempSchedule.forEach((item) => {
    if (!showOnlyRemaining.checked || timeCompare(tempTimeString, item.time, '<')) {
      let tempScheduleTime = document.createElement('div');
      tempScheduleTime.classList.add('schedule-item', 'schedule-time', 'list-item', 'list-time')
      tempScheduleTime.textContent = hourMinute12(new Date('1/1/2001, '+ item.time))
      schedulePanel.appendChild(tempScheduleTime);

      let tempScheduleName = document.createElement('div');
      tempScheduleName.classList.add('schedule-item', 'schedule-name', 'list-item', 'list-name')
      tempScheduleName.textContent = (getCustomClassName(item.name)==item.name ? item.name : item.name + ' / ' + getCustomClassName(item.name))
      schedulePanel.appendChild(tempScheduleName);

      let tempScheduleBorder = document.createElement('div');
      tempScheduleBorder.classList.add('schedule-item', 'schedule-border', 'list-item', 'list-border');
      schedulePanel.appendChild(tempScheduleBorder);
    }
  });
  schedulePanel.dataset.length = Math.floor(schedulePanel.children.length/3);

  if (schedulePanel.dataset.length == 0) {
    let tempListEmptyMessage = document.createElement('h2');
    if (tempSchedule.length == 0) {
      tempListEmptyMessage.innerHTML = 'No Classes Today';
    } else {
      tempListEmptyMessage.innerHTML = 'No More Classes Today';
    }
    tempListEmptyMessage.classList.add('list-empty-message')
    schedulePanel.appendChild(tempListEmptyMessage);
  }

}
