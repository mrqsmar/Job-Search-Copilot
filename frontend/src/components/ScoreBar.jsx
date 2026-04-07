function ScoreBar({ label, score }) {
  const getColor = (s) => {
    if (s >= 80) return "#22c55e";
    if (s >= 60) return "#eab308";
    if (s >= 40) return "#f97316";
    return "#ef4444";
  };

  return (
    <div className="score-bar">
      <div className="score-bar-header">
        <span>{label}</span>
        <span className="score-value">{score}/100</span>
      </div>
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: `${score}%`, backgroundColor: getColor(score) }}
        />
      </div>
    </div>
  );
}

export default ScoreBar;
