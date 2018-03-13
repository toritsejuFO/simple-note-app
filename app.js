const {render} = ReactDOM;

var note = [
  {
    title: "Note1",
    body: "This is my first note",
  },
  {
    title: "Note2",
    body: "This is my second note",
  },
  {
    title: "Note3",
    body: "This is my third note",
  },
  {
    title: "Note4",
    body: "This is my fourth note",
  },
  {
    title: "Note5",
    body: "This is my fifth note",
  },
]

console.log(note[0].title);

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
    </div>
  );
}

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="List col-md-4 col-4">
        <Note title={this.props.note[0].title} body={this.props.note[0].body}/>
        <Note title={this.props.note[1].title} body={this.props.note[1].body}/>
        <Note title={this.props.note[2].title} body={this.props.note[2].body}/>
        <Note title={this.props.note[3].title} body={this.props.note[3].body}/>
        <Note title={this.props.note[4].title} body={this.props.note[4].body}/>
      </div>
    );
  }
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
    this.state = {title: "Note1", body: "This is my first note"};
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <Header text="My Simple Note App"/>
        </div>

        <div className="main row">
          {/* <div className="col-md-4 col-4"> */}
            <List note={note} />
          {/* </div> */}

          <div className="NewNote col-md-8 col-8">
            <EditNote title={this.state.title} body={this.state.body}/>
          </div>
        </div>
      </div>
    );
  }
}

// Render App compn
render(
  <App />,
  document.getElementById("react-container")
);
