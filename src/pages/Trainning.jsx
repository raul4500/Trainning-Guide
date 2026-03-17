import { useParams } from "react-router";
import workout from "../data/workout.json";
import ExerciseCard from "../components/ExerciseCard";

function Trainning() {
  let { day } = useParams();

  const today = workout.cycle_days[day];

  return (
    <div className="workout-card">
      <h1>{today.name}</h1>

      {today.exercises.map((exercise, index) => (
        <ExerciseCard key={index} exercise={exercise} />
      ))}
    </div>
  );
}

export default Trainning;
