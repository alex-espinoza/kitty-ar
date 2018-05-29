import React from 'react';
import PropTypes from 'prop-types';
import './OverlayButton.css';

class OverlayButton extends React.Component {
  render() {
    const { handleOverlayButton } = this.props;

    return (
      <button
        className="OverlayButton"
        onClick={() => handleOverlayButton()}
      >
        Back
      </button>
    );
  }
}

OverlayButton.propTypes = {
  handleOverlayButton: PropTypes.func.isRequired
}

export default OverlayButton;
