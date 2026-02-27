import './Weekbox.css'

function Weekbox() {

    const today = new Date();
    const currentDate = today.getDate();

    const weekdays = ["sun","mon","tue","wed","thu","fri","sat", ];

    // Criamos um array com 7 dias (a semana)
    const weekDaysArray = [];

    for (let i = -3; i <= 3; i++) {

        const newDate = new Date(today);
        newDate.setDate(currentDate + i);

        weekDaysArray.push({
            name: weekdays[newDate.getDay()],
            date: newDate.getDate(),
            isToday: i === 0
        });
    }

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