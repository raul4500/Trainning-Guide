import './Todaysbox.css';
import { Link } from 'react-router';
import workout from "../data/workout.json";

function TodaysBox({ day }) {
  const today = workout.cycle_days[day];
  const url = `/start/${day}`;
  const totalSets = today.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);

  return (
    <div className="todaysbox">

      <div className="todaysbox_header">
        <div className="todaysbox_tag">TREINO DE HOJE</div>
        <div className="todaysbox_stats">
          <span>{today.exercises.length} exercícios</span>
          <span className="todaysbox_stats-dot" />
          <span>{totalSets} séries</span>
        </div>
      </div>

      <h2 className="todaysbox_name">{today.name}</h2>

      <div className="todaysbox_exercises">
        {today.exercises.map((ex, i) => (
          <div key={i} className="todaysbox_exercise-row">
            <span className="todaysbox_exercise-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="todaysbox_exercise-name">{ex.name}</span>
            <span className="todaysbox_exercise-sets">{ex.sets.length}x</span>
          </div>
        ))}
      </div>

      <Link to={url} className="todaysbox_start">
        <span>Iniciar treino</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

    </div>
  );
}

export default TodaysBox;
