import React, { Component } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Note from './components/Note/Note';
import EditNote from './components/EditNote/EditNote';

const notes = getNotesFromLocalStorage();

class App extends Component {
  constructor() {
    this.state = {
      notes: notes,
      id: 0,
      title: 'title 0',
      body: 'body 0',
    };
  }

  handleTitleChange = title => this.setState({title});

  handleBodyChange = body => this.setState({body});

  // Change the state of form input values to currently clicked note
  editClickedNote = (id) => {
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

const getNotesFromLocalStorage = () => {
  return JSON.parse(localStorage.sna) || JSON.parse('[]');
}

export default App;
