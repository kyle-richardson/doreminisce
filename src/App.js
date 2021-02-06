
import React, {useState, useEffect} from "react"
import moment from "moment"
import axios from "axios"
import Dropdowns from "./components/Dropdowns"
import SongList from "./components/SongList"
import SongSearch from "./components/SongSearch"
import PopupModal from "./components/PopupModal"
import Footer from "./components/Footer"
import Header from "./components/Header"
import SpotifyButton from "./components/SpotifyButton"
import { useDarkMode } from "./utils/useDarkMode"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocalStorage } from "./utils/useLocalStorage";
import queryString from 'query-string'


function App() {
  // const parsed = queryString.parse(window.location.search)
  // const [accessToken, setAccessToken] = useLocalStorage('access_token', parsed.access_token)
  const [accessToken, setAccessToken] = useState("")
  const [spotifyConnect, setSpotifyConnect] = useState(false)
  const [darkMode, setDarkMode] = useDarkMode();
  const [isFetching, setIsFetching] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [playlistURL, setPlaylistURL] = useState("")
  const [failedPlaylistCreate, setFailedPlaylistCreate] = useState(false)
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false)
  const paletteType = darkMode ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: paletteType,
      secondary: {
        main: "rgb(17, 185, 91)"
      }
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
  const [filter, setFilter] = useLocalStorage('filter', "")
  const [userId, setUserId] = useState("")
  const [notFoundList, setNotFoundList] = useState([])
  const dateFormatted = `${date.year}-${date.month}-${date.day}`

  const handleSpotifyConnect = async () => {
    window.open(`${process.env.REACT_APP_BILLBOARD_API_BASE_URL || 'http://localhost:5500' }/auth-spotify`, '_self');
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  useEffect(()=> {
    if(!openModal) {
      setFailedPlaylistCreate(false)
      setNotFoundList([])
    }
  },[openModal])

  const handleCreatePlaylist = async () => {
    setIsCreatingPlaylist(true)
    try {
      const newPlaylist = await axios({
        url: `https://api.spotify.com/v1/users/${userId}/playlists`,
        method: 'POST',
        headers: {
          'Authorization': "Bearer " + accessToken,
          'Content-Type': 'application/json'
        },
        data: {
          name: `Hot 100 from ${dateFormatted}`,
          public: true,
          description: 'created using Do-Re-Minisce (doreminisce.kylerichardson.tech)'
        }
      })
      const playlistId = newPlaylist.data.id
      const tracksToAdd = await findTracksOnSpotify()
      const tracksToAddFilteredNotFound = tracksToAdd.filter(track=> !track.includes("NOTFOUND"))
      const addedTracks = await axios({
          url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          method: 'POST',
          headers: {
            'Authorization': "Bearer " + accessToken,
            'Content-Type': 'application/json'
          },
          data: {
            "uris": tracksToAddFilteredNotFound
          }
      })
      setPlaylistURL(newPlaylist.data.external_urls.spotify)
    
    } catch(err) {
      console.log(err)
      setFailedPlaylistCreate(true) 
    }
    handleOpenModal()
    setIsCreatingPlaylist(false)
  }

  const findTracksOnSpotify = async () => {
    try {
      const searchAccessToken = await axios({
        url: `${process.env.REACT_APP_BILLBOARD_API_BASE_URL || 'http://localhost:5500' }/auth-search`,
        method: 'GET'
      })
      const trackList = await Promise.all(chart.songs.map(async song=> {
        let songId="NOTFOUND"
        let simplifiedArtistSearch = song.artist.split(" ")[0]
        if (simplifiedArtistSearch.toLowerCase()==="the" || simplifiedArtistSearch.toLowerCase()==="a") {
          simplifiedArtistSearch = song.artist.split(" ")[1]
        }
        try {
          const result = await axios({
          url: 'https://api.spotify.com/v1/search',
          method: 'GET',
          headers: {
            'Authorization': "Bearer " + searchAccessToken.data,
            'Content-Type': 'application/json'
          },
          params: {
            q: `${song.title} ${simplifiedArtistSearch}`,
            type: "track",
            limit: 1
          }
        })
        if (result.data.tracks.items)
          songId = result.data.tracks.items[0].id
        } catch(err ) {
          // console.log(err)
          setNotFoundList(prev => [...prev, song])
        }
        return `spotify:track:${songId}`
      }))
      return trackList
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=> {
    const parsed = queryString.parse(window.location.search)
    if (parsed.access_token) {
      // if (parsed) {
      //     setAccessToken(parsed.access_token)
      //    window.open(`${process.env.REACT_APP_URL || 'http://localhost:3000'}`, '_self')
      // }
      setSpotifyConnect(true)
      axios.get("https://api.spotify.com/v1/me", {
        headers: {
          "Authorization": "Bearer " + parsed.access_token
        }
      })
      .then(res=> {
        setUserId(res.data.id)
        setAccessToken(parsed.access_token)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [])

  
  useEffect(()=> {
    async function fetchChart() {
      setIsFetching(true)
      await axios.get(`${process.env.REACT_APP_BILLBOARD_API_BASE_URL || 'http://localhost:5500' }/chart/${dateFormatted}`)
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
        <PopupModal 
          failedPlaylistCreate = {failedPlaylistCreate} 
          openModal = {openModal} 
          notFoundList = {notFoundList} 
          handleCloseModal = {handleCloseModal}
          playlistURL = {playlistURL}
        />
        <Header toggleDarkMode={toggleDarkMode}/>
        <Dropdowns date = {date} setDate = {setDate}/>
        <SongSearch filter={filter} setFilter = {setFilter}/>
        {isFetching ?  <CircularProgress color="secondary"/> : 
        <>
          <SpotifyButton 
              spotifyConnect = {spotifyConnect}
              handleCreatePlaylist={handleCreatePlaylist}
              handleSpotifyConnect={handleSpotifyConnect}
              isCreatingPlaylist = {isCreatingPlaylist}/>
          <SongList filter={filter} chart = {chart} dateFormatted = {dateFormatted}/>
          </>}
      </div>
      <Footer/>
    </ThemeProvider>
    
  );
}

export default App;
