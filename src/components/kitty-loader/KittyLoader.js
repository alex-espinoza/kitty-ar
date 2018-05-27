import React from 'react';
import SplashScreen from './SplashScreen';
import './KittyLoader.css';

class KittyLoader extends React.Component {
  constructor() {
    super();

    this.state = {
      splashScreen: true
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
          splashScreen: false
        });
        clearInterval(checkIfARLoaded);
      }
    }, 1000);
  }

  render() {
    const { splashScreen } = this.state;

    return (
      <div className="KittyLoader">
        <h1>Kitty AR</h1>

        {splashScreen &&
          <SplashScreen />
        }
      </div>
    );
  }
}

export default KittyLoader;
