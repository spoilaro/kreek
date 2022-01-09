import Navbar from "./components/Navbar";
/* import Footer from "./components/Footer"; */
import { useState } from "react";

function App() {
  const [searchWord, setSearchWord] = useState("");

  return (
    <div>
      <Navbar searchFn={setSearchWord} />
    </div>
  );
}

export default App;
