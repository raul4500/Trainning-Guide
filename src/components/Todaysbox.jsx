import './Todaysbox.css';
import { Link } from 'react-router';
import workout from "../data/workout.json";

function TodaysBox({day}) {

    const today = workout.cycle_days[day];

    const url = `/start/${day}`
    return (
        <div className="todaysbox">
            <div className="buttons">
                <div className="muscles">
                    {today.name}
                </div>
                <button className="viewmore">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                    </svg>
                </button>
            </div>
            
            <Link to={url} className="start">Start</Link>
            

        </div>
    )
};

export default TodaysBox;