import React from 'react';
import './KittyList.css';

class KittyList extends React.Component {
  constructor() {
    super();

    this.state = {
      kitties: []
    };
  }

  componentDidMount() {
    this.getKittiesFromLocalStorage()
  }

  getKittiesFromLocalStorage() {
    let localStorageKitties = [];

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);

      if (key.startsWith('kitty-')) {
        let kittyData = JSON.parse(localStorage.getItem(key));
        localStorageKitties.push(kittyData);
      }
    }

    this.setState({
      kitties: localStorageKitties
    });
  }

  render() {
    const { kitties } = this.state;

    return (
      <div className="KittyList">
        <div className="KittyList-kitties">
          {kitties.map((kitty) => (
            <img
              id={`kitty-${kitty.id}`}
              className="KittyList-kitty-image"
              src={kitty.imageData}
              data-kitty-id={kitty.id}
            />
          ))}
        </div>

        <button className="KittyList-button KittyList-button-select-kitty" disabled>Select Kitty</button>
        <input className="KittyList-input" id="kittyId" name="kittyId" type="number" placeholder="Kitty ID" required />
        <button className="KittyList-button KittyList-button-load-kitty" disabled>Load Kitty</button>
      </div>
    );
  }
}

export default KittyList;
