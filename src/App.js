import React, { Component } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Note from './components/Note/Note';
import EditNote from './components/EditNote/EditNote';

const appName = 'SNA';
const localStorageStartupName = 'SNA-STARTUP';

const getNotesFromLocalStorage = () => {
  const initialNoteOnFirstStartUp = { id: 1, title: 'Title', body: 'Note body' };
  const localStoragePreparedNotes = JSON.stringify([initialNoteOnFirstStartUp]);
  localStorage.setItem(localStorageStartupName, localStoragePreparedNotes)

  return JSON.parse(localStorage.getItem(appName))
    || JSON.parse(localStorage.getItem(localStorageStartupName))
}

const notes = getNotesFromLocalStorage()
console.log(notes)

class App extends Component {
  constructor() {
    super()
    // Initialize state hence EditNote with first note in notes array
    const note = notes.find(note => note.id === 1)

    this.state = {
      notes: notes,
      id: note.id,
      title: note.title,
      body: note.body,
    };
  }

  handleTitleChange = title => {
    this._saveNoteToStateAndLocalStorage({ title })
  }

  handleBodyChange = body => {
    this._saveNoteToStateAndLocalStorage({ body })
  }

  // Change the state of form input values to currently clicked note
  handleEditClickedNote = (id) => {
    // Find clicked note for editing
    const note = this.state.notes.find(note => note.id === id);
    const title = note.title;
    const body = note.body;

    // Set found note to be edited
    this.setState({ id, title, body });
  }

  handleAddNewNote = e => {
    // Initial note content for newly added notes
    const notes = this.state.notes;
    const id = notes.length + 1;
    const newNote = {
      id: id,
      title: `Title ${id}`,
      body: `Note body ${id}`
    };

    // Save note to state and localStorage
    notes.push(newNote);
    this.setState({ notes });
    this._saveNotesToLocalStorage()
  }

  _saveNoteToStateAndLocalStorage = newValue => {
    // Find note being edited by id
    const notes = this.state.notes;
    const noteIndex = notes.findIndex(note => note.id === this.state.id);
    const note = notes[noteIndex];

    // Update note with value
    note.title = newValue.title || this.state.title;
    note.body = newValue.body || this.state.body;

    // Update state with new value of note being edited as well
    this.setState({ title: note.title, body: note.body })

    // Update notes in state
    notes[noteIndex] = note;
    this.setState({ notes });

    // Save notes to localStorage as well
    this._saveNotesToLocalStorage();
  }

  _saveNotesToLocalStorage = () => {
    localStorage.setItem(appName, JSON.stringify(this.state.notes));
  }

  render() {
    const notes = [];

    this.state.notes.map((note, i) =>
      notes[i] =
      <Note key={i + 1}
        id={note.id}
        title={note.title}
        body={note.body}
        clicked={this.handleEditClickedNote}
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
              handleTitleChange={this.handleTitleChange}
              handleBodyChange={this.handleBodyChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
