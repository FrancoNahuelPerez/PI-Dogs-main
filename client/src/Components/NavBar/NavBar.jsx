import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  return (
    <div>
      <Link to={'/home'}>
        <button>HOME</button>
      </Link>
      <SearchBar/>
      <Link to={'/form'}>
        <button>CREATE</button>
      </Link>
      <Link to={'/'}>
        <button>LOGOUT</button>
      </Link>
    </div>
  );
}
