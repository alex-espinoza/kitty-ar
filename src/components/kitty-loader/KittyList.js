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
        validLoadKittyId: false,
        selectedKittyId: null
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
    const { kitties, isLoadingKitty, handleSelectKittyButton, handleDeleteKittyButton, handleLoadKittyButton } = this.props;

    let kittiesList = kitties.map((kitty) => {
      let kittyKey = `kitty-${kitty.id}`;
      let kittySelectedClass = kitty.id === selectedKittyId ? 'KittyList-kitty-image-container-selected' : '';
      let containerBackgroundColorClass = `KittyList-kitty-image-container-background-${kitty.color}`;

      return (
        <div
          key={kittyKey}
          className={`KittyList-kitty-image-container ${kittySelectedClass} ${containerBackgroundColorClass}`}
        >
          <img
            alt={kitty.name || kittyKey}
            className="KittyList-kitty-image"
            src={kitty.imageData}
            data-kitty-id={kitty.id}
            onClick={() => this.handleKittyImageClick(kitty.id)}
          />
        </div>
      )
    });

    return (
      <div className="KittyList">
        <h1 className="KittyList-header">Your Kitties</h1>

        <div className="KittyList-kitties">
          { kittiesList }

          <div
            className="KittyList-load-kitty-container"
          >
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
              className="KittyList-button KittyList-button-load"
              disabled={isLoadingKitty || !validLoadKittyId}
              onClick={() => handleLoadKittyButton(loadKittyId)}
            >
              Load
            </button>
          </div>
        </div>

        {selectedKittyId &&
          <div className="KittyList-button-group">
            <button
              className="KittyList-button KittyList-button-select"
              disabled={!selectedKittyId}
              onClick={() => handleSelectKittyButton(selectedKittyId)}
            >
              Select
            </button>

            <button
              className="KittyList-button KittyList-button-delete"
              disabled={!selectedKittyId}
              onClick={() => handleDeleteKittyButton(selectedKittyId)}
            >
              Delete
            </button>
          </div>
        }
      </div>
    );
  }
}


KittyList.propTypes = {
  kitties: PropTypes.array.isRequired,
  isLoadingKitty: PropTypes.bool.isRequired,
  handleSelectKittyButton: PropTypes.func.isRequired,
  handleDeleteKittyButton: PropTypes.func.isRequired,
  handleLoadKittyButton: PropTypes.func.isRequired
}

export default KittyList;
