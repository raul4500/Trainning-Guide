import './Todaysbox.css';
import { Link } from 'react-router';
import workout from "../data/workout.json";

function TodaysBox({ day }) {
  const today = workout.cycle_days[day];
  const url = `/start/${day}`;
  const totalSets = today.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);

  return (
    <div className="todaysbox">

      <div className="todaysbox__header">
        <div className="todaysbox__tag">TREINO DE HOJE</div>
        <div className="todaysbox__stats">
          <span>{today.exercises.length} exercícios</span>
          <span className="todaysbox__stats-dot" />
          <span>{totalSets} séries</span>
        </div>
      </div>

      <h2 className="todaysbox__name">{today.name}</h2>

      <div className="todaysbox__exercises">
        {today.exercises.map((ex, i) => (
          <div key={i} className="todaysbox__exercise-row">
            <span className="todaysbox__exercise-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="todaysbox__exercise-name">{ex.name}</span>
            <span className="todaysbox__exercise-sets">{ex.sets.length}x</span>
          </div>
        ))}
      </div>

      <Link to={url} className="todaysbox__start">
        <span>Iniciar treino</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      <Link to="/edit" className="todaysbox__edit-link">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Editar treinos
      </Link>

    </div>
  );
}

export default TodaysBox;