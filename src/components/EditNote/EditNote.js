import React, { Component } from 'react'
import styles from './EditNote.module.css';

class EditNote extends Component {
  handleChange = (e, key) => {
    // Extra argument to specify what is being changed
    this.props.handleChange(e.target.value, key)
  }

  render() {
    const id = this.props.id;
    const title = this.props.title;
    const body = this.props.body;

    return (
      // Form to edit and update existing notes
      <form className={styles.Form + ' form-group'} onSubmit={this.handleSubmit}>
        <div>
          <p>You are editing slot {id + 1}</p>
        </div>
        <div>
          <input className={styles.Title + ' form-control'}
            value={title}
            placeholder={"Enter title here"}
            onChange={e => this.handleChange(e, 'title')}
          />
        </div>
        <div>
          <textarea rows="1000"
            className={styles.Body + ' form-control'}
            style={{ height: '450px' }}
            value={body}
            placeholder={"Enter body here"}
            onChange={e => this.handleChange(e, 'body')}
          />
        </div>
      </form>
    );
  }
}

export default EditNote