import ExerciseCard from "../components/ExerciseCard";
import ReturnButton from "../components/ReturnButton";
import "./Trainning.css";
import { useState } from "react";
import { useCycleDay } from "../data/workout.js"

function Trainning() {
  
  const [cycleDay] = useCycleDay();
  const [workoutLogId, setWorkoutLogId] = useState(null);

  if (!cycleDay) return <div className="training-page"><div className="loader"></div></div>;

  return (
    <div className="training-page">
      <div className="training-header">
        <div className="training-header-tag">TREINO DO DIA</div>
        <h1 className="training-title">{cycleDay.name}</h1>
        <div className="training-meta">
          <span className="training-count">
            {cycleDay.exercises.length} exercícios
          </span>
        </div>
        <div className="header-line" />
      </div>

      <div className="exercises-list">
        {cycleDay.exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={index}
            workoutLogId={workoutLogId}
            onLogCreated={(id) => setWorkoutLogId(id)}
          />
        ))}
        <ReturnButton />
      </div>
    </div>
  );
}

export default Trainning;
