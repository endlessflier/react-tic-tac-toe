import { useState } from "react";

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

function TicPanel(props) {
  const initialStatus = Array(9).fill(null);
  const [status, setStatus] = useState(initialStatus);

  const handleClick = (index) => {
    if (props.info.win !== -1) {
      props.setInfo({ ...props.info, player: 0, win: -1 });
      setStatus(initialStatus);
    } else if (status[index] === null) {
      const newStatus = status.map((x, i) =>
        i === index ? props.info.player : x
      );
      setStatus(newStatus);
      if (
        windConditions.some((x) =>
          x.every((item) => newStatus[item] === props.info.player)
        )
      ) {
        props.setInfo({
          ...props.info,
          win: props.info.player,
          score: props.info.score.map((x, i) =>
            i === props.info.player ? x + 1 : x
          )
        });
      } else if (newStatus.every((x) => x !== null)) {
        props.setInfo({ ...props.info, win: 2 });
      } else {
        props.setInfo({ ...props.info, player: 1 - props.info.player });
      }
    }
  };

  return (
    <div className="tic-panel">
      {status.map((x, index) => (
        <button className="item" key={index} onClick={() => handleClick(index)}>
          {x === null ? "" : x ? "X" : "O"}
        </button>
      ))}
    </div>
  );
}
export default TicPanel;
