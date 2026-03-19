import './Weekbox.css';

function Weekbox({ weekDaysArray }) {
  return (
    <section className="weekbox">
      <div className="weekbox_label">ESTA SEMANA</div>
      <div className="weekbox_days">
        {weekDaysArray.map((day, index) => (
          <div
            key={index}
            className={`weekbox_day ${day.isToday ? 'weekbox_day--today' : ''}`}
          >
            <span className="weekbox_day-name">{day.name}</span>
            <span className="weekbox_day-num">{day.date}</span>
            {day.isToday && <span className="weekbox_today-dot" />}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Weekbox;
