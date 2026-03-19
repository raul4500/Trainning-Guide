function SetItem({ set, index, completed, finishSet }) {

  return (

    <div className={`set ${completed ? "done" : ""}`}>

      <table>
        <tr>
          <th>REPS</th>
          <th>CARGA</th>
          <th>DESCANSO</th>
        </tr>
        <tr>
          <td>{set.reps}</td>
          <td>{set.kg} Kg</td>
          <td>{set.rest} seg</td>
        </tr>
      </table>

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