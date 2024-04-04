const config_file = fetch('https://script.google.com/macros/s/AKfycbzmPlGpgvvgZRqerq2xx-M_PikKISc6cLKy6Apkk1Rhefo7H12gJ9oVH8QlU0v09FiCDA/exec').then(res => res.json());

const sideNavButton = document.getElementById('side-nav-button');
const sideNav = document.getElementsByClassName('side-nav')[0];
const downloadButton = document.getElementById('download-file-button');
const copyButton = document.getElementById('copy-data-button');
const content = document.getElementsByClassName('content')[0]

sideNavButton.addEventListener('click', () => {
  sideNav.classList.toggle('open');
  sideNavButton.classList.toggle('open');
});

downloadButton.addEventListener('click', () => {
  if (window.confirm("Confirm Download Updated File?")) {
    downloadFile(sessionStorage.getItem('configFile'))
    if (window.confirm("Go to file upload?")) {
      window.open('https://script.google.com/macros/s/AKfycbxOac8gY0O-cryiRJIj-PkNfqdfr_Sw6HpenaoiauhoAit8lz7-vqzae2omah8DBeo/exec','_self');
    }
  }
})

copyButton.addEventListener('click', () =>{
  let formatedData = JSON.stringify(JSON.parse(sessionStorage.getItem('configFile')), null, 2);
  navigator.clipboard.writeText(formatedData);
  alert('Data Copied to clipboard')
})

content.addEventListener('click', () => {
  sideNav.classList.remove('open');
  sideNavButton.classList.remove('open');
})

function downloadFile(data) {
  let formatedData = JSON.stringify(JSON.parse(data), null, 2)
  const file = new File([formatedData], 'config.json', {type: 'application/json'})
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')

  link.href = url
  link.download = file.name
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function monthDayYear(date) {
  return (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
};
