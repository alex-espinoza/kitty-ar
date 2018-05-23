$(function() {
  var $kittyLoaderOverlay = $('.window__kitty-loader-overlay');
  var $launchSceneButton = $('.js-launch-scene');
  var $aFrameKittyImage = document.querySelector('#kittyImage');
  var $aFrameAssets = document.querySelector('a-assets');

  $launchSceneButton.on('click', async function() {
    var kittyId = 12345;
    var kittyData = await getKittyDataById(kittyId);

    if (kittyData.imageUrl !== null && kittyData.imageExtension !== null && kittyData.imageData !== null) {
      console.log('kitty image was successfully found and fetched');
      await saveKittyDataToLocalStorage(kittyId, kittyData);
      await loadKittyFromLocalStorage(kittyId);

      $kittyLoaderOverlay.hide();
    } else {
      console.log('kitty image could not be found');
      // handle showing error on screen here
    }
  });

  async function getKittyDataById(kittyId) {
    var kittyData;
    var kittyDataEndpoint = `https://wt-f8af72159b229d5a895848a643ddf7bf-0.sandbox.auth0-extend.com/kitty-image-to-base64?kittyId=${kittyId}`;

    await fetch(kittyDataEndpoint)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response);
        }

        return response.json();
      })
      .then(function(json) {
        console.log(`200 success when fetching kitty ${kittyId} image data:`, json);
        kittyData = json;
      })
      .catch(function(error) {
        console.log(`there was an error when fetching kitty ${kittyId} image data:`, error);
        var kittyData = {
          id: kittyId,
          name: null,
          bio: null,
          imageUrl: null,
          imageExtension: null,
          imageData: null,
        };
      });

    return kittyData;
  }

  function saveKittyDataToLocalStorage(kittyId, kittyData) {
    var kittyItem = `kitty-${kittyId}`;
    var stringifiedKittyData = JSON.stringify(kittyData);

    localStorage.setItem(kittyItem, stringifiedKittyData);
    console.log(kittyItem, 'has been saved to localStorage');
  }

  function loadKittyFromLocalStorage(kittyId) {
    var kittyItem = `kitty-${kittyId}`;
    var kittyImageData = JSON.parse(localStorage.getItem(kittyItem)).imageData;

    var newKittyImageElement = document.createElement('img');
    newKittyImageElement.setAttribute('id', 'kitty-from-storage');
    newKittyImageElement.setAttribute('src', kittyImageData);
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
