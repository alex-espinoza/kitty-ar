import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { generateKey } from '../../utils';
import './StatusBar.css';

class StatusBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideTimeout: null
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { showStatusBar, statusText } = this.props;

    if (nextProps.showStatusBar === showStatusBar && nextProps.statusText === statusText) {
      return false;
    } else {
      return true;
    }
  }

  componentDidUpdate(previousProps, previousState, snapshot) {
    const { hideTimeout } = this.state;
    const { showStatusBar, handleHideStatusBar } = this.props;

    clearTimeout(hideTimeout);

    if (showStatusBar) {
      let hideTimeout = setTimeout(() => {
        handleHideStatusBar();

        this.setState({
          hideTimeout: null
        });
      }, 4000);

      this.setState({
        hideTimeout: hideTimeout
      });
    }
  }

  render() {
    const { showStatusBar, statusText } = this.props;

    return (
      <div>
        <CSSTransitionGroup
          in="true"
          transitionName="StatusBar-transition"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {showStatusBar &&
            <div
              key={generateKey('StatusBar')}
              className="StatusBar"
            >
              {statusText}
            </div>
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}

StatusBar.propTypes = {
  showStatusBar: PropTypes.bool.isRequired,
  statusText: PropTypes.string.isRequired,
  handleHideStatusBar: PropTypes.func.isRequired
}

export default StatusBar;
