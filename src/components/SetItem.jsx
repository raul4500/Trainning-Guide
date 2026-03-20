import "./SetItem.css";

function SetItem({ set, index, completed, finishSet }) {
  return (
    <div className={`set-item ${completed ? "set-item--done" : ""}`}>
      <span className="set-item__index"> {index + 1}</span>

      <div className="set-item__stats">
        <div className="set-item__stat">
          <span className="set-item__stat-value">{set.reps}</span>
          <span className="set-item__stat-label">reps</span>
        </div>
        <div className="set-item__divider" />
        <div className="set-item__stat">
          <span className="set-item__stat-value">{set.kg}</span>
          <span className="set-item__stat-label">kg</span>
        </div>
        <div className="set-item__divider" />
        <div className="set-item__stat">
          <span className="set-item__stat-value">{set.rest}s</span>
          <span className="set-item__stat-label">descanso</span>
        </div>
      </div>

      {!completed ? (
        <button
          className="set-item__btn"
          onClick={() => finishSet(index)}
        >
          Concluir
        </button>
      ) : (
        <span className="set-item__check">✓</span>
      )}
    </div>
  );
}

export default SetItem;
