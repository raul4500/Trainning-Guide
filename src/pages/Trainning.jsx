function Trainning(){
    return(
        <main class="container">

    <section class="day-selector">
      <label for="day">Escolha o dia:</label>
      <select id="day">
        <option>Segunda - Peito</option>
        <option>Terça - Costas</option>
        <option>Quarta - Pernas</option>
        <option>Quinta - Ombro</option>
        <option>Sexta - Braço</option>
      </select>
      <button class="btn-primary">Ver Treino</button>
    </section>

    <section class="workout-card">
      <h2>Treino do Dia</h2>

      <div class="exercise-list">

        <div class="exercise">
          <span class="exercise-name">Supino Reto</span>
          <span class="exercise-info">4x8</span>
        </div>

        <div class="exercise">
          <span class="exercise-name">Supino Inclinado</span>
          <span class="exercise-info">3x10</span>
        </div>

        <div class="exercise">
          <span class="exercise-name">Crossover</span>
          <span class="exercise-info">3x12</span>
        </div>

      </div>
    </section>

  </main>
    )
}

export default Trainning;