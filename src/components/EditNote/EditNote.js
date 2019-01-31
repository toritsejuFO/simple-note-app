import React, { Component } from 'react'
import styles from './EditNote.module.css';

class EditNote extends Component {
  handleTitleChange = e => {
    this.props.handleTitleChange(e.target.value)
  }

  handleBodyChange = e => {
    this.props.handleBodyChange(e.target.value)
  }

  render() {
    const id = this.props.id
    const title = this.props.title
    const body = this.props.body

    return (
      // {/* Form to edit and update existing notes*/}
      <form className={styles.Form + ' form-group'} onSubmit={this.handleSubmit}>
        <div>
          <p
          className="float-left"
          style={{width: '200px'}}>
            You are editing slot
            <input
              className={styles.UneditableID}
              value={' ' + id}
              disabled />
          </p>
          <input
            type="submit"
            value="Save"
            className={styles.SaveButton + ' btn btn-light float-right'} />
        </div>
        <div>
          <input className={styles.Title + ' form-control'}
            value={title}
            onChange={this.handleTitleChange}
          />
        </div>
        <div>
          <textarea rows="1000"
            className={styles.Body + ' form-control'}
            style={{ height: '450px' }}
            value={body}
            onChange={this.handleBodyChange}
          />
        </div>
      </form>
    );
  }
}

export default EditNote