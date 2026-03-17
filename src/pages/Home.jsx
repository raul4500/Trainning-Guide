import "./Home.css";
import Weekbox from "../components/Weekbox";
import Header from "../components/Header";
import Todaysbox from "../components/Todaysbox";


function Home() {
  const today = new Date();
  const currentDate = today.getDate();

  const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  // Criamos um array com 7 dias (a semana)
  const weekDaysArray = [];

  for (let i = -3; i <= 3; i++) {
    const newDate = new Date(today);
    newDate.setDate(currentDate + i);
    if(i === 0){
      var day = newDate.getDay() - 1
    }
    weekDaysArray.push({
      name: weekdays[newDate.getDay()],
      date: newDate.getDate(),
      isToday: i === 0,
    });
  }

  return (
    <div className="home">
      <Header></Header>
      <Weekbox weekDaysArray={weekDaysArray}></Weekbox>
      <Todaysbox day={day}></Todaysbox>
    </div>
  );
}

export default Home;
