import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";


export default function Landing() {
  return (
    <div className={style.Landing}>
      <Link className={style.buttonContainer} to="/home">
        <div className={style.button}>
          App Dogs 
        </div>
      </Link>
    </div>
  );
}
