import React from 'react';
import PropTypes from 'prop-types';
import AFRAME from 'aframe';
//import {Entity, Scene} from 'aframe-react';
import 'aframe-state-component';
//import promise from 'asm-async-loader!ar.js/aframe/build/aframe-ar';
import './ARScene.css';
import transparentPixel from './transparent-1px.png';

class ARScene extends React.Component {
  constructor() {
    super();

    AFRAME.registerState({
      initialState: {
        kittyImageData: '',
        //kittyImageAssetId: '#transparent-pixel'
      },

      handlers: {
        setKittyImageData: function(state, action) {
          state.kittyImageData = action.kittyImageData;
          //state.kittyImageAssetId = '#kitty-from-storage';
        }
      }
    });

    const arjsScript = document.createElement('script');
    arjsScript.src = 'https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.0/aframe/build/aframe-ar.js';
    arjsScript.async = true;
    document.body.appendChild(arjsScript);
  }

  loadSelectedKittyFromLocalStorage(kittyId) {
    let kittyItem = `kitty-${kittyId}`;
    let kittyImageData = JSON.parse(localStorage.getItem(kittyItem)).imageData;
    AFRAME.scenes[0].emit('setKittyImageData', {kittyImageData: kittyImageData});
  }

  componentDidUpdate() {
    const { selectedKittyId } = this.props;

    if (selectedKittyId) {
      this.loadSelectedKittyFromLocalStorage(selectedKittyId);
    }
  }

  render() {
    return (
      <a-scene
        embedded
        kitty-scene
        arjs="sourceType: webcam; debugUIEnabled: false;"
      >
        <a-assets>
          <img id="transparent-pixel" src={transparentPixel} alt="" />
          <img id="kitty-from-storage" bind__src="kittyImageData" alt="" />
        </a-assets>

        <a-image
          id="kittyImage"
          bind__src="kittyImageData"
          width="3"
          height="3"
          position="0 0.5 0"
          rotation="0 0 0">
        </a-image>

        <a-marker-camera
          preset="hiro">
        </a-marker-camera>
      </a-scene>
    )
  }
}

ARScene.propTypes = {
  selectedKittyId: PropTypes.string,
}

export default ARScene;
