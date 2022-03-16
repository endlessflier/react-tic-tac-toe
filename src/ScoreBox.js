function ScoreBox(props) {
  return (
    <div
      className={
        props.index === props.current ? "score box selected" : "score box"
      }
    >
      <div>{props.index ? "X" : "O"}</div>
      <div>{props.score}</div>
    </div>
  );
}

export default ScoreBox;
