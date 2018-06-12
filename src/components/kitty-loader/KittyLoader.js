import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import SplashScreen from './SplashScreen';
import KittyList from './KittyList';
import PropTypes from 'prop-types';
import './KittyLoader.css';

class KittyLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSplashScreen: true,
      kittyLoaderReady: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.checkIfARLoaded();
    }, 3000);
  }

  componentDidUpdate() {
    const { showKittyLoader } = this.props;

    if (showKittyLoader) {
      setTimeout(() => {
        document.body.classList.add('no-scroll');
        document.getElementsByTagName('video')[0].classList.add('no-scroll');
      }, 310);
    } else {
      document.body.classList.remove('no-scroll');
      document.getElementsByTagName('video')[0].classList.remove('no-scroll');
    }
  }

  checkIfARLoaded() {
    let checkIfARLoaded = setInterval(() => {
      let aSceneLoaded = document.getElementsByTagName('a-scene')[0].hasChildNodes();
      let aAssetsLoaded = document.getElementsByTagName('a-assets')[0].hasChildNodes();
      let aImageLoaded = document.getElementsByTagName('a-image')[0];
      let canvasLoaded = document.getElementsByTagName('canvas')[0];
      let videoLoaded = document.getElementsByTagName('video')[0];

      if (aSceneLoaded && aAssetsLoaded && aImageLoaded && canvasLoaded && videoLoaded) {
        this.setState({
          showSplashScreen: false
        });

        setTimeout(() => {
          this.setState({
            kittyLoaderReady: true
          });
        }, 1000)

        clearInterval(checkIfARLoaded);
      }
    }, 1000);
  }

  render() {
    const { showSplashScreen, kittyLoaderReady } = this.state;
    const { kitties, showKittyLoader, isLoadingKitty, handleSelectKittyButton, handleDeleteKittyButton, handleLoadKittyButton } = this.props;
    let showKittyLoaderClass = showKittyLoader ? 'KittyLoader-show' : '';

    return (
      <div className={`KittyLoader ${showKittyLoaderClass}`}>
        <CSSTransitionGroup
          in="true"
          transitionName="SplashScreen-transition"
          transitionAppear={true}
          transitionAppearTimeout={700}
          transitionEnter={false}
          transitionLeaveTimeout={700}
        >
          {showSplashScreen &&
            <SplashScreen key="SplashScreen" />
          }
        </CSSTransitionGroup>

        <CSSTransitionGroup
          in="true"
          className="TransitionComponent"
          transitionName="KittyList-transition"
          transitionEnterTimeout={700}
          transitionLeave={false}
        >
          {kittyLoaderReady &&
            <KittyList
              key="KittyList"
              kitties={kitties}
              isLoadingKitty={isLoadingKitty}
              handleSelectKittyButton={handleSelectKittyButton}
              handleDeleteKittyButton={handleDeleteKittyButton}
              handleLoadKittyButton={handleLoadKittyButton}
            />
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}

KittyLoader.propTypes = {
  kitties: PropTypes.array.isRequired,
  showKittyLoader: PropTypes.bool.isRequired,
  isLoadingKitty: PropTypes.bool.isRequired,
  handleSelectKittyButton: PropTypes.func.isRequired,
  handleDeleteKittyButton: PropTypes.func.isRequired,
  handleLoadKittyButton: PropTypes.func.isRequired
}

export default KittyLoader;
