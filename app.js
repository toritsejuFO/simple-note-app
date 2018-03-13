const {render} = ReactDOM;

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

function EditNote(props) {
  return(
    <form className="form form-control">
      <div>
        <input className="Title form-control" value={props.title}/>
      </div>
      <div>
        <textarea className="Body form-control">{props.body}</textarea>
      </div>
    </form>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App container">
        <div className="row">
          <Header text="My Simple Note App"/>
        </div>

        <div className="main row">
          <div className="Minimap col-md-4 col-4">
            <Note title="Note1" body="This is my frst note" />
            <Note title="Note1" body="This is my frst note" />
            <Note title="Note1" body="This is my frst note" />
            <Note title="Note1" body="This is my frst note" />
            <Note title="Note1" body="This is my frst note" />
          </div>

          <div className="NewNote col-md-8 col-8">
            <EditNote title="Note1" body="This is my frst note"/>
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
