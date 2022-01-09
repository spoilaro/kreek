import Navbar from "./components/Navbar";
/* import Footer from "./components/Footer"; */
import Graph from "./components/Graph";
import { useState } from "react";

function App() {
  const [searchWord, setSearchWord] = useState("");

  return (
    <div>
      <Navbar searchFn={setSearchWord} />
      <Graph />
    </div>
  );
}

export default App;
