import React, { Component } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Note from './components/Note/Note';
import EditNote from './components/EditNote/EditNote';

const appName = 'SNA';
const localStorageStartupName = 'SNA-STARTUP';

const getNotesFromLocalStorage = () => {
  const initialNoteOnFirstStartUp = { id: 1, title: 'My title...', body: 'My note body...' };
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

  handleTitleChange = title => this.setState({ title });

  handleBodyChange = body => this.setState({ body });

  // Change the state of form input values to currently clicked note
  editClickedNote = (id) => {
    this.setState({ id });
  }

  handleAddNewNote = e => {
    // Initial note content for newly added notes
    const notes = this.state.notes;
    const id = notes.length + 1;
    const newNote = {
      id: id,
      title: `My title...${id}`,
      body: `My note body...${id}`
    };

    // Save note to state and localStorage
    notes.push(newNote);
    this.setState({notes})
    e.preventDefault()
  }

  _saveNotesToLocalStorage = () => {
    localStorage.setItem(appName, JSON.stringify(this.state.notes))
  }

  render() {
    const notes = [];

    this.state.notes.map((note, i) =>
      notes[i] =
      <Note key={i + 1}
        id={note.id}
        title={note.title}
        body={note.body}
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
            <input
              type="submit"
              className={styles.AddButton + ' btn btn-light'}
              style={{ marginTop: '20px' }}
              value="Add New Note"
              onClick={this.handleAddNewNote} />
            {/* <p className={styles.Notice}>
              Refresh to see edited changes take effect in your list of notes.
              And ensure to save an edited note before editing another note.
            </p> */}
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
