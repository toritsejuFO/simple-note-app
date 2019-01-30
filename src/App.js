import React, { Component } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Note from './components/Note/Note';
import EditNote from './components/EditNote/EditNote';

class App extends Component {
  constructor() {
    super()
    const lastSavedID = localStorage.getItem('lastSavedID');
    const lastClickedID = localStorage.getItem('lastClickedID');
    console.log(lastSavedID)
    console.log(lastClickedID)

    this.state = {
      // id: localStorage.getItem("id" + lastSavedID),
      id: 0,
    };
  }

  // Chnage the state of form input values to currently clicked note
  editClickedNote = (id) => {
    console.log('ok', id);
    this.setState({ id });
  }

  render() {
    const notes = [];

    [0, 1, 2, 3, 4, 5,].map((elm, i) =>
      notes[i] =
      <Note key={i + 1}
        id={(i + 1).toString()}
        title={'title ' + i}
        body={'body ' + i}
        clicked={this.editClickedNote}
      />
    )

    return (
      <div className={styles.App + ' container-fluid'}>
        <div className="row">
          <Header text="My Simple Note App" />
        </div>

        <div className={styles.Main + ' row'}>
          <div className={styles.List + ' col-md-4 col-sm-5 col-12'}>
            {notes}
            <p className={styles.Notice}>
              Refresh to see edited changes take effect in your list of notes.
              And ensure to save an edited note before editing another note.
            </p>
          </div>

          <div className="col-md-8 col-sm-7 col-12">
            <EditNote
              idOfNoteToEdit={this.state.id}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
