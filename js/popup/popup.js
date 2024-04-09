// element variables
let html = document.querySelector('html')
let body = document.body
let root = document.querySelector(':root')

// css variables
let minWidth = 700;
let maxWidth = 980;

// Interval variables and start & stop functions
let fastUpdateInterval;
let slowUpdateInterval;

function startIntervals() {
  fastUpdateInterval = setInterval(fastUpdate, 10);
  slowUpdateInterval = setInterval(slowUpdate, 1e3);
}

function stopIntervals() {
  clearInterval(fastUpdateInterval);
  clearInterval(slowUpdateInterval);
}

// start
updateData(true)
fastUpdate()
slowUpdate()
startIntervals()

setTimeout(function () {
  document.body.classList.remove('initializing');
}, 1e2);

window.addEventListener('online', () => updateData(true));

window.addEventListener("resize", setScaleAndBorder);



// update visuals
function setScaleAndBorder() {
  // This is for web version, but is causing annoying borders when the banner is activated on the extension version, so it is being removed for now, hopefully will be fixed sometime when I'm not feeling lazy...

  // if (html.clientWidth/html.clientHeight > maxWidth/body.clientHeight) {
  //   body.classList.add('scale-type-1', 'use-right-border')
  //   body.classList.remove('scale-type-2', 'scale-type-3', 'use-bottom-border')
  //   body.style.scale = html.clientHeight/body.clientHeight;
  //
  // } else if (html.clientWidth/html.clientHeight < minWidth/body.clientHeight) {
  //   body.classList.add('scale-type-2', 'use-bottom-border')
  //   body.classList.remove('scale-type-1', 'scale-type-3', 'use-right-border')
  //   body.style.scale = html.clientWidth/body.clientWidth;
  //
  // } else if (body.clientWidth == html.clientWidth && body.clientHeight == html.clientHeight) {
  //   body.classList.remove('scale-type-1', 'scale-type-2', 'scale-type-3')
  //   body.style.scale = 1
  //
  // } else {
  //   body.classList.add('scale-type-3', 'use-right-border')
  //   body.classList.remove('scale-type-1', 'scale-type-2', 'use-bottom-border')
  //   body.style.scale = html.clientHeight/body.clientHeight;
  // }
  //
  // if (html.clientHeight == body.clientHeight && html.clientWidth == body.clientWidth) {
  //   body.classList.remove('use-right-border', 'use-bottom-border')
  // }

}

function fastUpdate() {
  if (config) {
    updateMainPanel()
    updateSchedulePanel()
    if (['light', 'dark', 'use-system'].includes(getQueryStringParameters().theme)) {
      theme = getQueryStringParameters().theme
    }
    useSetTheme()
  }
  if (events) {
    updateEventsPanel()
  }
}

function slowUpdate() {
  if (!window.navigator.onLine && localStorage.length == 0) {
    document.body.classList.add('no-offline-data')
  } else if (localStorage.length == 0) {
    updateData(true);
  } else {
    document.body.classList.remove('no-offline-data')
  }

  updateData(false)
  updateBanner()
  setScaleAndBorder()

}







// if (parameters.theme == 'dark') {
//   localStorage.setItem('theme', 'dark')
// } else if (parameters.theme == 'light') {
//   localStorage.setItem('theme', 'light')
// } else {
//   localStorage.setItem('theme', 'use-system')
// }
