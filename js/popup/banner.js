let banner = document.getElementById('banner');
let bannerContent = document.getElementById('banner-content');
let bannerDismissButton = document.getElementById('banner-dismiss-button');

bannerDismissButton.addEventListener('click', () => {
  dismissedBanners.push(bannerData.id);
  setOption('dismissedBanners',dismissedBanners);
  showBanner(false);
})

async function updateBanner() {
  await updateBannerData()
  if (
    getQueryStringParameters().hideBanner
    || bannerData.min_version == 'none'
    || !dismissedBanners
    || dismissedBanners.includes(bannerData.id)
  ) {
    showBanner(false)
  } else if (bannerData.min_version == 'all' || versionNumberCompare(await getVersion(), bannerData.min_version, '>=')) {
    showBanner(true)
  } else showBanner(false)
}

function showBanner(showBanner) {
  if (showBanner) {
    bannerContent.innerHTML = bannerData.text;
    if (bannerData.non_dismissable) {
      banner.classList.remove('dismissable')
    } else {
      banner.classList.add('dismissable')
    }
    root.style.setProperty('--banner-height', banner.clientHeight + 'px');
    banner.classList.add('show');
  } else {
    banner.classList.remove('show')
    root.style.setProperty('--banner-height', 0);
    // bannerContent.innerHTML = '';
  }
}
