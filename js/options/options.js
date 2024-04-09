// HTMl Elements
let classNamesGroup = document.getElementById('class-names-group');
let classNamesSection = document.getElementById('class-names-section');

let bellOffsetGroup = document.getElementById('bell-offset-group');
let bellOffsetSection = document.getElementById('bell-offset-section');
let noOffset = document.getElementById('no-offset');
let customOffset = document.getElementById('custom-offset');
let customOffsetSeconds = document.getElementById('custom-offset-seconds');
let presetOffset = document.getElementById('preset-offset');

let themeSection = document.getElementById('theme-section');
let lightTheme = document.getElementById('light-theme');
let darkTheme = document.getElementById('dark-theme');
let systemTheme = document.getElementById('system-theme');
let customTheme = document.getElementById('custom-theme');
let primaryCustomTheme = document.getElementById('primary-custom-theme');
let backgroundCustomTheme = document.getElementById('background-custom-theme');
let useDarkStyles = document.getElementById('use-dark-styles');

let jazzChamberSection = document.getElementById('jazz-chamber-section');
let showJazzCheckbox = document.getElementById('show-jazz');
let showChamberCheckbox = document.getElementById('show-chamber');

let otherSection = document.getElementById('other-section');
let showMillisecondsCheckbox = document.getElementById('show-milliseconds');

let versionNumberText = document.getElementById('version-number-text');

// Interval variables and start & stop functions
let optionsUpdateInterval;

function startIntervals() {
  optionsUpdateInterval = setInterval(optionsUpdate, 1e3);
}

function stopIntervals() {
  clearInterval(optionsUpdateInterval);
}

// start
optionsUpdate();
updateVersionNumber();

// update data & show current settings
async function optionsUpdate() {
  await updateData(true)
  updateClassNamesSection()
  updateBellOptionsSection()
  updateThemeSection()
  updateJazzChamberSection()
  updateOtherSection()
}

function updateClassNamesSection() {
  classNamesGroup.innerHTML = ''

  classNames.forEach(item => {
    let tempClassNameLabel = document.createElement('label')
    tempClassNameLabel.for = item.class
    tempClassNameLabel.innerHTML = item.class

    let tempClassNameInput = document.createElement('input')
    tempClassNameInput.type = 'text'
    tempClassNameInput.name = item.class;
    tempClassNameInput.value = item.name
    tempClassNameInput.classList.add('class-name-input')
    tempClassNameInput.dataset.data = JSON.stringify(item);

    classNamesGroup.appendChild(tempClassNameLabel);
    classNamesGroup.appendChild(tempClassNameInput);

  });

  classNamesSection.classList.add('show');
}

function updateBellOptionsSection() {
  if (bellOffsetSetting == 'preset') {
    presetOffset.checked = true;
  } else if (bellOffsetSetting == 0) {
    noOffset.checked = true;
  } else {
    customOffset.checked = true;
    customOffsetSeconds.value = bellOffsetSetting;
  }
  bellOffsetSection.classList.add('show')
  document.querySelector('label[for="preset-offset"]').textContent = "Preset Offset (Reccomended) : " + bellOffset + " Seconds"; 
}

function updateThemeSection() {
  if (theme == 'dark') {
    darkTheme.checked = true;
  } else if (theme == 'light') {
    lightTheme.checked = true;
  } else if (theme?.custom) {
    customTheme.checked = true;
    primaryCustomTheme.value = theme.primary;
    backgroundCustomTheme.value = theme.background;
    useDarkStyles.checked = theme.useDarkStyleBorders;
  } else {
    systemTheme.checked = true;
  }
  themeSection.classList.add('show')
}

function updateJazzChamberSection() {
  if (showJazz) {
    showJazzCheckbox.checked = true;
  } else {
    showJazzCheckbox.checked = false;
  }
  if (showChamber) {
    showChamberCheckbox.checked = true;
  } else {
    showChamberCheckbox.checked = false;
  }
  jazzChamberSection.classList.add('show')

}

function updateOtherSection() {
  if (showMilliseconds) {
    showMillisecondsCheckbox.checked = true;
  } else {
    showMillisecondsCheckbox.checked = false;
  }
  otherSection.classList.add('show')
}

async function updateVersionNumber() {
  versionNumberText.textContent = await getVersion();
}

// save functions
document.body.addEventListener('change', saveAllOptions)

// setTimeout(function () {
//   saveAllOptions()
// }, 10);

function saveAllOptions() {
  // class names
  classNames = Array.from(document.getElementsByClassName('class-name-input'))
  classNames.forEach((item, i) => {
    let tempData = JSON.parse(item.dataset.data)
    tempData.name = item.value
    classNames[i] = tempData
  });
  if (classNames.length) {
    setOption('classNames', classNames)
  }

  // bell options
  if (noOffset.checked) {
    bellOffsetSetting = 0
  } else if (customOffset.checked) {
    bellOffsetSetting = customOffsetSeconds.value;
  } else {
    bellOffsetSetting = 'preset';
  }
  setOption('bellOffsetSetting', bellOffsetSetting)

  // theme
  if (lightTheme.checked) {
    theme = 'light'
  } else if (darkTheme.checked) {
    theme = 'dark'
  } else if (customTheme.checked) {
    theme = {custom: true}
    theme.primary = primaryCustomTheme.value
    theme.background = backgroundCustomTheme.value
    theme.useDarkStyleBorders = useDarkStyles.checked
    console.log(theme);
  } else {
    theme = 'use-system'
  }
  setOption('theme', theme)

  // jazz & chamber
  if (showJazzCheckbox.checked) {
    showJazz = true;
  } else {
    showJazz = false;
  }
  setOption('showJazz', showJazz)

  if (showChamberCheckbox.checked) {
    showChamber = true;
  } else {
    showChamber = false;
  }
  setOption('showChamber', showChamber)

  // other
  if (showMillisecondsCheckbox.checked) {
    showMilliseconds = true;
  } else {
    showMilliseconds = false;
  }
  setOption('showMilliseconds', showMilliseconds)


  console.log('saved');
  optionsUpdate()
}

// various event listners
customOffsetSeconds.addEventListener('change', () => customOffset.checked = true)
