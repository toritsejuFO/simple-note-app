import React, { Component } from 'react';
import styles from './App.css';

import Header from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <div className={styles.App + ' container-fluid'}>
        <div className="row">
          <Header text="My Simple Note App"/>
        </div>
      </div>
    );
  }
}

export default App;
