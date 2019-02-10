import React, { Component } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Note from './components/Note/Note';
import EditNote from './components/EditNote/EditNote';

const appName = 'SNA';
const localStorageStartupName = 'SNA-STARTUP';

const getNotesFromLocalStorage = () => {
  const initialNoteOnFirstStartUp = { title: 'Title', body: 'Note body' };
  const localStoragePreparedNotes = JSON.stringify([initialNoteOnFirstStartUp]);
  localStorage.setItem(localStorageStartupName, localStoragePreparedNotes)

  if (JSON.parse(localStorage.getItem(appName)) && JSON.parse(localStorage.getItem(appName)).length !== 0) {
    return JSON.parse(localStorage.getItem(appName));
  }
  return JSON.parse(localStorage.getItem(localStorageStartupName))
}

const notes = getNotesFromLocalStorage()
console.log(notes)

class App extends Component {
  constructor() {
    super()
    // Initialize state hence EditNote with first note in notes array
    const idOfLastClicked = JSON.parse(localStorage.getItem('lastClicked')) || 0;
    const note = notes[idOfLastClicked]

    this.state = {
      notes: notes,
      id: idOfLastClicked,
      title: note.title,
      body: note.body,
    };
  }

  handleChange = (value, key) => {
    // Key is the property that's changed
    this._saveNoteToStateAndLocalStorage(value, key)
  }

  // Change the state of form input values to currently clicked note
  handleEditClickedNote = (id) => {
    console.log(id)
    // Find clicked note for editing
    const note = this.state.notes[id];
    const title = note.title;
    const body = note.body;

    // Set found note to be edited
    this.setState({ id, title, body });

    // Store id of note currently being edited
    localStorage.setItem('lastClicked', id)
  }

  handleAddNewNote = e => {
    // Initial note content for newly added notes
    const notes = this.state.notes;
    const newNote = {
      title: 'Enter A Title',
      body: 'Enter New Body'
    };

    // Save note to state and localStorage
    notes.push(newNote);
    this.setState({ notes });
    this._saveNotesToLocalStorage()
  }

  handleDelete = id => {
    if (id === this.state.id) {
      alert('Sorry, you can\'t delete the note you\'re currently editing. '
      + 'Kindly switch to another note, then delete the intended note.');
      return;
    }
    // Get notes
    const notes = this.state.notes;

    // Find and delete note by id
    notes.splice(id, 1)

    // Update notes in state
    this.setState({ notes });

    // Save notes to localStorage as well
    this._saveNotesToLocalStorage();
  }

  _saveNoteToStateAndLocalStorage = (newValue, key) => {
    // Find note being edited by id
    const notes = this.state.notes;
    const note = notes[this.state.id];

    // Update note with value
    // More dynamic way to set title or body depending on which is changed
    note[key] = newValue;

    // Update state with new value of note being edited as well
    this.setState({ title: note.title, body: note.body })

    // Update notes in state
    notes[this.state.id] = note;
    this.setState({ notes });

    // Save notes to localStorage as well
    this._saveNotesToLocalStorage();
  }

  _saveNotesToLocalStorage = () => {
    localStorage.setItem(appName, JSON.stringify(this.state.notes));
  }

  render() {
    const notes = [];

    this.state.notes.map((note, id) =>
      notes[id] =
      <div>
        <Note key={id + 1}
          id={id}
          title={note.title}
          body={note.body}
          clicked={this.handleEditClickedNote}
          delete={this.handleDelete}
        />
      </div>
    )

    if (notes.length === 0) {
      this.handleAddNewNote()
    }

    return (
      <div className={styles.App + ' container-fluid'}>
        <div className="row">
          <Header text="My Simple Note App" />
        </div>

        <div className={styles.Main + ' row'}>
          <div className={styles.List + ' col-md-4 col-sm-5 col-12'}>
            {notes}
            <input
              type="button"
              className={styles.AddButton + ' btn btn-light'}
              style={{ marginTop: '20px' }}
              value="Add New Note"
              onClick={this.handleAddNewNote} />
            <p className={styles.Notice}>
              Note:  Notes are saved as you type :)
            </p>
          </div>

          <div className="col-md-8 col-sm-7 col-12">
            <EditNote
              id={this.state.id}
              title={this.state.title}
              body={this.state.body}
              handleChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
