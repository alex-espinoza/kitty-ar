import React from 'react';
import SplashScreen from './SplashScreen';
import KittyList from './KittyList';
import './KittyLoader.css';

class KittyLoader extends React.Component {
  constructor() {
    super();

    this.state = {
      kittyLoaderReady: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.checkIfARLoaded();
    }, 3000);
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
          kittyLoaderReady: true
        });
        clearInterval(checkIfARLoaded);
      }
    }, 1000);
  }

  render() {
    const { kittyLoaderReady } = this.state;

    return (
      <div className="KittyLoader">
        <h1>Kitty AR</h1>

        {!kittyLoaderReady &&
          <SplashScreen />
        }

        {kittyLoaderReady &&
          <KittyList />
        }
      </div>
    );
  }
}

export default KittyLoader;
