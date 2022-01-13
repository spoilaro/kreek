import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import data from "../../fact_cov19cov.dimensions.json";

export default function Navbar({
  searchFn,
  toggleNews,
  showNews,
  buttonStyle,
}) {
  const [searchText, setSearchText] = useState("Valitse");
  const places = data[0].children[0].children;

  places.map((elem) => {
    elem = elem.label;
  });

  const handleChange = (option) => {
    setSearchText(option.label);
    searchFn(searchText);
  };

  return (
    <div className="navBar">
      <h1 className="title">KREEK</h1>
      <button
        className="toggle-button"
        onClick={toggleNews}
        style={buttonStyle}
      >
        {showNews == true ? "Piilota uutiset" : "Näytä uutiset "}
      </button>
      <Dropdown
        className="dropdown"
        options={places}
        onChange={handleChange}
        value={"Valitse"}
      />
    </div>
  );
}
