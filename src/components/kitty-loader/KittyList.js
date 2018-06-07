import React from 'react';
import PropTypes from 'prop-types';
import { VALID_LOAD_KITTY_ID_REGEX } from '../../config';
import './KittyList.css';

class KittyList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kitties: [],
      selectedKittyId: null,
      loadKittyId: null
    };

    this.handleLoadKittyIdChange = this.handleLoadKittyIdChange.bind(this);
  }

  componentDidMount() {
    let localStorageKitties = this.getKittiesFromLocalStorage();

    this.setState({
      kitties: localStorageKitties
    });
  }

  componentDidUpdate() {
    const { kitties } = this.state;
    let localStorageKitties = this.getKittiesFromLocalStorage();

    if (kitties.length !== localStorageKitties.length) {
      this.setState({
        kitties: localStorageKitties
      });
    }
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

    return localStorageKitties;
  }

  handleKittyImageClick(kittyId) {
    this.setState({
      selectedKittyId: kittyId
    });
  }

  handleLoadKittyIdChange(event) {
    let kittyId = event.target.value;

    if (kittyId.match(VALID_LOAD_KITTY_ID_REGEX)) {
      this.setState({
        loadKittyId: kittyId
      });
    } else {
      this.setState({
        loadKittyId: null
      });
    }
  }

  render() {
    const { kitties, selectedKittyId, loadKittyId } = this.state;
    const { isLoadingKitty, handleSelectKittyButton, handleLoadKittyButton } = this.props;

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
          onChange={this.handleLoadKittyIdChange}
        />

        <button
          className="KittyList-button KittyList-button-load-kitty"
          disabled={isLoadingKitty || !loadKittyId}
          onClick={() => handleLoadKittyButton(loadKittyId)}
        >
          Load Kitty
        </button>
      </div>
    );
  }
}


KittyList.propTypes = {
  isLoadingKitty: PropTypes.bool.isRequired,
  handleSelectKittyButton: PropTypes.func.isRequired,
  handleLoadKittyButton: PropTypes.func.isRequired
}

export default KittyList;
