import { useState, useEffect, useRef } from "react";
import ScoreBox from "./ScoreBox";

function GameBoard() {
  const initialInfo = { player: 0, win: -1, score: [0, 0] };
  const infoRef = useRef(initialInfo);

  const windConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
  ];

  const initialStatus = Array(9).fill(null);
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    switch (infoRef.current.win) {
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
  });

  const handleClick = (index) => {
    if (infoRef.current.win !== -1) {
      setStatus(initialStatus);
      infoRef.current.player = 0;
      infoRef.current.win = -1;
    } else if (status[index] === null) {
      const newStatus = status.map((x, i) =>
        i === index ? infoRef.current.player : x
      );
      setStatus(newStatus);
      if (
        windConditions.some((x) =>
          x.every((item) => newStatus[item] === infoRef.current.player)
        )
      ) {
        infoRef.current.win = infoRef.current.player;
        infoRef.current.score = infoRef.current.score.map((x, i) =>
          i === infoRef.current.player ? x + 1 : x
        );
      } else if (newStatus.every((x) => x !== null)) {
        infoRef.current.win = 2;
      } else {
        infoRef.current.player = 1 - infoRef.current.player;
      }
    }
  };

  return (
    <div>
      <div className="score panel">
        <ScoreBox
          index={0}
          score={infoRef.current.score[0]}
          current={infoRef.current.player}
        />
        <ScoreBox
          index={1}
          score={infoRef.current.score[1]}
          current={infoRef.current.player}
        />
      </div>
      <div className="tic-panel">
        {status.map((x, index) => (
          <button
            className="item"
            key={index}
            onClick={() => handleClick(index)}
          >
            {x === null ? "" : x ? "X" : "O"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
