import React from 'react';
import KittyLoader from './components/kitty-loader/KittyLoader';
import AFRAME from 'aframe';
import 'aframe-state-component';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      showKittyLoader: true
    };

    this.registerAframeState();
    this.loadARjs();
    this.handleSelectKittyButton = this.handleSelectKittyButton.bind(this);
  }

  loadARjs() {
    const arjsScript = document.createElement('script');
    arjsScript.src = 'https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.0/aframe/build/aframe-ar.js';
    arjsScript.async = true;
    document.body.appendChild(arjsScript);
  }

  registerAframeState() {
    AFRAME.registerState({
      initialState: {
        kittyImageData: '#transparent-pixel'
        //kittyImageAssetId: '#transparent-pixel'
      },

      handlers: {
        setKittyImageData: function(state, action) {
          state.kittyImageData = action.kittyImageData;
          //state.kittyImageAssetId = '#kitty-from-storage';
        }
      }
    });
  }

  handleSelectKittyButton(kittyId) {
    this.loadSelectedKittyFromLocalStorage(kittyId);

    this.setState({
      showKittyLoader: false
    });
  }

  loadSelectedKittyFromLocalStorage(kittyId) {
    let kittyItem = `kitty-${kittyId}`;
    let kittyImageData = JSON.parse(localStorage.getItem(kittyItem)).imageData;
    AFRAME.scenes[0].emit('setKittyImageData', {kittyImageData: kittyImageData});
    //document.querySelector('#kitty-from-storage').setAttribute('src', kittyImageData);
  }

  render() {
    const { showKittyLoader } = this.state;

    return (
      <div>
        <KittyLoader
          showKittyLoader={showKittyLoader}
          handleSelectKittyButton={this.handleSelectKittyButton}
        />
      </div>
    );
  }
}

export default App;
