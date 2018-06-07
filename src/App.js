import React from 'react';
import KittyLoader from './components/kitty-loader/KittyLoader';
import OverlayButton from './components/overlay-button/OverlayButton';
import { loadKittyFromLocalStorage, saveKittyToLocalStorage } from './kittyData';
import { getKittyDataById } from './kittyApi';
import 'aframe';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.loadARjs();

    this.state = {
      showKittyLoader: true,
      isLoadingKitty: false
    };

    this.handleSelectKittyButton = this.handleSelectKittyButton.bind(this);
    this.handleOverlayButton = this.handleOverlayButton.bind(this);
    this.handleLoadKittyButton = this.handleLoadKittyButton.bind(this);
  }

  loadARjs() {
    const arjsScript = document.createElement('script');
    arjsScript.src = 'https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.0/aframe/build/aframe-ar.js';
    arjsScript.async = true;
    document.body.appendChild(arjsScript);
  }

  handleSelectKittyButton(kittyId) {
    loadKittyFromLocalStorage(kittyId);

    this.setState({
      showKittyLoader: false
    });
  }

  handleOverlayButton() {
    this.setState({
      showKittyLoader: true
    });
  }

  async handleLoadKittyButton(kittyId) {
    this.setState({
      isLoadingKitty: true
    });

    if (this.checkIfKittyAlreadySaved(kittyId)) {
      console.log('kitty was already saved! loading kitty #', kittyId);
      loadKittyFromLocalStorage(kittyId);

      this.setState({
        showKittyLoader: false,
        isLoadingKitty: false
      });

      return;
    }

    //set loading text state here

    let kittyData = await getKittyDataById(kittyId);

    if (kittyData.imageUrl !== null && kittyData.imageExtension !== null && kittyData.imageData !== null) {
      console.log('kitty image was successfully found and fetched');
      await saveKittyToLocalStorage(kittyId, kittyData);
      await loadKittyFromLocalStorage(kittyId);

      this.setState({
        showKittyLoader: false,
        isLoadingKitty: false
      });

      // addKittiesToLoaderListFromLocalStorage();
      // clearLoadKittyInput();
      // disableLoadKittyButton();
    } else {
      console.log('kitty image data could not be fetched, try again');
      //enableLoadKittyButton();
      this.setState({
        showKittyLoader: true,
        isLoadingKitty: false
      });
    }
  }

  checkIfKittyAlreadySaved(kittyId) {
    let kittyItem = `kitty-${kittyId}`;
    return kittyItem in localStorage ? true : false;
  }

  render() {
    const { showKittyLoader, isLoadingKitty } = this.state;

    return (
      <div>
        <KittyLoader
          showKittyLoader={showKittyLoader}
          isLoadingKitty={isLoadingKitty}
          handleSelectKittyButton={this.handleSelectKittyButton}
          handleLoadKittyButton={this.handleLoadKittyButton}
        />

        <OverlayButton
          handleOverlayButton={this.handleOverlayButton}
        />
      </div>
    );
  }
}

export default App;
