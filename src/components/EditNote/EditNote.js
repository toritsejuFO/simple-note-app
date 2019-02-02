import React, { Component } from 'react'
import styles from './EditNote.module.css';

class EditNote extends Component {
  handleTitleChange = e => {
    this.props.handleTitleChange(e.target.value, "title") // Extra argument to specify what is being changed
  }

  handleBodyChange = e => {
    this.props.handleBodyChange(e.target.value, "body") // Extra argument to specify what is being changed
  }

  render() {
    const id = this.props.id
    const title = this.props.title
    const body = this.props.body

    return (
      // {/* Form to edit and update existing notes*/}
      <form className={styles.Form + ' form-group'} onSubmit={this.handleSubmit}>
        <div>
          <p>You are editing slot {id}</p>
        </div>
        <div>
          <input className={styles.Title + ' form-control'}
            value={title}
            placeholder={"Enter title here"}
            onChange={this.handleTitleChange}
          />
        </div>
        <div>
          <textarea rows="1000"
            className={styles.Body + ' form-control'}
            style={{ height: '450px' }}
            value={body}
            placeholder={"Enter body here"}
            onChange={this.handleBodyChange}
          />
        </div>
      </form>
    );
  }
}

export default EditNote