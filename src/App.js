import React from 'react';
import KittyLoader from './components/kitty-loader/KittyLoader';
import ARScene from './components/ar-scene/ARScene';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedKittyId: null,
      showKittyLoader: true
    };

    this.handleSelectKittyButton = this.handleSelectKittyButton.bind(this);
  }

  handleSelectKittyButton(kittyId) {
    this.setState({
      selectedKittyId: kittyId,
      showKittyLoader: false
    });
  }

  render() {
    const { showKittyLoader, selectedKittyId } = this.state;

    return (
      <div>
        <KittyLoader
          showKittyLoader={showKittyLoader}
          handleSelectKittyButton={this.handleSelectKittyButton}
        />

        <ARScene
          selectedKittyId={selectedKittyId}
        />
      </div>
    );
  }
}

export default App;
