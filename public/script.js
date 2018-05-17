$(function() {
  $kittyLoaderOverlay = $('.window__kitty-loader-overlay');
  $launchSceneButton = $('.js-launch-scene');
  $aFrameKittyImage = document.querySelector('#kittyImage');

  $launchSceneButton.on('click', function() {
    $kittyLoaderOverlay.addClass('hide');
  });

  AFRAME.registerComponent('kitty-scene', {
    init: function() {
      console.log('kitty-scene has init');
      $launchSceneButton.prop('disabled', false);
      $launchSceneButton.text('Launch scene');
      $aFrameKittyImage.setAttribute('src', '#kitty-from-data');
    }
  })
});
