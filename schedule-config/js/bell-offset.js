config_file.then((savedConfig) => { // open saved config file
  // load config file
  if (!sessionStorage.getItem('configFile')) {
    sessionStorage.setItem('configFile',JSON.stringify(savedConfig))
  }
  let config = JSON.parse(sessionStorage.getItem('configFile'));

  // store elements
  const bellOffset = document.getElementById('bell-offset');

  // display current settings
  bellOffset.value = config.bell_offset

  // save changes on change
  bellOffset.addEventListener('change', () => {
    config.bell_offset = bellOffset.value
    sessionStorage.setItem('configFile', JSON.stringify(config))
  })
})
