import React from 'react';
import KittyLoader from './components/kitty-loader/KittyLoader';
import OverlayButton from './components/overlay-button/OverlayButton';
import 'aframe';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.loadARjs();

    this.state = {
      showKittyLoader: true
    };

    this.handleSelectKittyButton = this.handleSelectKittyButton.bind(this);
    this.handleOverlayButton = this.handleOverlayButton.bind(this);
  }

  loadARjs() {
    const arjsScript = document.createElement('script');
    arjsScript.src = 'https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.0/aframe/build/aframe-ar.js';
    arjsScript.async = true;
    document.body.appendChild(arjsScript);
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
    document.querySelector('#kittyImage').setAttribute('src', kittyImageData);
  }

  handleOverlayButton() {
    this.setState({
      showKittyLoader: true
    });
  }

  render() {
    const { showKittyLoader } = this.state;

    return (
      <div>
        <KittyLoader
          showKittyLoader={showKittyLoader}
          handleSelectKittyButton={this.handleSelectKittyButton}
        />

        <OverlayButton
          handleOverlayButton={this.handleOverlayButton}
        />
      </div>
    );
  }
}

export default App;
