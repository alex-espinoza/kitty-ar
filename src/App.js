import React from 'react';
import KittyLoader from './components/kitty-loader/KittyLoader';
import OverlayButton from './components/overlay-button/OverlayButton';
import { getAllKittiesFromLocalStorage, loadKittyFromLocalStorage, saveKittyToLocalStorage } from './kittyData';
import { getKittyDataById } from './kittyApi';
import 'aframe';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.loadARjs();

    let localStorageKitties = getAllKittiesFromLocalStorage();

    this.state = {
      kitties: localStorageKitties,
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
      //set loading text state here
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

    let kittyData = await getKittyDataById(kittyId);

    if (kittyData.imageUrl !== null && kittyData.imageExtension !== null && kittyData.imageData !== null) {
      console.log('kitty image was successfully found and fetched');

      // Try/catch block to see if local storage is full. Base64 images can be quite big, and storage
      // can max out if a lot of kitties are already loaded
      try {
        await saveKittyToLocalStorage(kittyId, kittyData);
      } catch(error) {
        console.log('local storage is full, please clear some kitties out');
        // set storage full error text state here
        this.setState({
          showKittyLoader: true,
          isLoadingKitty: false
        });

        return;
      }

      await loadKittyFromLocalStorage(kittyId);
      let localStorageKitties = await getAllKittiesFromLocalStorage();

      this.setState({
        kitties: localStorageKitties,
        showKittyLoader: false,
        isLoadingKitty: false
      });
    } else {
      console.log('kitty image data could not be fetched, try again');
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
    const { kitties, showKittyLoader, isLoadingKitty } = this.state;

    return (
      <div>
        <KittyLoader
          kitties={kitties}
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
