import React from "react";
import "./style.css";

export default function Navbar(props) {


    return(
        <div className="navBar">
            <div className="searchBarDiv">
                <form>
                    <input class="searchBarInput"></input>
                    <button class="searchBarButton">Etsi</button>
                </form>
            </div>
        </div>
    )
}