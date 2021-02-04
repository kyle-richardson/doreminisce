
import React, {useState, useEffect} from "react"
import moment from "moment"
// import axios from "axios"
import {getChart} from "billboard-top-100"
import Dropdowns from "./components/Dropdowns"
import SongList from "./components/SongList"
import SongSearch from "./components/SongSearch"
import Header from "./components/Header"
import { useDarkMode } from "./utils/useDarkMode"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";


function App() {

  const [darkMode, setDarkMode] = useDarkMode();
  const paletteType = darkMode ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: paletteType,
    }
  });
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [date, setDate] = useState({
    year: moment().format("YYYY"),
    month: moment().format('MM'),
    day: moment().format('DD')
  })
  const [chart, setChart] = useState(null)
  const [filter, setFilter] = useState("")
  const dateFormatted = `${date.year}-${date.month}-${date.day}`
  // const options = {
  //   method: 'GET',
  //   url: 'https://billboard-api2.p.rapidapi.com/hot-100',
  //   params: {date: dateFormatted, range: '1-100'},
  //   headers: {
  //     'x-rapidapi-key': `${process.env.REACT_APP_TOP100_API_KEY}`,
  //     'x-rapidapi-host': 'billboard-api2.p.rapidapi.com'
  //   }
  // };
  useEffect(()=> {
    // axios.request(options)
    // .then(res=> {
    //   console.log(res.data)
    //   setChart(res.data)
    // })
    // .catch(err=> console.log(err))
    getChart('hot-100', dateFormatted, (err, ch) => {
      if (err) console.log(err)
      setChart(ch)
    })
  },[date, dateFormatted])
  
  
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Header toggleDarkMode={toggleDarkMode}/>
        <Dropdowns date = {date} setDate = {setDate}/>
        <SongSearch filter={filter} setFilter = {setFilter}/>
        <h2>
          Top songs for week of {dateFormatted}
        </h2>
        {chart && <SongList filter={filter} chart = {chart}/>}
      </div>
    </ThemeProvider>
    
  );
}

export default App;
