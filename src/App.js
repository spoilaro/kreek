import Footer from "./components/Footer";
import NewsCard from "./components/NewsCard";

function App() {
  return (<div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "50vh",
        width: "30vw",
        alignItems: "center",
        fontSize: "5rem",
        color: "pink",
      }}
    >
      <h1>Kreek</h1>
      
    </div>
    <NewsCard></NewsCard>
    </div>
  );
}

export default App;
