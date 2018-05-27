import React from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <div className="SplashScreen">
      <p>Please allow camera access to see your kitties!</p>
      <div className="SplashScreen-diamond">
        <div className="SplashScreen-diamond-pseudo"></div>
      </div>
    </div>
  );
}

export default SplashScreen;
