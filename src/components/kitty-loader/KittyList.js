import React from 'react';
import PropTypes from 'prop-types';
import { VALID_LOAD_KITTY_ID_REGEX } from '../../config';
import './KittyList.css';

class KittyList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedKittyId: null,
      loadKittyId: '',
      validLoadKittyId: false
    };

    this.handleLoadKittyIdChange = this.handleLoadKittyIdChange.bind(this);
  }

  getSnapshotBeforeUpdate(previousProps, previousState) {
    let previousKittyList = previousProps.kitties;
    let newKittyList = this.props.kitties;

    if (previousKittyList.length !== newKittyList.length) {
      return true
    } else {
      return false
    }
  }

  componentDidUpdate(previousProps, previousState, snapshot) {
    if (snapshot) {
      this.setState({
        loadKittyId: '',
        validLoadKittyId: false
      });
    }
  }

  handleKittyImageClick(kittyId) {
    this.setState({
      selectedKittyId: kittyId
    });
  }

  handleLoadKittyIdChange(event) {
    let loadKittyId = event.target.value;

    this.setState({
      loadKittyId
    });

    if (loadKittyId.match(VALID_LOAD_KITTY_ID_REGEX)) {
      this.setState({
        validLoadKittyId: true
      });
    } else {
      this.setState({
        validLoadKittyId: false
      });
    }
  }

  render() {
    const { selectedKittyId, loadKittyId, validLoadKittyId } = this.state;
    const { kitties, isLoadingKitty, handleSelectKittyButton, handleLoadKittyButton } = this.props;

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
        <h1 className="KittyList-header">Kitty AR</h1>

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
          value={loadKittyId}
          onChange={(event) => this.handleLoadKittyIdChange(event)}
        />

        <button
          className="KittyList-button KittyList-button-load-kitty"
          disabled={isLoadingKitty || !validLoadKittyId}
          onClick={() => handleLoadKittyButton(loadKittyId)}
        >
          Load Kitty
        </button>
      </div>
    );
  }
}


KittyList.propTypes = {
  kitties: PropTypes.array.isRequired,
  isLoadingKitty: PropTypes.bool.isRequired,
  handleSelectKittyButton: PropTypes.func.isRequired,
  handleLoadKittyButton: PropTypes.func.isRequired
}

export default KittyList;
