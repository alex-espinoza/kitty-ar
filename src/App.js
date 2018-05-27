import React, { Component } from 'react';
import KittyLoader from './components/kitty-loader/KittyLoader';
import Aframe from './components/aframe/Aframe';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <KittyLoader />
        <Aframe />
      </div>
    );
  }
}

export default App;
