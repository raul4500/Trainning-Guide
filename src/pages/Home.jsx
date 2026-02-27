import './Home.css'
import Weekbox from '../components/Weekbox'
import Header from '../components/Header'
import Todaysbox from '../components/Todaysbox'


function Home(){

    

    return (
        <div
            className="home"
        >
        <Header></Header>
        <Weekbox></Weekbox>
        <Todaysbox></Todaysbox>
        </div>
    )
}

export default Home;