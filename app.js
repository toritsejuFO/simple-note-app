const {render} = ReactDOM;

// React Component

function Header(props) {
  var customClasses = {
    header: "Header col-12",
  }

  return (
    <div className={customClasses.header}>
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

class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.title, body: this.props.body};

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
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

  // handleSubmit() {
  //   function(e) {
  //     e.preventDefault();
  //     localStrorage.setItem("title", {this.props.title});
  //     localStrorage.setItem("body", {this.props.body});
  //   }
  // }

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

// JS functions


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
          <div className="Minimap col-md-4 col-4">
            <Note title="title" body="This is my frst note body"/>
            <Note title="Note1" body="This is my frst note" />
            <Note title="Note1" body="This is my frst note" />
            <Note title="Note1" body="This is my frst note" />
            <Note title="Note1" body="This is my frst note" />
          </div>

          <div className="NewNote col-md-8 col-8">
            <EditNote title={this.state.title} body={this.state.body}/>
          </div>
        </div>
      </div>
    );
  }
}

render(
  <App />,
  document.getElementById("react-container")
);
