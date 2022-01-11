import Navbar from "./components/Navbar";
/* import Footer from "./components/Footer"; */
import Graph from "./components/Graph";
import NewsCard from "./components/NewsCard/NewsCard";
import { useState } from "react";

import "./globals.css";

function App() {
  const [searchWord, setSearchWord] = useState("");

  return (
    <div id="app">
      <Navbar searchFn={setSearchWord} />
      <div className="content">
        <NewsCard />
        <Graph place={searchWord} />
      </div>
    </div>
  );
}

export default App;
