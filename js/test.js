fetch("https://slotslaunch.com/api/games?token=pHUifjxaWJ7D7TIrpfu3LkxVYRhkjAW8MDtn0L5CgXVLVKZax3", {
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
})
  .then(res => res.json())
  .then(data => {
    console.log(data);
    // отображение игр, iframe-линков и т.д.
  })
  .catch(err => console.error(err));