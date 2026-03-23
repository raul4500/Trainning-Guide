import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import "./Edit.css";

function Edit() {
  const [cycleDays, setCycleDays] = useState([]);
  const [selected, setSelected] = useState(null); // { id, name, order }
  const [mode, setMode] = useState(null); // "edit" | "delete" | "create"
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCycleDays();
  }, []);

  async function fetchCycleDays() {
    setLoading(true);
    const { data } = await supabase
      .from("cycle_days")
      .select('id, name, type, "order"')
      .order('"order"', { ascending: true });
    setCycleDays(data || []);
    setLoading(false);
  }

  async function handleDelete() {
    if (!selected) return;
    await supabase.from("cycle_days").delete().eq("id", selected.id);
    setSelected(null);
    setMode(null);
    fetchCycleDays();
  }

  async function handleCreate(name, type) {
    const maxOrder = cycleDays.length > 0
      ? Math.max(...cycleDays.map((d) => d["order"])) + 1
      : 0;
    const { data } = await supabase
      .from("cycle_days")
      .insert({ name, type, order: maxOrder })
      .select("id, name, type, order")
      .single();
    setMode(null);
    fetchCycleDays();
  }

  if (loading) return <div className="edit-page"><div className="loader"></div></div>;

  return (
    <div className="edit-page">
      <div className="edit-header">
        <button className="edit-back" onClick={() => navigate("/")}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div>
          <div className="edit-tag">GERENCIAR</div>
          <h1 className="edit-title">Meus Treinos</h1>
        </div>
      </div>

      <div className="edit-divider" />

      {/* Lista de treinos */}
      {mode !== "create" && (
        <>
          <div className="edit-section-label">SELECIONE UM TREINO</div>
          <div className="edit-days-list">
            {cycleDays.map((day) => (
              <button
                key={day.id}
                className={`edit-day-item ${selected?.id === day.id ? "edit-day-item--active" : ""}`}
                onClick={() => {
                  setSelected(day);
                  setMode(null);
                }}
              >
                <span className="edit-day-type">{day.type}</span>
                <span className="edit-day-name">{day.name}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>

          {/* Ações */}
          {selected && (
            <div className="edit-actions">
              <button className="edit-action edit-action--edit" onClick={() => setMode("edit")}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Editar exercícios
              </button>
              <button className="edit-action edit-action--delete" onClick={() => setMode("delete")}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 4h10M6 4V3h4v1M5 4v8a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Deletar treino
              </button>
            </div>
          )}

          <button className="edit-create-btn" onClick={() => { setSelected(null); setMode("create"); }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Criar novo treino
          </button>
        </>
      )}

      {/* Confirmar delete */}
      {mode === "delete" && selected && (
        <div className="edit-confirm">
          <p className="edit-confirm-text">
            Tem certeza que quer deletar <strong>{selected.name}</strong>?<br/>
            <span>Todos os exercícios e séries serão removidos.</span>
          </p>
          <div className="edit-confirm-btns">
            <button className="edit-confirm-cancel" onClick={() => setMode(null)}>Cancelar</button>
            <button className="edit-confirm-delete" onClick={handleDelete}>Deletar</button>
          </div>
        </div>
      )}

      {/* Criar treino */}
      {mode === "create" && (
        <CreateDayForm onSave={handleCreate} onCancel={() => setMode(null)} />
      )}

      {/* Editar exercícios */}
      {mode === "edit" && selected && (
        <ExercisesEditor cycleDay={selected} onBack={() => setMode(null)} />
      )}
    </div>
  );
}

/* ── Formulário criar treino ── */
function CreateDayForm({ onSave, onCancel }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("musculacao");

  return (
    <div className="edit-form">
      <div className="edit-section-label">NOVO TREINO</div>
      <div className="edit-field">
        <label className="edit-field-label">Nome</label>
        <input
          className="edit-input"
          type="text"
          placeholder="Ex: Upper 3, Legs..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="edit-field">
        <label className="edit-field-label">Tipo</label>
        <select className="edit-input edit-select" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="musculacao">Musculação</option>
          <option value="corrida">Corrida</option>
          <option value="outro">Outro</option>
        </select>
      </div>
      <div className="edit-form-btns">
        <button className="edit-confirm-cancel" onClick={onCancel}>Cancelar</button>
        <button
          className="edit-confirm-save"
          onClick={() => name.trim() && onSave(name.trim(), type)}
          disabled={!name.trim()}
        >
          Criar
        </button>
      </div>
    </div>
  );
}

/* ── Editor de exercícios ── */
function ExercisesEditor({ cycleDay, onBack }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newExName, setNewExName] = useState("");

  useEffect(() => {
    fetchExercises();
  }, [cycleDay.id]);

  async function fetchExercises() {
    setLoading(true);
    const { data } = await supabase
      .from("exercises")
      .select(`id, name, "order", sets(id, reps, kg, rest, "order")`)
      .eq("cycle_day_id", cycleDay.id)
      .order('"order"', { ascending: true });

    const sorted = (data || []).map((ex) => ({
      ...ex,
      sets: [...ex.sets].sort((a, b) => a["order"] - b["order"]),
    }));
    setExercises(sorted);
    setLoading(false);
  }

  async function addExercise() {
    if (!newExName.trim()) return;
    const maxOrder = exercises.length > 0
      ? Math.max(...exercises.map((e) => e["order"])) + 1
      : 0;
    await supabase.from("exercises").insert({
      cycle_day_id: cycleDay.id,
      name: newExName.trim(),
      order: maxOrder,
    });
    setNewExName("");
    setAdding(false);
    fetchExercises();
  }

  async function removeExercise(id) {
    await supabase.from("exercises").delete().eq("id", id);
    fetchExercises();
  }

  async function renameExercise(id, name) {
    await supabase.from("exercises").update({ name }).eq("id", id);
    fetchExercises();
  }

  async function moveExercise(index, direction) {
    const newList = [...exercises];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newList.length) return;

    const a = newList[index];
    const b = newList[swapIndex];

    await supabase.from("exercises").update({ order: b["order"] }).eq("id", a.id);
    await supabase.from("exercises").update({ order: a["order"] }).eq("id", b.id);
    fetchExercises();
  }

  if (loading) return <div className="edit-page">Carregando...</div>;

  return (
    <div className="exercises-editor">
      <div className="exercises-editor__header">
        <button className="edit-back edit-back--sm" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div>
          <div className="edit-tag">EDITANDO</div>
          <h2 className="exercises-editor__title">{cycleDay.name}</h2>
        </div>
      </div>

      <div className="edit-divider" />

      <div className="exercises-editor__list">
        {exercises.map((ex, i) => (
          <ExerciseEditCard
            key={ex.id}
            exercise={ex}
            index={i}
            total={exercises.length}
            expanded={expandedId === ex.id}
            onToggle={() => setExpandedId(expandedId === ex.id ? null : ex.id)}
            onRemove={() => removeExercise(ex.id)}
            onRename={(name) => renameExercise(ex.id, name)}
            onMove={(dir) => moveExercise(i, dir)}
            onSetsChange={fetchExercises}
          />
        ))}
      </div>

      {adding ? (
        <div className="edit-add-form">
          <input
            className="edit-input"
            type="text"
            placeholder="Nome do exercício"
            value={newExName}
            onChange={(e) => setNewExName(e.target.value)}
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && addExercise()}
          />
          <div className="edit-form-btns">
            <button className="edit-confirm-cancel" onClick={() => { setAdding(false); setNewExName(""); }}>Cancelar</button>
            <button className="edit-confirm-save" onClick={addExercise} disabled={!newExName.trim()}>Adicionar</button>
          </div>
        </div>
      ) : (
        <button className="edit-create-btn" onClick={() => setAdding(true)}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Adicionar exercício
        </button>
      )}
    </div>
  );
}

/* ── Card de exercício editável ── */
function ExerciseEditCard({ exercise, index, total, expanded, onToggle, onRemove, onRename, onMove, onSetsChange }) {
  const [renaming, setRenaming] = useState(false);
  const [nameVal, setNameVal] = useState(exercise.name);

  function submitRename() {
    if (nameVal.trim() && nameVal !== exercise.name) onRename(nameVal.trim());
    setRenaming(false);
  }

  return (
    <div className={`ex-edit-card ${expanded ? "ex-edit-card--open" : ""}`}>
      <div className="ex-edit-card__row">
        {/* Reorder */}
        <div className="ex-edit-card__order">
          <button className="ex-edit-card__arrow" onClick={() => onMove(-1)} disabled={index === 0}>▲</button>
          <button className="ex-edit-card__arrow" onClick={() => onMove(1)} disabled={index === total - 1}>▼</button>
        </div>

        {/* Nome */}
        {renaming ? (
          <input
            className="edit-input edit-input--inline"
            value={nameVal}
            onChange={(e) => setNameVal(e.target.value)}
            onBlur={submitRename}
            onKeyDown={(e) => e.key === "Enter" && submitRename()}
            autoFocus
          />
        ) : (
          <span className="ex-edit-card__name" onClick={() => setRenaming(true)}>{exercise.name}</span>
        )}

        {/* Ações */}
        <div className="ex-edit-card__actions">
          <button className="ex-edit-card__btn ex-edit-card__btn--rename" onClick={() => setRenaming(true)} title="Renomear">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="ex-edit-card__btn ex-edit-card__btn--sets" onClick={onToggle} title="Séries">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="ex-edit-card__btn ex-edit-card__btn--remove" onClick={onRemove} title="Remover">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M3 4h10M6 4V3h4v1M5 4v8a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Séries expandidas */}
      {expanded && (
        <SetsEditor exercise={exercise} onSetsChange={onSetsChange} />
      )}
    </div>
  );
}

/* ── Editor de séries ── */
function SetsEditor({ exercise, onSetsChange }) {
  const [sets, setSets] = useState(exercise.sets);
  const [saving, setSaving] = useState(false);

  async function updateSet(id, field, value) {
    setSets((prev) => prev.map((s) => s.id === id ? { ...s, [field]: value } : s));
  }

  async function saveSet(set) {
    setSaving(true);
    await supabase.from("sets").update({
      reps: set.reps,
      kg: parseFloat(set.kg),
      rest: parseInt(set.rest),
    }).eq("id", set.id);
    setSaving(false);
    onSetsChange();
  }

  async function removeSet(id) {
    await supabase.from("sets").delete().eq("id", id);
    setSets((prev) => prev.filter((s) => s.id !== id));
    onSetsChange();
  }

  async function addSet() {
    const last = sets[sets.length - 1];
    const maxOrder = sets.length > 0 ? Math.max(...sets.map((s) => s["order"])) + 1 : 0;
    const { data } = await supabase.from("sets").insert({
      exercise_id: exercise.id,
      reps: last?.reps || "9-12",
      kg: last?.kg || 0,
      rest: last?.rest || 60,
      order: maxOrder,
    }).select().single();
    setSets((prev) => [...prev, data]);
    onSetsChange();
  }

  return (
    <div className="sets-editor">
      <div className="sets-editor__header">
        <span className="sets-editor__col">Série</span>
        <span className="sets-editor__col">Reps</span>
        <span className="sets-editor__col">Kg</span>
        <span className="sets-editor__col">Desc(s)</span>
        <span className="sets-editor__col" />
      </div>

      {sets.map((set, i) => (
        <div key={set.id} className="sets-editor__row">
          <span className="sets-editor__index">{i + 1}</span>
          <input
            className="sets-editor__input"
            value={set.reps}
            onChange={(e) => updateSet(set.id, "reps", e.target.value)}
            onBlur={() => saveSet(set)}
          />
          <input
            className="sets-editor__input"
            type="number"
            step="0.5"
            value={set.kg}
            onChange={(e) => updateSet(set.id, "kg", e.target.value)}
            onBlur={() => saveSet(set)}
          />
          <input
            className="sets-editor__input"
            type="number"
            value={set.rest}
            onChange={(e) => updateSet(set.id, "rest", e.target.value)}
            onBlur={() => saveSet(set)}
          />
          <button className="sets-editor__remove" onClick={() => removeSet(set.id)}>✕</button>
        </div>
      ))}

      <button className="sets-editor__add" onClick={addSet}>
        + Adicionar série
      </button>
    </div>
  );
}

export default Edit;