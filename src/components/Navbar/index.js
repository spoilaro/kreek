import React, { useState } from "react";
import "./style.css";

export default function Navbar({ searchFn }) {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="navBar">
      <div className="searchBarDiv">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchFn(searchText);
          }}
        >
          <input
            type="text"
            className="searchBarInput"
            value={searchText}
            onChange={handleChange}
          ></input>
          <button className="searchBarButton" type="submit">
            Etsi
          </button>
        </form>
      </div>
    </div>
  );
}
