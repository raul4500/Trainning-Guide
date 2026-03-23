import { useState, useRef } from "react"
import { supabase } from "../lib/supabase"
import "./ExerciseCard.css"

function ExerciseCard({ exercise, index, workoutLogId, onLogCreated }) {
  const [completedSets, setCompletedSets] = useState([])
  const [kgValues, setKgValues] = useState(
    () => Object.fromEntries(exercise.sets.map((s) => [s.id, s.kg]))
  )
  const [saving, setSaving] = useState(null)
  const [error, setError] = useState(null)
  const logIdRef = useRef(workoutLogId)

  const finishedExercise = completedSets.length === exercise.sets.length
  const progress = Math.round((completedSets.length / exercise.sets.length) * 100)

  // Garante que existe um workout_log antes de salvar
  async function ensureWorkoutLog() {
    if (logIdRef.current) return logIdRef.current

    const { data, error } = await supabase
      .from("workout_logs")
      .insert({ cycle_day_id: exercise.cycleDay_id })
      .select("id")
      .single()

    if (error) throw error

    logIdRef.current = data.id
    onLogCreated?.(data.id)
    return data.id
  }

  async function finishSet(setIndex) {
    const set = exercise.sets[setIndex]
    const kgUsed = kgValues[set.id]

    setSaving(setIndex)
    setError(null)

    try {
      const logId = await ensureWorkoutLog()

      const { error: insertError } = await supabase.from("set_logs").insert({
        workout_log_id: logId,
        set_id: set.id,
        exercise_id: exercise.id,
        kg_used: parseFloat(kgUsed),
        reps_done: set.reps,
        completed: true,
      })

      if (insertError) throw insertError

      setCompletedSets((prev) => [...prev, setIndex])
    } catch (err) {
      setError(`Erro ao salvar série ${setIndex + 1}. Tente novamente.`, err)
    } finally {
      setSaving(null)
    }
  }

  function handleKgChange(setId, value) {
    setKgValues((prev) => ({ ...prev, [setId]: value }))
  }

  return (
    <div className={`exercise-card ${finishedExercise ? "exercise-card--done" : ""}`}>
      <div className="exercise-card__header">
        <span className="exercise-card__number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="exercise-card__title-wrap">
          <h2 className="exercise-card__name">{exercise.name}</h2>
          <span className="exercise-card__sets-label">
            {exercise.sets.length} séries
          </span>
        </div>
        {finishedExercise && (
          <span className="exercise-card__done-badge">✓ FEITO</span>
        )}
      </div>

      <div className="exercise-card__progress-bar">
        <div
          className="exercise-card__progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {error && <p className="exercise-card__error">{error}</p>}

      <div className="exercise-card__sets">
        {exercise.sets.map((set, i) => {
          const completed = completedSets.includes(i)
          const isSaving = saving === i

          return (
            <div
              key={set.id}
              className={`set-item ${completed ? "set-item--done" : ""}`}
            >
              <span className="set-item__index">Série {i + 1}</span>

              <div className="set-item__stats">
                <div className="set-item__stat">
                  <span className="set-item__stat-value">{set.reps}</span>
                  <span className="set-item__stat-label">reps</span>
                </div>

                <div className="set-item__divider" />

                <div className="set-item__stat">
                  {!completed ? (
                    <input
                      className="set-item__kg-input"
                      type="number"
                      min="0"
                      step="0.5"
                      value={kgValues[set.id]}
                      onChange={(e) => handleKgChange(set.id, e.target.value)}
                    />
                  ) : (
                    <span className="set-item__stat-value">
                      {kgValues[set.id]}
                    </span>
                  )}
                  <span className="set-item__stat-label">kg</span>
                </div>

                <div className="set-item__divider" />

                <div className="set-item__stat">
                  <span className="set-item__stat-value">{set.rest}s</span>
                  <span className="set-item__stat-label">descanso</span>
                </div>
              </div>

              {!completed ? (
                <button
                  className={`set-item__btn ${isSaving ? "set-item__btn--saving" : ""}`}
                  onClick={() => finishSet(i)}
                  disabled={isSaving}
                >
                  {isSaving ? "..." : "Concluir"}
                </button>
              ) : (
                <span className="set-item__check">✓</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExerciseCard