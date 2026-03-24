import "./Home.css";
import Weekbox from "../components/Weekbox";
import Header from "../components/Header";
import Todaysbox from "../components/Todaysbox";
import { Link } from 'react-router';

function Home() {
  const today = new Date();
  const currentDate = today.getDate();
  const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const weekDaysArray = [];
  let day;

  for (let i = -3; i <= 3; i++) {
    const newDate = new Date(today);
    newDate.setDate(currentDate + i);
    if (i === 0) {
      day = newDate.getDay() - 1;
    }
    weekDaysArray.push({
      name: weekdays[newDate.getDay()],
      date: newDate.getDate(),
      isToday: i === 0,
    });
  }

  return (
    <div className="home">
      <Header />
      <Weekbox weekDaysArray={weekDaysArray} />
      <Link to="/edit" className="edit-link">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Editar treinos
      </Link>
      <Todaysbox day={day} />
    </div>
  );
}

export default Home;
