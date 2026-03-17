function SetItem({ set, index, completed, finishSet }) {

  return (

    <div className={`set ${completed ? "done" : ""}`}>

      <span>Série {index + 1}</span>

      <span>{set.reps} reps</span>

      <span>{set.kg} kg</span>

      <span>{set.rest}s descanso</span>

      {!completed && (
        <button onClick={() => finishSet(index)}>
          Concluir
        </button>
      )}

      {completed && <span>✔</span>}

    </div>

  )
}

export default SetItem