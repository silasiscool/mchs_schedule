config_file.then((savedConfig) => { // open saved config file
  // load config file
  if (!sessionStorage.getItem('configFile')) {
    sessionStorage.setItem('configFile',JSON.stringify(savedConfig))
  }
  let config = JSON.parse(sessionStorage.getItem('configFile'));



  let list = document.getElementById('list')

  let allClassNames = []
  config.day_types.forEach((schedule, i) => {
    console.log(schedule);
    schedule.schedule.forEach((item, i) => {
      if (!allClassNames.includes(item.name)) {
        allClassNames.push(item.name)
        console.log(item.name, item);
      }
    });
  });
  allClassNames.sort()

  allClassNames.forEach((item, i) => {
    let listItem = document.createElement('div')

    let itemCheckbox = document.createElement('input')
    itemCheckbox.setAttribute('type', 'checkbox')
    itemCheckbox.setAttribute('id','item-'+i)
    listItem.appendChild(itemCheckbox)
    itemCheckbox.checked = config.nameable_classes.includes(item)

    itemCheckbox.addEventListener('change', () => {
      if (itemCheckbox.checked && !config.nameable_classes.includes(item)) {
        config.nameable_classes.push(item)
      } else if (!itemCheckbox.checked && config.nameable_classes.includes(item)) {
        config.nameable_classes.splice(config.nameable_classes.indexOf(item), 1)
      }
      sessionStorage.setItem('configFile', JSON.stringify(config))
    })

    let itemLabel = document.createElement('label')
    itemLabel.setAttribute('for', 'item-'+i)
    itemLabel.appendChild(document.createTextNode(item))
    listItem.appendChild(itemLabel)

    list.appendChild(listItem)
  });

})
