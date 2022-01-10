import React, { useState } from "react";
import "./style.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import data from "../../fact_cov19cov.dimensions.json";

export default function Navbar({ searchFn }) {
  const [searchText, setSearchText] = useState("Ahvenanmaa");
  const places = data[0].children[0].children;

  places.map((elem) => {
    elem = elem.label;
  });

  const options = ["Ahvenanmaa"];

  const handleChange = (option) => {
    setSearchText(option.label);
    searchFn(searchText);
    console.log(data[0].children[0].children);
  };

  return (
    <div className="navBar">
      <h1 className="title">KREEK</h1>
      <Dropdown options={places} onChange={handleChange} />
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
