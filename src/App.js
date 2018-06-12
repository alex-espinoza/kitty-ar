import React from 'react';
import StatusBar from './components/status-bar/StatusBar';
import KittyLoader from './components/kitty-loader/KittyLoader';
import OverlayButton from './components/overlay-button/OverlayButton';
import { getAllKittiesFromLocalStorage, loadKittyFromLocalStorage, saveKittyToLocalStorage, deleteKittyFromLocalStorage, checkIfKittyAlreadySaved } from './kittyData';
import { fetchKittyData } from './kittyApi';
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
      isLoadingKitty: false,
      showStatusBar: false,
      statusText: ''
    };

    this.handleSelectKittyButton = this.handleSelectKittyButton.bind(this);
    this.handleDeleteKittyButton = this.handleDeleteKittyButton.bind(this);
    this.handleOverlayButton = this.handleOverlayButton.bind(this);
    this.handleLoadKittyButton = this.handleLoadKittyButton.bind(this);
    this.handleHideStatusBar = this.handleHideStatusBar.bind(this);
  }

  loadARjs() {
    const arjsScript = document.createElement('script');
    arjsScript.src = 'https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.0/aframe/build/aframe-ar.js';
    arjsScript.async = true;
    document.body.appendChild(arjsScript);
  }

  handleSelectKittyButton(kittyId) {
    let kittyData = loadKittyFromLocalStorage(kittyId);
    let kittyName = kittyData.name ? kittyData.name : `#${kittyId}`;

    this.setState({
      showKittyLoader: false,
      showStatusBar: true,
      statusText: `Here's your kitty, '${kittyName}'! Meow!`
    });
  }

  handleDeleteKittyButton(kittyId) {
    let kittyData = deleteKittyFromLocalStorage(kittyId);
    let localStorageKitties = getAllKittiesFromLocalStorage();
    let kittyName = kittyData.name ? kittyData.name : `#${kittyId}`;

    this.setState({
      kitties: localStorageKitties,
      showStatusBar: true,
      statusText: `Kitty '${kittyName}' was deleted. You can always load it again!`
    });
  }

  handleOverlayButton() {
    this.setState({
      showKittyLoader: true,
      showStatusBar: false,
      statusText: ''
    });
  }

  handleHideStatusBar() {
    this.setState({
      showStatusBar: false,
      statusText: ''
    });
  }

  async handleLoadKittyButton(kittyId) {
    if (checkIfKittyAlreadySaved(kittyId)) {
      let kittyData = loadKittyFromLocalStorage(kittyId);
      let kittyName = kittyData.name ? kittyData.name : `#${kittyId}`;

      this.setState({
        showKittyLoader: false,
        showStatusBar: true,
        statusText: `Your kitty, '${kittyName}' is here! Meow!`
      });

      return;
    }

    this.setState({
      isLoadingKitty: true,
      showStatusBar: true,
      statusText: `Fetching kitty '#${kittyId}'...`
    });

    let kittyData = await fetchKittyData(kittyId);

    if (kittyData.imageUrl !== null && kittyData.imageExtension !== null && kittyData.imageData !== null) {
      try {
        await saveKittyToLocalStorage(kittyId, kittyData);
      } catch(error) {
        this.setState({
          isLoadingKitty: false,
          showStatusBar: true,
          statusText: "There's no room for more kitties! You have to delete some."
        });

        return;
      }

      await loadKittyFromLocalStorage(kittyId);
      let localStorageKitties = await getAllKittiesFromLocalStorage();
      let kittyName = kittyData.name ? kittyData.name : `#${kittyId}`;

      this.setState({
        kitties: localStorageKitties,
        showKittyLoader: false,
        isLoadingKitty: false,
        showStatusBar: true,
        statusText: `Your kitty, '${kittyName}' has arrived! Meow!`
      });
    } else {
      this.setState({
        isLoadingKitty: false,
        showStatusBar: true,
        statusText: 'There was a problem when fetching your kitty. Please try again.'
      });
    }
  }

  render() {
    const { kitties, showKittyLoader, isLoadingKitty, showStatusBar, statusText } = this.state;

    return (
      <div>
        <StatusBar
          showStatusBar={showStatusBar}
          statusText={statusText}
          handleHideStatusBar={this.handleHideStatusBar}
        />

        <KittyLoader
          kitties={kitties}
          showKittyLoader={showKittyLoader}
          isLoadingKitty={isLoadingKitty}
          handleSelectKittyButton={this.handleSelectKittyButton}
          handleDeleteKittyButton={this.handleDeleteKittyButton}
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
