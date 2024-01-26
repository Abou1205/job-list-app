import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h2>İş Takip</h2>

      <nav>
        <NavLink to={"/"}>Job Lists</NavLink>
        <NavLink to={"/add"}>Add Job</NavLink>
      </nav>
    </header>
  );
};

export default Header;
