export const loadKittyFromLocalStorage = (kittyId) => {
  let kittyItem = `kitty-${kittyId}`;
  let kittyImageData = JSON.parse(localStorage.getItem(kittyItem)).imageData;
  document.querySelector('#kittyImage').setAttribute('src', kittyImageData);
}

export const saveKittyToLocalStorage = (kittyId, kittyData) => {
  var kittyItem = `kitty-${kittyId}`;
  var stringifiedKittyData = JSON.stringify(kittyData);
  localStorage.setItem(kittyItem, stringifiedKittyData);
  console.log(kittyItem, 'has been saved to localStorage');
}
