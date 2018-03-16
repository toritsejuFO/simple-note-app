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
            defaultValue={this.state.title}
            // ref={(input) => this._title = input}
            onChange={this.handleTitleChange}
          />
        </div>
        <div>
          <textarea className="Body form-control"
            onChange={this.handleBodyChange}
            defaultValue={this.state.body}
            // ref={(textarea) => this._body = textarea}
          />
        </div>
        <div>
          <input type="submit" value="Save" className="SaveButton btn btn-gray float-right" />
        </div>
      </form>
    );
  }
}
