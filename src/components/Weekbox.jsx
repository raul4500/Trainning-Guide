import './Weekbox.css'

function Weekbox({ weekDaysArray }) {
    return (
        <div className="weekbox">
            <div className="days">
                {weekDaysArray.map((day, index) => (
                    <div 
                        key={index}
                        className={day.isToday ? "today" : "day"}
                    >
                        <p>{day.name}</p>
                        {day.isToday ? <div className="line"></div> : <div className="short-line"></div>}
                        <p>{day.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Weekbox;