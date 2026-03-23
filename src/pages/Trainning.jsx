import { useParams } from "react-router";
import ExerciseCard from "../components/ExerciseCard";
import ReturnButton from "../components/ReturnButton";
import "./Trainning.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Trainning() {
  let { day } = useParams();
  const [cycleDay, setCycleDay] = useState(null);
  const [workoutLogId, setWorkoutLogId] = useState(null);

  useEffect(() => {
    async function fetchWorkout() {
      const test = await supabase.from("cycle_days").select("*");
      console.log("teste direto:", test);

      const { data, error } = await supabase
        .from("cycle_days")
        .select(
          "id, name, exercises(id, name, order, sets(id, reps, kg, rest, order))",
        )
        .eq('"order"', parseInt(day))
        .maybeSingle();

      console.log("data:", data, "error:", error);

      data.exercises.sort((a, b) => a.order - b.order);
      data.exercises.forEach((ex) => ex.sets.sort((a, b) => a.order - b.order));

      // Injeta o cycleDay_id em cada exercício para o ExerciseCard usar
      data.exercises = data.exercises.map((ex) => ({
        ...ex,
        cycleDay_id: data.id,
      }));

      setCycleDay(data);
    }
    fetchWorkout();
  }, [day]);

  if (!cycleDay) return <div className="training-page">Carregando...</div>;

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
