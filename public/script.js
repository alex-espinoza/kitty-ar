$(function() {
  var $kittyLoaderOverlay = $('.window__kitty-loader-overlay');
  var $launchSceneButton = $('.js-launch-scene');
  var $aFrameKittyImage = document.querySelector('#kittyImage');
  var $aFrameAssets = document.querySelector('a-assets');

  $launchSceneButton.on('click', async function() {
    var kittyId = 12345;
    var kittyImageData = await getKittyImageDataById(kittyId);

    if (kittyImageData.pngData !== null || kittyImageData.svgData !== null) {
      console.log('kitty image was successfully found and fetched');
      await saveKittyImageDataToLocalStorage(kittyId, kittyImageData);
      await loadKittyImageFromLocalStorage(kittyId);

      $kittyLoaderOverlay.hide();
    } else {
      console.log('kitty image could not be found');
      // handle showing error on screen here
    }
  });

  async function getKittyImageDataById(kittyId) {
    var kittyImageData;
    var kittyImageDataEndpoint = `https://wt-f8af72159b229d5a895848a643ddf7bf-0.sandbox.auth0-extend.com/kitty-image-to-base64?kittyId=${kittyId}`;

    await fetch(kittyImageDataEndpoint)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response);
        }

        return response.json();
      })
      .then(function(json) {
        console.log(`200 success when fetching kitty ${kittyId} image data:`, json);
        kittyImageData = json;
      })
      .catch(function(error) {
        console.log(`there was an error when fetching kitty ${kittyId} image data:`, error);
        kittyImageData = {
          pngData: null,
          svgData: null
        };
      });

    return kittyImageData;
  }

  function saveKittyImageDataToLocalStorage(kittyId, kittyImageData) {
    var kittyItem = 'kitty-' + kittyId;

    if (kittyImageData.pngData !== null) {
      kittyDataUrl = kittyImageData.pngData;
    } else {
      kittyDataUrl = kittyImageData.svgData;
    }

    localStorage.setItem(kittyItem, kittyDataUrl);
    console.log(kittyItem, 'has been saved to localStorage');
  }

  function loadKittyImageFromLocalStorage(kittyId) {
    var kittyItem = 'kitty-' + kittyId;
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
