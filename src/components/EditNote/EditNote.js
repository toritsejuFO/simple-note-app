import React, { Component } from 'react'
import styles from './EditNote.module.css';

class EditNote extends Component {
  constructor(props) {
    super(props);
  }

  handleTitleChange = e => {
    this.props.handleTitleChange(e.target.value)    
  }

  handleBodyChange = e => {
    this.props.handleBodyChange(e.target.value)
  }

  render() {
    const id =this.props.id
    const title = this.props.title
    const body = this.props.body

    return (
      // {/* Form to edit and update existing notes*/}
      <form className={styles.Form + ' form-control'} onSubmit={this.handleSubmit}>
        <div>
          <p>You are editing slot
            <input
              className={styles.UneditableID}
              value={' ' + id}
              disabled />
          </p>
        </div>
        <div>
          <input className={styles.Title + ' form-control'}
            value={title}
            onChange={this.handleTitleChange}
          />
        </div>
        <div>
          <textarea
            className={'form-control ' + styles.Body}
            style={{ height: '400px' }}
            onChange={this.handleBodyChange}
            value={body}
          />
        </div>
        {/* <div>
          <input
            type="submit"
            value="Save"
            className={styles.SaveButton + ' btn btn-gray float-right'} />
        </div> */}
      </form>
    );
  }
}

export default EditNote