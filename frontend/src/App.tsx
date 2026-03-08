import "./App.css";
import Game from "./Game/Game";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="game-container">
      <NavBar />
      <Game />
    </div>
  );
}

export default App;
