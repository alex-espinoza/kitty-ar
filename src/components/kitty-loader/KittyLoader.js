import React from 'react';
import './KittyLoader.css';

class KittyLoader extends React.Component {
  render() {
    return (
      <div className="KittyLoader">
        <h1>Kitty AR</h1>

        <div className="KittyLoader-splash-screen">
          <p>Please allow camera access to see your kitties!</p>
          <div className="KittyLoader-splash-screen-diamond">
            <div className="KittyLoader-splash-screen-diamond-pseudo"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default KittyLoader;
