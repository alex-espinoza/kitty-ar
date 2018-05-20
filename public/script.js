$(function() {
  var $kittyLoaderOverlay = $('.window__kitty-loader-overlay');
  var $launchSceneButton = $('.js-launch-scene');
  var $aFrameKittyImage = document.querySelector('#kittyImage');
  var $aFrameAssets = document.querySelector('a-assets');

  $launchSceneButton.on('click', async function() {
    var kittyImageBase64 = await getKittyImageBase64ById(1);

    if (!$.isEmptyObject(kittyImageBase64) || kittyImageBase64 != null) {
      console.log('kitty image was successfully found and fetched');
      await saveKittyImageBase64ToLocalStorage(kittyImageBase64);
      await loadKittyImageFromBase64(kittyImageBase64);

      $kittyLoaderOverlay.hide();
    } else {
      console.log('kitty image could not be found');
    }
  });

  async function getKittyImageBase64ById(kittyId) {
    var kittyImageExtensions = ['.png', '.svg'];
    var kittyImageBase64 = {};

    for (var i = 0; i < kittyImageExtensions.length; i++) {
      console.log('checking for kitty image with extension:', kittyImageExtensions[i]);
      var extension = kittyImageExtensions[i];
      kittyImageBase64 = await checkIfKittyImageExists(kittyId, extension);

      if (!$.isEmptyObject(kittyImageBase64)) {
        return kittyImageBase64;
      }
    }

    // kitty image not found for either .png or .svg
    return {};
  }

  async function checkIfKittyImageExists(kittyId, extension) {
    var kittyImageBase64 = '';
    var imageUrlToBase64Endpoint = 'https://wt-f8af72159b229d5a895848a643ddf7bf-0.sandbox.auth0-extend.com/image-url-to-base64?imageUrl=';
    var imageStorageUrl = 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/';
    var imageStorageRequestUrl = imageStorageUrl + kittyId + extension;
    var requestUrl = imageUrlToBase64Endpoint + imageStorageRequestUrl;

    await fetch(requestUrl)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response);
        }

        return response.json();
      })
      .then(function(json) {
        console.log(extension, '200 success when fetching kitty url: ', json);
        kittyImageBase64 = { data: json.data, extension: extension, kittyId: kittyId };
      })
      .catch(function(error) {
        console.log(extension, 'there was an error when fetching kitty url: ', error);
        kittyImageBase64 = {};
      });

    return kittyImageBase64;
  }

  function saveKittyImageBase64ToLocalStorage(base64Object) {
    var kittyItem = 'kitty-' + base64Object.kittyId;
    var kittyDataUri;

    if (base64Object.extension == '.png') {
      kittyDataUri = 'data:image/png;base64,' + base64Object.data;
    } else {
      kittyDataUri = 'data:image/svg+xml;base64,' + base64Object.data;
    }

    localStorage.setItem(kittyItem, kittyDataUri);
    console.log(kittyItem, 'has been saved to localStorage');
  }

  function loadKittyImageFromBase64(base64Object) {
    var kittyItem = 'kitty-' + base64Object.kittyId;
    var newKittyImageElement = document.createElement('img');

    newKittyImageElement.setAttribute('id', 'kitty-from-storage');
    newKittyImageElement.setAttribute('src', localStorage.getItem(kittyItem));
    $aFrameAssets.appendChild(newKittyImageElement);
    $aFrameKittyImage.setAttribute('src', '#kitty-from-storage');

    console.log(kittyItem, 'has been loaded from localStorage');
  }

  AFRAME.registerComponent('kitty-scene', {
    init: function() {
      console.log('kitty-scene has init');

      $launchSceneButton.prop('disabled', false);
      $launchSceneButton.text('Launch scene');
    }
  });
});
