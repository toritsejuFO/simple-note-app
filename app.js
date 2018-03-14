const {render} = ReactDOM;

// include locally stored notes for display
localStorage.setItem('title1', 'Heading1');
localStorage.setItem('body1', 'Type your note here');
localStorage.setItem('title2', 'Heading2');
localStorage.setItem('body2', 'Type your note here');
localStorage.setItem('title3', 'Heading3');
localStorage.setItem('body3', 'Type your note here');
localStorage.setItem('title4', 'Heading4');
localStorage.setItem('body4', 'Type your note here');
localStorage.setItem('title5', 'Heading5');
localStorage.setItem('body5', 'Type your note here');
localStorage.setItem('title6', 'Heading6');
localStorage.setItem('body6', 'Type your note here');

var title = [
  localStorage.getItem('title1') ? localStorage.getItem('title1') : null,
  localStorage.getItem('title2') ? localStorage.getItem('title2') : null,
  localStorage.getItem('title3') ? localStorage.getItem('title3') : null,
  localStorage.getItem('title4') ? localStorage.getItem('title4') : null,
  localStorage.getItem('title5') ? localStorage.getItem('title5') : null,
  localStorage.getItem('title6') ? localStorage.getItem('title6') : null,
];

var body = [
  localStorage.getItem('body1') ? localStorage.getItem('body1') : null,
  localStorage.getItem('body2') ? localStorage.getItem('body2') : null,
  localStorage.getItem('body3') ? localStorage.getItem('body3') : null,
  localStorage.getItem('body4') ? localStorage.getItem('body4') : null,
  localStorage.getItem('body5') ? localStorage.getItem('body5') : null,
  localStorage.getItem('body6') ? localStorage.getItem('body6') : null,
];

var currentNote = {title: '', body: '', number: ''};

// My App's React Components

function Header(props) {
  return (
    <div className="Header col-12">
      <h1 className="Header-text">{props.text}</h1>
    </div>
  );
}

function MiniTitle(props) {
  return (
    <h4 className="MiniTitle">{props.title}</h4>
  );
}

function MiniBody(props) {
  return (
    <p className="MiniBody">{props.body}</p>
  );
}

function Note(props) {
  return (
    <div className="Note">
      <MiniTitle title={props.title}/>
      <MiniBody body={props.body}/>
      <button class="editButton">Edit</button>
    </div>
  );
}

class List extends React.Component {
  constructor(props) {
    super(props);

    // this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className="List col-md-4 col-4">
        <Note title={this.props.noteTitle[0]} body={this.props.noteBody[0]} onClick={handleClick(1)}/>
        <Note title={this.props.noteTitle[1]} body={this.props.noteBody[1]} onClick={handleClick(2)}/>
        <Note title={this.props.noteTitle[2]} body={this.props.noteBody[2]} onClick={handleClick(3)}/>
        <Note title={this.props.noteTitle[3]} body={this.props.noteBody[3]} onClick={handleClick(4)}/>
        <Note title={this.props.noteTitle[4]} body={this.props.noteBody[4]} onClick={handleClick(5)}/>
        <Note title={this.props.noteTitle[5]} body={this.props.noteBody[5]} onClick={handleClick(6)}/>
      </div>
    );
  }
}

function handleClick(number) {
  currentNote.title = localStorage.getItem("title" + number);
  currentNote.body = localStorage.getItem("body" + number);
  console.log(currentNote.title);
}

class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.title, body: this.props.body};

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
      // localStrorage.setItem("title", {this.props.title});
      // localStrorage.setItem("body", {this.props.body});
    }
    e.preventDefault();
  }

  render() {
    return(
      <form className="EditNote form form-control" onSubmit={this.handleSubmit}>
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
    this.state = {title: currentNote.title, body: currentNote.body};
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
            <EditNote title={this.state.title} body={this.state.body}/>
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
