import React, { Component } from 'react'

class EditNote extends Component {
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

export default EditNote