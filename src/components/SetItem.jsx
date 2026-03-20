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
        <button className="set-item__btn" onClick={() => finishSet(index)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-check2-square"
            viewBox="0 0 16 16"
          >
            <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
            <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
          </svg>
        </button>
      ) : (
        <span className="set-item__check">✓</span>
      )}
    </div>
  );
}

export default SetItem;
