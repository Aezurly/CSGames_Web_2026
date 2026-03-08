import "./Game/Game.css";
import meme from "./assets/memecsgames.jpg";

const Egg: React.FC = () => {
  return (
    <div className="egg-container">
      <h1>Easter Egg</h1>
      <h2>
        Polytechnique Montréal: <b>Poly Non</b>
      </h2>
      <p>Par Alice et Beaurel</p>
      <img src={meme} />
    </div>
  );
};

export default Egg;
