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
      let kittyName = kitty.name ? kitty.name : `Kitty #${kitty.id}`;
      let kittySelectedClass = kitty.id === selectedKittyId ? 'KittyList-kitty-image-container-selected' : '';
      let containerBackgroundColorClass = `KittyList-kitty-image-container-background-${kitty.color}`;

      return (
        <div
          key={kittyKey}
          className={`KittyList-kitty-image-container ${kittySelectedClass} ${containerBackgroundColorClass}`}
          data-kitty-id={kitty.id}
          onClick={() => this.handleKittyImageClick(kitty.id)}
        >
          <span className="KittyList-kitty-id">#{kitty.id}</span>
          <img
            alt={kitty.name || kittyKey}
            className="KittyList-kitty-image"
            src={kitty.imageData}
          />
          <p className="KittyList-kitty-name">{kittyName}</p>
        </div>
      )
    });

    return (
      <div className="KittyList">
        <h1 className="KittyList-header">Your Kitties</h1>

        <div className="KittyList-kitties">
          { kittiesList }

          <div className="KittyList-load-kitty-container">
            <span className="KittyList-kitty-id">Load New Kitty</span>
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
              type="button"
              disabled={isLoadingKitty || !validLoadKittyId}
              onClick={() => handleLoadKittyButton(loadKittyId)}
            >
              Load
            </button>
          </div>
        </div>

        <div className="KittyList-button-group">
          <button
            className="KittyList-button KittyList-button-select"
            type="button"
            disabled={!selectedKittyId}
            onClick={() => handleSelectKittyButton(selectedKittyId)}
          >
            Select
          </button>

          <button
            className="KittyList-button KittyList-button-delete"
            type="button"
            disabled={!selectedKittyId}
            onClick={() => handleDeleteKittyButton(selectedKittyId)}
          >
            Delete
          </button>
        </div>
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
