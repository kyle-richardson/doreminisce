
import React, {useState, useEffect} from "react"
import moment from "moment"
import axios from "axios"
// import {getChart} from "billboard-top-100"
import Dropdowns from "./components/Dropdowns"
import SongList from "./components/SongList"
import SongSearch from "./components/SongSearch"
import Header from "./components/Header"
import { useDarkMode } from "./utils/useDarkMode"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocalStorage } from "./utils/useLocalStorage";
import Button from "@material-ui/core/Button"


function App() {

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let queries = params.get('query');
  console.log(queries)
  const [darkMode, setDarkMode] = useDarkMode();
  const [isFetching, setIsFetching] = useState(true)
  const paletteType = darkMode ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: paletteType,
    }
  });
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [date, setDate] = useLocalStorage('date', {
    year: moment().format("YYYY"),
    month: moment().format('MM'),
    day: moment().format('DD')
  })
  const [chart, setChart] = useState(null)
  const [filter, setFilter] = useState("")
  const dateFormatted = `${date.year}-${date.month}-${date.day}`

  const handleSpotifyConnect = async () => {
    await axios.get('https://accounts.spotify.com/authorize', {
      params: {
        client_id: `${process.env.REACT_APP_CLIENT_ID}`,
        response_type: 'token',
        redirect_uri: 'https://doreminisce.kylerichardson.tech'
      }
    })
    .then(res=> {
      console.log(res)

    })
    .catch(err=> {
      console.log(err)
    })
  }
  // const options = {
  //   method: 'GET',
  //   url: 'https://billboard-api2.p.rapidapi.com/hot-100',
  //   params: {date: dateFormatted, range: '1-100'},
  //   headers: {
  //     'x-rapidapi-key': `${process.env.REACT_APP_TOP100_API_KEY}`,
  //     'x-rapidapi-host': 'billboard-api2.p.rapidapi.com'
  //   }
  // };

  // const options = {
  //   method: 'GET',
  //   url: `https://www.billboard.com:80/charts/hot-100/${dateFormatted}`,
  //   headers: {
  //     'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
  //   }
  // };

  
  useEffect(()=> {
    
    async function fetchChart() {
      setIsFetching(true)
      await axios.get(`${process.env.REACT_APP_BILLBOARD_API_BASE_URL}/chart/${dateFormatted}`)
      .then(res=> {
        setChart(res.data)
      })
      .catch(err => {console.log(err)})
      setIsFetching(false)
    }
    // axios.request(options)
    // .then(res=> {
    //   console.log(res.data)
    //   setChart(res.data)
    // })
    // .catch(err=> console.log(err))

    // axios.request(options)
    // .then(res=> {
    //   console.log(res.data)
    //   setChart(res.data)
    // })
    // .catch(err=> console.log(err))
    // getChart('hot-100', dateFormatted, (err, ch) => {
    //   if (err) console.log(err)
    //   setChart(ch)
    // })
    fetchChart()
    
  },[date, dateFormatted])
  
  
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Header toggleDarkMode={toggleDarkMode}/>
        <Dropdowns date = {date} setDate = {setDate}/>
        <SongSearch filter={filter} setFilter = {setFilter}/>
        <h3>
          Top songs for week of {dateFormatted}
        </h3>
        
        {chart && !isFetching ? (
        <>
          <p>To create a playlist, connect to spotify below:</p>
          <Button variant="contained" onClick={handleSpotifyConnect}>Connect to Spotify</Button>
          <SongList filter={filter} chart = {chart}/>
        </>) 
        : <div><CircularProgress/></div>
        }
      </div>
    </ThemeProvider>
    
  );
}

export default App;
