import React from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <div className="SplashScreen">
      <h1 className="SplashScreen-header">Kitty AR</h1>
      <p className="SplashScreen-paragraph">Bring your CryptoKitties to life with augmented reality!</p>
      <p className="SplashScreen-paragraph">Please allow us your phone's camera access to work our magic!</p>
      <div className="SplashScreen-diamond">
        <div className="SplashScreen-diamond-pseudo"></div>
      </div>
    </div>
  );
}

export default SplashScreen;
