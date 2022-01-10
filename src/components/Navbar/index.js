import React, { useState } from "react";
import "./style.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";

export default function Navbar({ searchFn }) {
  const [searchText, setSearchText] = useState("Ahvenanmaa");

  const options = ["Ahvenanmaa"];

  const handleChange = (option) => {
    setSearchText(option.label);
    searchFn(searchText);
  };

  return (
    <div className="navBar">
      <Dropdown options={options} onChange={handleChange} />
    </div>
  );
}

//<div className="searchBarDiv">
//<form
//onSubmit={(e) => {
//e.preventDefault();
//searchFn(searchText);
//}}
//>
//<input
//type="text"
//className="searchBarInput"
//value={searchText}
//onChange={handleChange}
//></input>
//<button className="searchBarButton" type="submit">
//Etsi
//</button>
//</form>
//</div>
