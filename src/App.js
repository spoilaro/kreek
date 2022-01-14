import Navbar from "./components/Navbar";
import Graph from "./components/Graph";
import NewsCard from "./components/NewsCard/NewsCard";
import { useState } from "react";

import "./globals.css";
import Footer from "./components/Footer/Footer";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [showNews, setShowNews] = useState(true);
  const [newStyle, setNewStyle] = useState("");
  const [buttonStyle, setButtonStyle] = useState("button-off");

  let toggleNews = () => {
    setShowNews(!showNews);
    if (!showNews) {
      setButtonStyle("button-off");
      setNewStyle("");
    } else {
      setButtonStyle("");
      setNewStyle("news-box-open");
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
