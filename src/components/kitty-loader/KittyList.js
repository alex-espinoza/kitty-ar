import React from 'react';
import PropTypes from 'prop-types';
import './KittyList.css';

class KittyList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kitties: [],
      selectedKittyId: null
    };
  }

  componentDidMount() {
    this.getKittiesFromLocalStorage()
  }

  getKittiesFromLocalStorage() {
    let localStorageKitties = [];

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);

      if (key.startsWith('kitty-')) {
        let kittyData = JSON.parse(localStorage.getItem(key));
        localStorageKitties.push(kittyData);
      }
    }

    this.setState({
      kitties: localStorageKitties
    });
  }

  handleKittyImageClick(kittyId) {
    this.setState({
      selectedKittyId: kittyId
    });
  }

  render() {
    const { kitties, selectedKittyId } = this.state;
    const { handleSelectKittyButton } = this.props;

    let kittiesList = kitties.map((kitty) => {
      let kittyKey = `kitty-${kitty.id}`;
      let kittySelectedClass = kitty.id === selectedKittyId ? 'KittyList-kitty-image-selected' : '';

      return (
        <img
          key={kittyKey}
          alt={kitty.name || kittyKey}
          className={`KittyList-kitty-image ${kittySelectedClass}`}
          src={kitty.imageData}
          data-kitty-id={kitty.id}
          onClick={() => this.handleKittyImageClick(kitty.id)}
        />
      )
    });

    return (
      <div className="KittyList">
        <div className="KittyList-kitties">
          { kittiesList }
        </div>

        <button
          className="KittyList-button KittyList-button-select-kitty"
          disabled={!selectedKittyId}
          onClick={() => handleSelectKittyButton(selectedKittyId)}
        >
          Select Kitty
        </button>

        <input
          className="KittyList-input"
          id="kittyId"
          name="kittyId"
          type="number"
          placeholder="Kitty ID"
          required
        />

        <button
          className="KittyList-button KittyList-button-load-kitty"
          disabled
        >
          Load Kitty
        </button>
      </div>
    );
  }
}


KittyList.propTypes = {
  handleSelectKittyButton: PropTypes.func.isRequired,
}

export default KittyList;
