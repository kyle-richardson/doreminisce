
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

import queryString from 'query-string'


function App() {
  const parsed = queryString.parse(window.location.search)
  const [accessToken, setAccessToken] = useLocalStorage('access_token', parsed.access_token)
  const [spotifyConnect, setSpotifyConnect] = useState(false)
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
    window.open(`${process.env.REACT_APP_BILLBOARD_API_BASE_URL}/auth-spotify`, '_self');
  }

  const handleCreatePlaylist = () => {

  }

  useEffect(()=> {
    if (accessToken) {
      if (parsed) {
        // setAccessToken(parsed.access_token)
        // window.open(`${process.env.REACT_APP_URL || 'http://localhost:3000'}`, '_self')
      }
      setSpotifyConnect(true)
      axios.get("https://api.spotify.com/v1/me", {
        headers: {
          "Authorization": "Bearer " + accessToken
        }
      })
      .then(res=> {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [accessToken])

  
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
          {!spotifyConnect ? 
          <div style={{marginBottom: "10px"}}>
            <p>To create a playlist, connect to spotify below:</p>
            <Button variant="contained" onClick={handleSpotifyConnect}>Connect to Spotify</Button>
          </div> : 
          <div style={{marginBottom: "10px"}}>
            <p>Successfully connected to Spotify</p>
            <Button variant="contained" onClick={handleCreatePlaylist}>Create a Playlist</Button>
          </div>}
          <SongList filter={filter} chart = {chart}/>
        </>) 
        : <div><CircularProgress/></div>
        }
      </div>
    </ThemeProvider>
    
  );
}

export default App;
