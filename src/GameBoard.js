import { useState, useEffect } from "react";
import ScoreBox from "./ScoreBox";
import TicPanel from "./TicPanel";

function GameBoard() {
  const initialInfo = { player: 0, win: -1, score: [0, 0] };
  const [info, setInfo] = useState(initialInfo);

  useEffect(() => {
    switch (info.win) {
      case 0:
        alert("O win!");
        break;
      case 1:
        alert("X win!");
        break;
      case 2:
        alert("Draw!");
        break;
      default:
        break;
    }
  }, [info]);
  return (
    <div>
      <div className="score panel">
        <ScoreBox index={0} score={info.score[0]} current={info.player} />
        <ScoreBox index={1} score={info.score[1]} current={info.player} />
      </div>
      <TicPanel info={info} setInfo={setInfo} />
    </div>
  );
}

export default GameBoard;
