export const getAllKittiesFromLocalStorage = () => {
  let localStorageKitties = [];

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);

    if (key.startsWith('kitty-')) {
      let kittyData = JSON.parse(localStorage.getItem(key));
      localStorageKitties.push(kittyData);
    }
  }

  return localStorageKitties;
}

export const loadKittyFromLocalStorage = (kittyId) => {
  let kittyItem = `kitty-${kittyId}`;
  let kittyData = JSON.parse(localStorage.getItem(kittyItem));
  let kittyImageData = kittyData.imageData;
  document.querySelector('#kittyImage').setAttribute('src', kittyImageData);
  return kittyData;
}

export const saveKittyToLocalStorage = (kittyId, kittyData) => {
  var kittyItem = `kitty-${kittyId}`;
  var stringifiedKittyData = JSON.stringify(kittyData);
  localStorage.setItem(kittyItem, stringifiedKittyData);
}

export const deleteKittyFromLocalStorage = (kittyId) => {
  var kittyItem = `kitty-${kittyId}`;
  let kittyData = JSON.parse(localStorage.getItem(kittyItem));
  localStorage.removeItem(kittyItem);
  return kittyData;
}

export const checkIfKittyAlreadySaved = (kittyId) => {
  let kittyItem = `kitty-${kittyId}`;
  return kittyItem in localStorage ? true : false;
}
