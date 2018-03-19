const {render} = ReactDOM;

// include locally stored notes for display

var ids = [
(localStorage.getItem('id1') == null) ? localStorage.setItem('id1', '1') : localStorage.getItem('id1'),
(localStorage.getItem('id2') == null) ? localStorage.setItem('id2', '2') : localStorage.getItem('id2'),
(localStorage.getItem('id3') == null) ? localStorage.setItem('id3', '3') : localStorage.getItem('id3'),
(localStorage.getItem('id4') == null) ? localStorage.setItem('id4', '4') : localStorage.getItem('id4'),
(localStorage.getItem('id5') == null) ? localStorage.setItem('id5', '5') : localStorage.getItem('id5'),
(localStorage.getItem('id6') == null) ? localStorage.setItem('id6', '6') : localStorage.getItem('id6'),
];

var titles = [
  (localStorage.getItem('title1') == null) ? localStorage.setItem('title1', 'Heading1') : localStorage.getItem('title1'),
  (localStorage.getItem('title2') == null) ? localStorage.setItem('title2', 'Heading2') : localStorage.getItem('title2'),
  (localStorage.getItem('title3') == null) ? localStorage.setItem('title3', 'Heading3') : localStorage.getItem('title3'),
  (localStorage.getItem('title4') == null) ? localStorage.setItem('title4', 'Heading4') : localStorage.getItem('title4'),
  (localStorage.getItem('title5') == null) ? localStorage.setItem('title5', 'Heading5') : localStorage.getItem('title5'),
  (localStorage.getItem('title6') == null) ? localStorage.setItem('title6', 'Heading6') : localStorage.getItem('title6'),
];

var bodies = [
(localStorage.getItem('body1') == null) ? localStorage.setItem('body1', 'Type your note here') : localStorage.getItem('body1'),
(localStorage.getItem('body2') == null) ? localStorage.setItem('body2', 'Type your note here') : localStorage.getItem('body2'),
(localStorage.getItem('body3') == null) ? localStorage.setItem('body3', 'Type your note here') : localStorage.getItem('body3'),
(localStorage.getItem('body4') == null) ? localStorage.setItem('body4', 'Type your note here') : localStorage.getItem('body4'),
(localStorage.getItem('body5') == null) ? localStorage.setItem('body5', 'Type your note here') : localStorage.getItem('body5'),
(localStorage.getItem('body6') == null) ? localStorage.setItem('body6', 'Type your note here') : localStorage.getItem('body6'),
];

if(localStorage.getItem('lastClickedID') == null) {
  localStorage.setItem('lastClickedID', 1);
}

if(localStorage.getItem('lastSavedID') == null) {
  localStorage.setItem('lastSavedID', 1);
}

// My App's React Components

// Header component
function Header(props) {
  return (
    <div className="Header col-12">
      <h1 className="Header-text">{props.text}</h1>
    </div>
  );
}

// Note Component
class Note extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Note col-md-10  col-sm-10 col-8">
        <h4 className="MiniTitle">{this.props.id}. {this.props.title.substr(0, 10)} ...</h4>
        <p className="MiniBody">{this.props.body.substr(0, 18)} ...</p>
      </div>
    );
  }
}

// EditNote Component
class EditNote extends React.Component {
  constructor(props) {
    super(props);
    const lastSavedID = localStorage.getItem('lastSavedID');
    const lastClickedID = localStorage.getItem("lastClickedID");

    this.state = {
      title: localStorage.getItem("title" + lastClickedID),
      body: localStorage.getItem("body" + lastClickedID),
      id: localStorage.getItem("id", lastSavedID),
      lastClickedID: lastClickedID,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeStateBasedOnClickedId = this.changeStateBasedOnClickedId.bind(this);
  }

  handleTitleChange(e) {
    this.setState(
      {title: e.target.value}
    );
  }

  handleBodyChange(e) {
    this.setState(
      {body: e.target.value}
    );
  }

  // Update saved note
  handleSubmit(e) {
    if(this.state.body == "" || this.state.title == ""){
      alert("Cannot save note with empty title or body");
    }
    else{
      var title = "title" + this.state.lastClickedID;
      var body = "body" + this.state.lastClickedID;
      localStorage.setItem(title, this.state.title);
      localStorage.setItem(body, this.state.body);
      localStorage.setItem("lastSavedID", this.state.id);
    }

    e.preventDefault();
  }

  changeStateBasedOnClickedId(id) {
    localStorage.setItem("lastClickedID", id);
    var lastClickedID = localStorage.getItem("lastClickedID");

    this.setState({
      title: localStorage.getItem('title' + lastClickedID),
      body: localStorage.getItem('body' + lastClickedID),
      lastClickedID: lastClickedID,
    });
  }

  render() {
    if(this.state.lastClickedID != this.props.idOfNoteToEdit) {
      this.changeStateBasedOnClickedId(this.props.idOfNoteToEdit);
    }
    return(
      // {/* Form to edit and update existing notes*/}
      <form className="EditNote form form-control" onSubmit={this.handleSubmit}>
        <div>
          <p>You are editing slot <input className="UneditableID" type="number" value={this.state.lastClickedID} disabled/></p>
        </div>
        <div>
          <input className="Title form-control"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
        </div>
        <div>
          <textarea className="Body form-control"
            onChange={this.handleBodyChange}
            value={this.state.body}
          />
        </div>
        <div>
          <input type="submit" value="Save" className="SaveButton btn btn-gray float-right" />
        </div>
      </form>
    );
  }
}


// Main App component, whole interface containg form(controlled)
class App extends React.Component {
  constructor(props) {
    super(props);

    // Save the id of the note updated last, so on refresh form state is retained
    const lastSavedID = localStorage.getItem('lastSavedID');
    const lastClickedID = localStorage.getItem('lastClickedID');

    this.state = {
      // id: localStorage.getItem("id" + lastSavedID),
      id: lastClickedID,
    };

    this.editClickedNote = this.editClickedNote.bind(this);
  }

  // Chnage the state of form input values to currently clicked note
  editClickedNote(e) {
    const noteID = e.target.value / 10;
    console.log(noteID);

    this.setState((state) => ({
      id: noteID,
    }));
  }

  render() {
    const notes = [];

    // Attach a button to for each note to be rendered
    titles.forEach((elm, i) =>
      notes[i] =
      <div key={i+1} className="NoteButtonDiv row">
        <Note key={i+1}
          id={(i+1).toString()}
          title={elm}
          body={bodies[i]}
        />
        <button key={(i+1)*10}
          className="editButton btn btn-gray col-md-2 col-sm-2 col-4"
          value={(i+1)*10}
          onClick={this.editClickedNote}
        >
          Edit
        </button>
      </div>
    );

    return (
      <div className="App container-fluid">
        <div className="row">
          <Header text="My Simple Note App"/>
        </div>

        <div className="main row">
          <div className="List col-md-4 col-sm-5 col-12">
            {notes}
            <p className="notice">
              Refresh to see edited changes take effect in your list of notes.
              And ensure to save an edited note before editing another note.
            </p>
          </div>

          <div className="NewNote col-md-8 col-sm-7 col-12">
            <EditNote idOfNoteToEdit={this.state.id}/>
          </div>
        </div>
      </div>
    );
  }
}

// Render App component
render(
  <App />,
  document.getElementById("react-container")
);
