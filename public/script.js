$(function() {
  var $body = $('body');
  var $kittyLoaderOverlay = $('.window__kitty-loader-overlay');
  var $kittyLoaderList = $('.window__kitty-loader-list');
  var $selectKittyButton = $('.js-select-kitty');
  var $loadKittyButton = $('.js-load-kitty');
  var $aFrameKittyImage = document.querySelector('#kittyImage');
  var $aFrameAssets = document.querySelector('a-assets');
  var $aScene = document.querySelector('a-scene');
  var $openOverlayButton = $('.window__kitty-open-overlay-button');
  var $loadKittyIdInput  = $('#load-kitty-id');
  var $loadingBlockText = $('.window__loading-block-text');

  $selectKittyButton.on('click', async function() {
    var kittyId = $kittyLoaderList.find('.window__kitty-loader-list-image-selected').data('kitty-id');
    await removeExistingLoadedKitty();
    await loadKittyFromLocalStorage(kittyId);
    $body.removeClass('overlay-open');
  });

  $loadKittyButton.on('click', async function() {
    disableLoadKittyButton();

    var kittyId = $loadKittyIdInput.val();

    if (await checkIfKittyAlreadySaved(kittyId)) {
      console.log('kitty was already saved! loading kitty #', kittyId);
      clearLoadKittyInput();
      disableLoadKittyButton();
      return;
    }

    var kittyData = await getKittyDataById(kittyId);

    if (kittyData.imageUrl !== null && kittyData.imageExtension !== null && kittyData.imageData !== null) {
      console.log('kitty image was successfully found and fetched');
      await saveKittyDataToLocalStorage(kittyId, kittyData);
      await removeExistingLoadedKitty();
      await loadKittyFromLocalStorage(kittyId);

      $body.removeClass('overlay-open');

      addKittiesToLoaderListFromLocalStorage();
      clearLoadKittyInput();
      disableLoadKittyButton();
    } else {
      console.log('kitty image data could not be fetched, try again');
      enableLoadKittyButton();
    }

    setLoadingBlock(false);
  });

  async function checkIfKittyAlreadySaved(kittyId) {
    var kittyItem = `kitty-${kittyId}`;

    if (kittyItem in localStorage) {
      await removeExistingLoadedKitty();
      await loadKittyFromLocalStorage(kittyId);
      $body.removeClass('overlay-open');

      return true;
    } else {
      return false;
    }
  }

  function clearLoadKittyInput() {
    $loadKittyIdInput.val('');
  }

  function disableLoadKittyButton() {
    $loadKittyButton.attr('disabled', true);
  }

  function enableLoadKittyButton() {
    $loadKittyButton.attr('disabled', false);
  }

  function setLoadingBlock(display, text) {
    if (display) {
      $body.addClass('loading');
    } else {
      $body.removeClass('loading');
    }

    if (text) {
      $loadingBlockText.text(text);
    }
  }

  async function getKittyDataById(kittyId) {
    var kittyData;
    var kittyDataEndpoint = `https://wt-f8af72159b229d5a895848a643ddf7bf-0.sandbox.auth0-extend.com/kitty-image-to-base64?kittyId=${kittyId}`;

    setLoadingBlock(true, 'Getting your kitty...');

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

  function removeExistingLoadedKitty() {
    $aFrameKittyImage.setAttribute('src', '#transparent-pixel');
    $('#kitty-from-storage').remove();
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

  function checkIfARLoaded() {
    var checkIfARLoaded = setInterval(function() {
      if ($('a-scene').length && $('a-scene a-assets').length && $('a-scene a-image').length && $('a-scene canvas').length && $('video').length) {
        $body.removeClass('preloading');
        $body.addClass('overlay-open');
        clearInterval(checkIfARLoaded);
      }
    }, 1000);
  }

  var delayFirstARLoadedCheck = setTimeout(function() {
    checkIfARLoaded();
  }, 3000);

  function addKittiesToLoaderListFromLocalStorage() {
    var kittyLoaderList = document.querySelector('.window__kitty-loader-list');
    kittyLoaderList.innerHTML = '';

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);

      if (key.startsWith('kitty-')) {
        var kittyData = JSON.parse(localStorage.getItem(key));
        var newKittyLoaderListItem = document.createElement('img');
        newKittyLoaderListItem.setAttribute('class', 'window__kitty-loader-list-image')
        newKittyLoaderListItem.setAttribute('src', kittyData.imageData);
        newKittyLoaderListItem.setAttribute('data-kitty-id', kittyData.id);
        kittyLoaderList.appendChild(newKittyLoaderListItem);
      }
    }
  }

  addKittiesToLoaderListFromLocalStorage();

  $kittyLoaderList.on('click', '.window__kitty-loader-list-image', function() {
    $kittyLoaderList.find('.window__kitty-loader-list-image').removeClass('window__kitty-loader-list-image-selected');
    $(this).addClass('window__kitty-loader-list-image-selected');
    $selectKittyButton.attr('disabled', false);
  });

  $(document).bind('scroll', function() {
    if ($body.scrollLeft() !== 0) {
      $body.scrollLeft(0);
    }
  });

  $openOverlayButton.on('click', function() {
    $body.addClass('overlay-open');
  });

  $loadKittyIdInput.on('keyup', function() {
    var id = $(this).val();
    var regex = /^[0-9]+$/;

    if (id.match(regex)) {
      enableLoadKittyButton();
    } else {
      disableLoadKittyButton();
    }
  });
});
