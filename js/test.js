
console.log('sss')
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append("Origin", "yourdomain.com");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://slotslaunch.test/api/games?pHUifjxaWJ7D7TIrpfu3LkxVYRhkjAW8MDtn0L5CgXVLVKZax3", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
