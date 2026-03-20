import { useParams } from "react-router";
import workout from "../data/workout.json";
import ExerciseCard from "../components/ExerciseCard";
import ReturnButton from "../components/ReturnButton";
import "./Trainning.css";

function Trainning() {
  let { day } = useParams();
  const today = workout.cycle_days[day];

  return (
    
    <div className="training-page">
      <div className="training-header">
        <div className="training-header-tag">TREINO DO DIA</div>
        <h1 className="training-title">{today.name}</h1>
        <div className="training-meta">
          <span className="training-count">
            {today.exercises.length} exercícios
          </span>
        </div>
        <div className="header-line" />
      </div>
    
      <div className="exercises-list">
        {today.exercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} index={index} />
        ))}
        <ReturnButton></ReturnButton>
      </div>
    </div>
  );
}

export default Trainning;
