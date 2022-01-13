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
    width: "80vw"
  });

  let toggleNews = () => {
    setShowNews(!showNews);
    if (showNews) {
      setNewStyle({opacity: "1"});
    } else {
      setNewStyle({opacity: "0", position: "absolute", left: "-700px"});
    }
  }

  return (
    <div id="app">
      <Navbar searchFn={setSearchWord} toggleNews={toggleNews} showNews={showNews}/>
      <div className="content">
        
        <NewsCard styleObj={newStyle}/>
        <Graph place={searchWord} styleObj={newStyle}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
