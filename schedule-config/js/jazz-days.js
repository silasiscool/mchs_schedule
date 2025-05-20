config_file.then((savedConfig) => { // open saved config file
  // load config file
  if (!sessionStorage.getItem('configFile')) {
    sessionStorage.setItem('configFile',JSON.stringify(savedConfig))
  }
  let config = JSON.parse(sessionStorage.getItem('configFile'));

  // store elements
  const addDateButton = document.getElementById('add-date-button')
  const addDate = document.getElementById('add-date')
  const itemList = document.getElementById('item-list')

  // display current Settings
  displayDays()

  function displayDays() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    config.jazz_days.forEach((item, i) => {
      addItem(new Date(item), 'item-item-'+i)
    });
  }

  function addItem(date, id) {
    let dateString = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()] + ', '
    dateString += ['January','Febuary','March','April','May','June','July','August','September','October','November','December'][date.getMonth()] + ' '
    dateString += ordinal_suffix_of(date.getDate()) + ', ' + date.getFullYear()

    let itemItem = document.createElement('div')
    itemItem.classList.add('item-item')
    itemItem.setAttribute('id', id)

    let itemName = document.createElement('div')
    itemName.classList.add('item-name')
    itemName.appendChild(document.createTextNode(dateString))

    let itemRemoveButton = document.createElement('button')
    itemRemoveButton.setAttribute('type','button')
    itemRemoveButton.classList.add('item-remove-button')
    itemRemoveButton.addEventListener('click', () => {
      config.jazz_days.splice(id.split('-').slice(-1)[0],1)
      sessionStorage.setItem('configFile', JSON.stringify(config))
      displayDays()
    })

    let itemRemove = document.createElement('i')
    itemRemove.classList.add('fa-solid', 'fa-trash', 'item-remove')

    itemItem.appendChild(itemName)
    itemRemoveButton.appendChild(itemRemove)
    itemItem.appendChild(itemRemoveButton)

    itemList.appendChild(itemItem)
  }

  // add date function
  addDateButton.addEventListener('click', () => {
    let newDate = new Date(addDate.valueAsNumber)
    newDate = new Date(newDate.setDate(newDate.getDate() + 1))
    if (!isNaN(newDate)) {
      addDate.value = ''
      config.jazz_days.push(monthDayYear(newDate))
      config.jazz_days.sort((a,b) => {
        return new Date(a).getTime() - new Date(b).getTime()
      })
      sessionStorage.setItem('configFile', JSON.stringify(config))
      displayDays()
    }
  })
})
