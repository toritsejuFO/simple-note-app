import React from 'react'
import styles from './Note.module.css';

function Note(props) {
  return (
    <div
      className={styles.Note + ' col-md-10  col-sm-10 col-8'}
      onClick={props.clicked.bind(this, props.id)}
    >
      <h4 className={styles.MiniTitle}>{props.id}. {props.title  || "Enter title here"} ...</h4>
      <p className={styles.MiniBody}>{props.body || "Enter body here"} ...</p>
    </div>
  );
}

export default Note