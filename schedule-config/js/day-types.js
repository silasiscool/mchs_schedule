config_file.then((savedConfig) => { // open saved config file
  // load config file
  if (!sessionStorage.getItem('configFile')) {
    sessionStorage.setItem('configFile',JSON.stringify(savedConfig))
  }
  let config = JSON.parse(sessionStorage.getItem('configFile'));

  // store div list elements
  let itemList = document.getElementById('item-list')
  let dialogList = document.getElementById('dialog-list')

  // store other elements
  let addTypeButton = document.getElementById('add-type-button')
  let dayName = document.getElementById('day-name')
  let dayTypesList = document.getElementById('day-types-list')
  let dayDisplayName = document.getElementById('day-display-name')
  let dayBackgroundColorDisplay = document.getElementById('day-background-color-display')
  let dayBackgroundColor = document.getElementById('day-background-color')
  let dayTextColorDisplay = document.getElementById('day-text-color-display')
  let dayTextColor = document.getElementById('day-text-color')
  let dayTag = document.getElementById('day-tag')
  let dayScheduleList = document.getElementById('day-schedule-list')
  let dayScheduleAddTime = document.getElementById('day-schedule-add-time')
  let dayScheduleAddName = document.getElementById('day-schedule-add-name')
  let periodNamesList = document.getElementById('period-names-list')
  let dayScheduleAddButton = document.getElementById('day-schedule-add-button')
  let importTypeButton = document.getElementById('import-type-button');
  let importTypeSelect = document.getElementById('import-type-select');
  let importColorsButton = document.getElementById('import-colors-button');
  let importColorsSelect = document.getElementById('import-colors-select');

  // display current settings
  displayItems()

  function displayItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    config.day_types.forEach((item, i) => {
      addItem(item, i)
    });
    setDropdown()
    setNames()
  }

  function addItem(item, i) {
    // create list item
    let itemItem = document.createElement('div')
    itemItem.classList.add('item-item')

    let itemName = document.createElement('div')
    itemName.classList.add('item-name')
    itemName.appendChild(document.createTextNode(item.name))
    itemItem.appendChild(itemName)

    let itemRemoveButton = document.createElement('button')
    itemRemoveButton.setAttribute('type','button')
    itemRemoveButton.classList.add('item-remove-button')

    let itemRemove = document.createElement('i')
    itemRemove.classList.add('fa-solid', 'fa-trash', 'item-remove')
    itemRemoveButton.appendChild(itemRemove)
    itemItem.appendChild(itemRemoveButton)

    let itemViewButton = document.createElement('button')
    itemViewButton.setAttribute('type','button')
    itemViewButton.classList.add('item-view-button')

    let itemView = document.createElement('i')
    itemView.classList.add('fa-regular', 'fa-eye', 'item-view')
    itemViewButton.appendChild(itemView)
    itemItem.appendChild(itemViewButton)

    itemList.appendChild(itemItem)

    // create dialog
    let dialog = document.createElement('dialog')
    dialog.classList.add('dialog-schedule', 'dialog')

    let dialogCloseButton = document.createElement('button')
    dialogCloseButton.setAttribute('type', 'button')
    dialogCloseButton.classList.add('dialog-schedule', 'dialog-close-button')


    let dialogClose = document.createElement('i')
    dialogClose.classList.add('fa-solid', 'fa-xmark', 'dialog-schedule', 'dialog-close')
    dialogCloseButton.appendChild(dialogClose)
    dialog.appendChild(dialogCloseButton)

    let dialogName = document.createElement('div')
    dialogName.classList.add('dialog-schedule', 'name')
    dialogName.appendChild(document.createTextNode('Name: '+item.name))
    dialog.appendChild(dialogName)

    let dialogDisplayName = document.createElement('div')
    dialogDisplayName.classList.add('dialog-schedule', 'display-name')
    dialogDisplayName.appendChild(document.createTextNode('Display Name: '+item.display_name))
    dialog.appendChild(dialogDisplayName)

    let dialogColorsDisplay = document.createElement('div')
    dialogColorsDisplay.classList.add('dialog-schedule', 'colors-display')
    dialogColorsDisplay.appendChild(document.createTextNode('Colors Display'))
    dialogColorsDisplay.style.backgroundColor = item.color
    dialogColorsDisplay.style.color = item.text_color
    dialog.appendChild(dialogColorsDisplay)

    let dialogTag = document.createElement('div')
    dialogTag.classList.add('dialog-schedule', 'tag')
    let tag = item.tag
    if (tag === '') tag = 'NONE';
    dialogTag.appendChild(document.createTextNode('Tag: '+tag))
    dialog.appendChild(dialogTag)

    let dialogScheduleLabel = document.createElement('div')
    dialogScheduleLabel.classList.add('dialog-schedule', 'schedule-label')
    dialogScheduleLabel.appendChild(document.createTextNode('Schedule: '))
    dialog.appendChild(dialogScheduleLabel)

    let dialogScheduleList = document.createElement('div')
    dialogScheduleList.classList.add('dialog-schedule', 'schedule-list')

    if (item.schedule.length === 0) {
      let dialogScheduleItem = document.createElement('div')
      dialogScheduleItem.classList.add('dialog-schedule', 'schedule-item')
      dialogScheduleItem.appendChild(document.createTextNode('EMPTY'))

      dialogScheduleList.appendChild(dialogScheduleItem)
    } else {
      item.schedule.forEach((schedule, i) => {
        let dialogScheduleItem = document.createElement('div')
        dialogScheduleItem.classList.add('dialog-schedule', 'schedule-item')
        let scheduleHour = schedule.time.split(':')[0]
        let scheduleMinute = schedule.time.split(':')[1]
        let scheduleTime
        if (scheduleHour > 12) {
          scheduleTime = (scheduleHour-12) + ':' + scheduleMinute + ' PM'
        } else if (scheduleHour == 12) {
          scheduleTime = scheduleHour + ':' + scheduleMinute + ' PM'
        } else {
          scheduleTime = scheduleHour + ':' + scheduleMinute + ' AM'
        }
        dialogScheduleItem.appendChild(document.createTextNode(scheduleTime+' : '+schedule.name))
        dialogScheduleList.appendChild(dialogScheduleItem)
      });
    }
    dialog.appendChild(dialogScheduleList)

    dialogList.appendChild(dialog)

    // add listeners for button presses
    itemRemoveButton.addEventListener('click', () => {
      let deleteOk = config.day_schedule.findIndex((object) => object.schedule === item.name)===-1
      config.week_types?.forEach((weekType, i) => {
        if (weekType.schedule.includes(item.name)) {
          deleteOk = false
        }
      });

      if (deleteOk) { // Check references: if ok
        if (window.confirm("Confirm Delete")) {
          config.day_types.splice(i, 1);
          sessionStorage.setItem('configFile', JSON.stringify(config))
        }
      } else {
        window.alert('Cannot Delete: Referenced in other schedule\n\nDelete all references then try again')
      }
      displayItems()
    })

    itemViewButton.addEventListener('click', () => {
      Array.from(document.querySelectorAll('.dialog-schedule.dialog')).forEach((item) => {
        item.removeAttribute('open')
      });
      dialog.setAttribute('open','')
    })

    dialogCloseButton.addEventListener('click', () => {
      dialog.removeAttribute('open')
    })
  }

  // custom color picker displays
  dayBackgroundColor.addEventListener('input', () => dayBackgroundColorDisplay.style.backgroundColor = dayBackgroundColor.value)
  dayTextColor.addEventListener('input', () => dayTextColorDisplay.style.backgroundColor = dayTextColor.value)
  dayBackgroundColorDisplay.style.backgroundColor = dayBackgroundColor.value
  dayTextColorDisplay.style.backgroundColor = dayTextColor.value

  // Add button
  addTypeButton.addEventListener('click', () => {
    if (dayName.value !== '' && dayDisplayName.value !== '') {
      let currentDayType = {
        name: dayName.value,
        display_name: dayDisplayName.value,
        color: dayBackgroundColor.value,
        text_color: dayTextColor.value,
        tag: dayTag.value,
        schedule: newSchedule
      }
      let currentTypeIndex = config.day_types.findIndex((object) => object.name === dayName.value)
      if (currentTypeIndex === -1) {
        config.day_types.push(currentDayType)
      } else {
        config.day_types[currentTypeIndex] = currentDayType
      }
      sessionStorage.setItem('configFile', JSON.stringify(config))
      displayItems()

      dayName.value = ''
      dayDisplayName.value = ''
      dayBackgroundColor.value = '#000000'
      dayTextColor.value = '#000000'
      dayBackgroundColorDisplay.style.backgroundColor = dayBackgroundColor.value
      dayTextColorDisplay.style.backgroundColor = dayTextColor.value
      dayTag.value = ''
      newSchedule = []

      updateDaySchedule()

    } else {
      window.alert('Not all required fields filled')
    }
  })

  // day types dropdown
  setDropdown()

  function setDropdown() {
    while (dayTypesList.firstChild) {
        dayTypesList.removeChild(dayTypesList.firstChild);
    }
    while (importTypeSelect.firstChild) {
        importTypeSelect.removeChild(importTypeSelect.firstChild);
    }

    while (importColorsSelect.firstChild) {
        importColorsSelect.removeChild(importColorsSelect.firstChild);
    }

    let blankSelect = '--Select Option--';

    // let dayTypeOptionBlankSelect = document.createElement('option')
    // dayTypeOptionBlankSelect.appendChild(document.createTextNode(blankSelect))
    // dayTypesList.appendChild(dayTypeOptionBlankSelect);

    let importTypeOptionBlankSelect = document.createElement('option')
    importTypeOptionBlankSelect.appendChild(document.createTextNode(blankSelect))
    importTypeSelect.appendChild(importTypeOptionBlankSelect);

    let importColorsOptionBlankSelect = document.createElement('option')
    importColorsOptionBlankSelect.appendChild(document.createTextNode(blankSelect))
    importColorsSelect.appendChild(importColorsOptionBlankSelect);



    config.day_types.forEach((item, i) => {
      let dayTypeOption = document.createElement('option')
      dayTypeOption.appendChild(document.createTextNode(item.name))
      dayTypesList.appendChild(dayTypeOption);

      let importTypeOption = document.createElement('option')
      importTypeOption.appendChild(document.createTextNode(item.name))
      importTypeSelect.appendChild(importTypeOption);

      let importColorsOption = document.createElement('option')
      importColorsOption.appendChild(document.createTextNode(item.name))
      importColorsSelect.appendChild(importColorsOption);
    });
  }

  // period names dropdown
  setNames()

  function setNames() {
    while (periodNamesList.firstChild) {
        periodNamesList.removeChild(periodNamesList.firstChild);
    }
    let allClassNames = []
    config.day_types.forEach((schedule, i) => {
      schedule.schedule.forEach((item, i) => {
        if (!allClassNames.includes(item.name)) {
          allClassNames.push(item.name)
        }
      });
    });
    allClassNames.sort()
    allClassNames.forEach((item, i) => {
      let classNameOption = document.createElement('option')
      classNameOption.appendChild(document.createTextNode(item))
      periodNamesList.appendChild(classNameOption)
    });

  }

  importTypeButton.addEventListener('click', () => {
    let currentDayType = config.day_types.find((object) => object.name === importTypeSelect.value)
    if (currentDayType !== undefined) {
      dayDisplayName.value = currentDayType.display_name
      dayBackgroundColor.value = currentDayType.color
      dayTextColor.value = currentDayType.text_color
      dayBackgroundColorDisplay.style.backgroundColor = dayBackgroundColor.value
      dayTextColorDisplay.style.backgroundColor = dayTextColor.value
      dayTag.value = currentDayType.tag
      newSchedule = Array.from(currentDayType.schedule)
      updateDaySchedule()
    }
  });

  importColorsButton.addEventListener('click', () => {
    let currentDayType = config.day_types.find((object) => object.name === importColorsSelect.value)
    if (currentDayType !== undefined) {
      dayBackgroundColor.value = currentDayType.color
      dayTextColor.value = currentDayType.text_color
      dayBackgroundColorDisplay.style.backgroundColor = dayBackgroundColor.value
      dayTextColorDisplay.style.backgroundColor = dayTextColor.value
      dayTag.value = currentDayType.tag
      updateDaySchedule()
    }
  });

  // adding schedule items
  let newSchedule = []

  updateDaySchedule()

  function updateDaySchedule() {
    while (dayScheduleList.firstChild) {
        dayScheduleList.removeChild(dayScheduleList.firstChild);
    }
    if (newSchedule.length === 0) {
      dayScheduleList.appendChild(document.createTextNode('EMPTY'))
    } else {
      newSchedule.sort((a,b) => {
        return (a.time.split(':')[0]*12+a.time.split(':')[1])-(b.time.split(':')[0]*12+b.time.split(':')[1])
      })

      newSchedule.forEach((item, i) => {
        // fix time
        let timeList = item.time.split(':')
        timeList[0] = timeList[0].padStart(2,'0')
        item.time = timeList.join(':')
        let dayScheduleItem = document.createElement('div')
        dayScheduleItem.classList.add('day-schedule-item')
        let scheduleHour = item.time.split(':')[0]
        let scheduleMinute = item.time.split(':')[1]
        let scheduleTime
        if (scheduleHour > 12) {
          scheduleTime = (scheduleHour-12) + ':' + scheduleMinute + ' PM'
        } else if (scheduleHour == 12) {
          scheduleTime = scheduleHour + ':' + scheduleMinute + ' PM'
        } else {
          scheduleTime = scheduleHour + ':' + scheduleMinute + ' AM'
        }
        dayScheduleItem.appendChild(document.createTextNode(scheduleTime+' : '+item.name))

        let dayScheduleItemRemoveButton = document.createElement('button')
        dayScheduleItemRemoveButton.setAttribute('type','button')
        dayScheduleItemRemoveButton.classList.add('item-remove-button', 'day-schedule-item-remove')

        let dayScheduleItemRemove = document.createElement('i')
        dayScheduleItemRemove.classList.add('fa-solid', 'fa-trash', 'item-remove')
        dayScheduleItemRemoveButton.appendChild(dayScheduleItemRemove)
        dayScheduleItem.appendChild(dayScheduleItemRemoveButton)
        dayScheduleList.appendChild(dayScheduleItem)

        dayScheduleItemRemoveButton.addEventListener('click', () => {
          newSchedule.splice(i,1)
          updateDaySchedule()
        })

        let dayScheduleItemEditButton = document.createElement('button')
        dayScheduleItemEditButton.setAttribute('type','button')
        dayScheduleItemEditButton.classList.add('item-edit-button', 'day-schedule-item-edit')

        let dayScheduleItemEdit = document.createElement('i')
        dayScheduleItemEdit.classList.add('fa-solid', 'fa-pen-to-square', 'item-remove')
        dayScheduleItemEditButton.appendChild(dayScheduleItemEdit)
        dayScheduleItem.appendChild(dayScheduleItemEditButton)
        dayScheduleList.appendChild(dayScheduleItem)

        dayScheduleItemEditButton.addEventListener('click', () => {
          dayScheduleAddTime.value = item.time
          dayScheduleAddName.value = item.name
          newSchedule.splice(i,1)
          updateDaySchedule()
          dayScheduleAddTime.focus({focusVisible:true})
        })


      });
    }
  }

  dayScheduleAddButton.addEventListener('click', () => {
    dayScheduleAddTime.focus({focusVisible:true})
    if (dayScheduleAddTime.value !== '') {
      newSchedule.push({time:dayScheduleAddTime.value, name: dayScheduleAddName.value})
      dayScheduleAddTime.value = ''
      dayScheduleAddName.value = ''
      updateDaySchedule()
    } else {
      window.alert('Invalid time')
    }
  })
})
