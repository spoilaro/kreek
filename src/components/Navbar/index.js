import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import data from "../../fact_cov19cov.dimensions.json";

export default function Navbar({ searchFn, toggleNews, showNews }) {
  const [searchText, setSearchText] = useState("Valitse");
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
      <button className="toggle-button" onClick={toggleNews}>{(showNews == true) ? "Piilota uutiset" : "Näytä uutiset "}</button>
      <Dropdown className="dropdown" options={places} onChange={handleChange} value={"Valitse"}  />
    </div>
  );
}
