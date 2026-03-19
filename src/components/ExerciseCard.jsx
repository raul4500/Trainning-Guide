import { useState } from "react";
import SetItem from "./SetItem";
import "./ExerciseCard.css";

function ExerciseCard({ exercise, index }) {
  const [completedSets, setCompletedSets] = useState([]);

  function finishSet(i) {
    setCompletedSets((prev) => [...prev, i]);
  }

  const finishedExercise = completedSets.length === exercise.sets.length;
  const progress = Math.round((completedSets.length / exercise.sets.length) * 100);

  return (
    <div className={`exercise-card ${finishedExercise ? "exercise-card--done" : ""}`}>
      <div className="exercise-card__header">
        <span className="exercise-card__number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="exercise-card__title-wrap">
          <h2 className="exercise-card__name">{exercise.name}</h2>
          <span className="exercise-card__sets-label">
            {exercise.sets.length} séries
          </span>
        </div>
        {finishedExercise && (
          <span className="exercise-card__done-badge">✓ FEITO</span>
        )}
      </div>

      <div className="exercise-card__progress-bar">
        <div
          className="exercise-card__progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="exercise-card__sets">
        {exercise.sets.map((set, i) => (
          <SetItem
            key={i}
            set={set}
            index={i}
            completed={completedSets.includes(i)}
            finishSet={finishSet}
          />
        ))}
      </div>
    </div>
  );
}

export default ExerciseCard;
