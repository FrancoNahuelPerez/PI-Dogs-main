import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from './NavBar.module.css'

export default function NavBar() {
  return (
    <div className={styles["navbar-container"]}>
      <Link to={'/home'}>
        <button className={styles["navbar-button"]}>HOME</button>
      </Link>
      <SearchBar className={styles["search-bar"]} />
      <Link to={'/form'}>
        <button className={styles["navbar-button"]}>CREATE</button>
      </Link>
      <Link to={'/'}>
        <button className={styles["navbar-button"]}>LOGOUT</button>
      </Link>
    </div>
  );
}
