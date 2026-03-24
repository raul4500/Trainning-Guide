import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import day from "../data/today.js"

export function useCycleDay(){
    const [cycleDay, setCycleDay] = useState(null);

    useEffect(() => {
    async function fetchWorkout() {
      const { data, error } = await supabase
        .from("cycle_days")
        .select(
          "id, name, exercises(id, name, order, sets(id, reps, kg, rest, order))",
        )
        .eq('"order"', parseInt(day))
        .maybeSingle();

      console.log("error:", error);

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

  return [cycleDay, setCycleDay];
}