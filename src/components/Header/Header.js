import React from 'react'
import styles from './Header.module.css'

function Header(props) {
  return (
    <div className={styles.header + " col-12"}>
      <h1 className={styles.headerText}>{props.text}</h1>
    </div>
  );
}

export default Header