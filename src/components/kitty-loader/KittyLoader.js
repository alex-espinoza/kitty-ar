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
