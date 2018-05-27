import React from 'react';
import './Aframe.css';
import transparentPixel from './transparent-1px.png'

class Aframe extends React.Component {
  render() {
    return (
      <a-scene embedded kitty-scene arjs="sourceType: webcam; debugUIEnabled: false;">
        <a-assets>
          <img id="transparent-pixel" src={transparentPixel} />
        </a-assets>

        <a-image id="kittyImage" src="#transparent-pixel" width="3" height="3" position="0 0.5 0" rotation="0 0 0"></a-image>
        <a-marker-camera preset="hiro"></a-marker-camera>
      </a-scene>
    )
  }
}

export default Aframe;
