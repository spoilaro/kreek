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

  let toggleNews = () => {
    setShowNews(!showNews);
    
  }

  return (
    <div id="app">
      <Navbar searchFn={setSearchWord} toggleNews={toggleNews} showNews={showNews}/>
      <div className="content">
        
        {(showNews == true) ? <NewsCard /> : <></>}
        <Graph place={searchWord} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
