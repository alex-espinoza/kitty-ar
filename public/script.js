$(function() {
  $kittyLoaderOverlay = $('.window__kitty-loader-overlay');
  $loadSceneButton = $('.js-load-scene');

  $loadSceneButton.on('click', function() {
    $kittyLoaderOverlay.addClass('hide');
  });

  document.querySelector('a-scene').addEventListener('loaded', function () {
    $loadSceneButton.prop('disabled', false);
    $loadSceneButton.text('Launch scene');
  });
});
