import Navbar from "./components/Navbar";
/* import Footer from "./components/Footer"; */
import Graph from "./components/Graph";
import NewsCard from "./components/NewsCard/NewsCard";
import { useState } from "react";

import "./globals.css";
import Footer from "./components/Footer/Footer";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [showNews, setShowNews] = useState(true);
  const [newStyle, setNewStyle] = useState({
    opacity: "1",
  });
  const [buttonStyle, setButtonStyle] = useState({
    boxShadow:
      "12px 12px 16px 0 rgba(0, 0, 0, 0.25), -8px -8px 12px 0 rgba(57, 112, 138, 0.25)",
  });

  let toggleNews = () => {
    setShowNews(!showNews);
    if (!showNews) {
      setNewStyle({ opacity: "1" });
      setButtonStyle({
        boxShadow:
          "12px 12px 16px 0 rgba(0, 0, 0, 0.25), -8px -8px 12px 0 rgba(57, 112, 138, 0.25)",
      });
    } else {
      setNewStyle({
        opacity: "0",
        left: "90px",
        width: "70vw",
        marginLeft: "-600px",
      });
      setButtonStyle({
        boxShadow:
          "inset 6px 6px 10px 0 rgba(0, 0, 0, 0.1), inset -6px -6px 10px 0 rgba(255, 255, 255, 0.1)",
      });
    }
  };

  return (
    <div id="app">
      <Navbar
        searchFn={setSearchWord}
        toggleNews={toggleNews}
        showNews={showNews}
        styleObj={newStyle}
        buttonStyle={buttonStyle}
      />
      <div className="content">
        <NewsCard styleObj={newStyle} />
        <Graph place={searchWord} styleObj={newStyle} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
