const {render} = ReactDOM;

// include locally stored notes for display

var id = [
(localStorage.getItem('id1') == null) ? localStorage.setItem('id1', '1') : localStorage.getItem('id1'),
(localStorage.getItem('id2') == null) ? localStorage.setItem('id2', '2') : localStorage.getItem('id2'),
(localStorage.getItem('id3') == null) ? localStorage.setItem('id3', '3') : localStorage.getItem('id3'),
(localStorage.getItem('id4') == null) ? localStorage.setItem('id4', '4') : localStorage.getItem('id4'),
(localStorage.getItem('id5') == null) ? localStorage.setItem('id5', '5') : localStorage.getItem('id5'),
(localStorage.getItem('id6') == null) ? localStorage.setItem('id6', '6') : localStorage.getItem('id6'),
];

var title = [
  (localStorage.getItem('title1') == null) ? localStorage.setItem('title1', 'Heading1') : localStorage.getItem('title1'),
  (localStorage.getItem('title2') == null) ? localStorage.setItem('title2', 'Heading2') : localStorage.getItem('title2'),
  (localStorage.getItem('title3') == null) ? localStorage.setItem('title3', 'Heading3') : localStorage.getItem('title3'),
  (localStorage.getItem('title4') == null) ? localStorage.setItem('title4', 'Heading4') : localStorage.getItem('title4'),
  (localStorage.getItem('title5') == null) ? localStorage.setItem('title5', 'Heading5') : localStorage.getItem('title5'),
  (localStorage.getItem('title6') == null) ? localStorage.setItem('title6', 'Heading6') : localStorage.getItem('title6'),
];

var body = [
(localStorage.getItem('body1') == null) ? localStorage.setItem('body1', 'Type your note here') : localStorage.getItem('body1'),
(localStorage.getItem('body2') == null) ? localStorage.setItem('body2', 'Type your note here') : localStorage.getItem('body2'),
(localStorage.getItem('body3') == null) ? localStorage.setItem('body3', 'Type your note here') : localStorage.getItem('body3'),
(localStorage.getItem('body4') == null) ? localStorage.setItem('body4', 'Type your note here') : localStorage.getItem('body4'),
(localStorage.getItem('body5') == null) ? localStorage.setItem('body5', 'Type your note here') : localStorage.getItem('body5'),
(localStorage.getItem('body6') == null) ? localStorage.setItem('body6', 'Type your note here') : localStorage.getItem('body6'),
];

// My App's React Components

function Header(props) {
  return (
    <div className="Header col-12">
      <h1 className="Header-text">{props.text}</h1>
    </div>
  );
}

function Note(props) {
  return (
    <div className="Note">
      <h4 className="MiniTitle">{props.id}. {props.title}</h4>
      <p className="MiniBody">{props.body}
        <button className="editButton btn btn-gray">
          Edit
        </button>
      </p>
    </div>
  );
}

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const titles = this.props.noteTitle;
    const bodies = this.props.noteBody;
    const notes = [];

    titles.forEach((elm, i) =>
      notes[i] = <Note key={i} id={(i+1).toString()} title={elm} body={bodies[i]} />
    );

    return (
      <div className="List col-md-4 col-4">
        {notes}

        <p className="notice">Refresh to see edited changes take effect in your list of notes</p>
      </div>
    );
  }
}

class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      body: this.props.body,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    if(this.state.body == ""){
      alert("Cannot save empty note");
    }
    else{
      var title = "title" + this.props.id;
      var body = "body" + this.props.id;
      localStorage.setItem(title, this.state.title);
      localStorage.setItem(body, this.state.body);
    }
    e.preventDefault();
  }

  render() {
    return(
      <form className="EditNote form form-control" onSubmit={this.handleSubmit}>
        <div>
          <p>You are editing slot <input className="UneditableID" type="number" value={this.props.id} disabled/></p>
        </div>
        <div>
          <input className="Title form-control"
            name="title"
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

// Main App component, whole interface

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: localStorage.getItem("title1"),
      body: localStorage.getItem("body1"),
      id: localStorage.getItem("id1"),
    };
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <Header text="My Simple Note App"/>
        </div>

        <div className="main row">
          <List noteTitle={title} noteBody={body} />

          <div className="NewNote col-md-8 col-8">
            <EditNote title={this.state.title} body={this.state.body} id={this.state.id}/>
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
