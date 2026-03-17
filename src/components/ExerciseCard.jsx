import { useState } from "react"
import SetItem from "./SetItem"

function ExerciseCard({ exercise }) {

  const [completedSets, setCompletedSets] = useState([])

  function finishSet(index){
    setCompletedSets([...completedSets, index])
  }

  const finishedExercise =
    completedSets.length === exercise.sets.length

  return (
    <div className="exercise-card">

      <h2>{exercise.name}</h2>

      {exercise.sets.map((set, index) => (

        <SetItem
          key={index}
          set={set}
          index={index}
          completed={completedSets.includes(index)}
          finishSet={finishSet}
        />

      ))}

      {finishedExercise && (
        <p>✔ Exercício concluído</p>
      )}

    </div>
  )
}

export default ExerciseCard