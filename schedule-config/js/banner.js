config_file.then((savedConfig) => { // open saved config file
  // load config file
  if (!sessionStorage.getItem('configFile')) {
    sessionStorage.setItem('configFile',JSON.stringify(savedConfig))
  }
  let config = JSON.parse(sessionStorage.getItem('configFile'));

  // store elements
  const bannerText = document.getElementById('banner-text')
  const minVersion = document.getElementById('min-version')
  const bannerId = document.getElementById('banner-id')
  const bannerDismissible = document.getElementById('banner-dismissible')
  const responseError = document.getElementById('response-error')

  // display current settings
  bannerText.value = config.banner.text
  minVersion.value = config.banner.min_version
  bannerId.value = config.banner.id
  bannerDismissible.checked = !config.banner.non_dismissable

  // save changes on change
  bannerText.addEventListener('change', submit)
  minVersion.addEventListener('change', submit)
  bannerId.addEventListener('change', submit)
  bannerDismissible.addEventListener('change', submit)

  let minVersionTest = /^((\d+)\.)*(\d+)$|^none$|^all$/g

  function submit() {
    let validMinVersion = minVersionTest.test(minVersion.value)
    minVersionTest.lastIndex = 0
    if (validMinVersion) {
      responseError.textContent = ''

      config.banner.text = bannerText.value
      config.banner.min_version = minVersion.value
      config.banner.id = bannerId.value
      config.banner.non_dismissable = !bannerDismissible.checked
      sessionStorage.setItem('configFile', JSON.stringify(config))

      updateBannerPreview()
    } else {
      document.getElementById('banner-preview').style.visibility = 'hidden'
      responseError.textContent = 'invalid input'
    }
  }

  function updateBannerPreview() {
    let bannerPreview = document.getElementById('banner-preview')
    let bannerPreviewCloseButton = document.getElementById('banner-preview-close-button')
    let bannerPreviewText = document.getElementById('banner-preview-text')

    bannerPreviewText.innerHTML = config.banner.text

    if (config.banner.non_dismissable) {
      bannerPreviewCloseButton.classList.add('non-dismissable')
    } else {
      bannerPreviewCloseButton.classList.remove('non-dismissable')
    }



    if (config.banner.min_version === 'all') {
      bannerPreview.style.visibility = 'visible'
    } else if (config.banner.min_version === 'none') {
      bannerPreview.style.visibility = 'hidden'
    } else {
      bannerPreview.style.visibility = 'visible'
    }
  }
  updateBannerPreview()
})




// RegEx for version number, none, or all: /^((\d+)\.)*(\d+)$|^none$|^all$/g
