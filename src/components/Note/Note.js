import React, { Component } from 'react'

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

export default Note