import React, {useState, useEffect} from "react"
import axios from "axios"
// import {extractSongData} from "../utils/functions"

const SongList = ({chart})=> {
    const [videoList, setVideoList] = useState([])
    const maxOnPage = 25
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=> {
        setIsLoading(true)
        for (let x=0;x<=maxOnPage;x++){
            axios.get(`${process.env.REACT_APP_YOUTUBE_API_BASE_URL}?part=snippet&filters=0&q=${chart.songs[x].title},${chart.songs[x].artist}&type=video&videoEmbeddable=true&maxResults=1&key=${process.env.REACT_APP_API_KEY}`)
            .then(res => {
                console.log(res.data)
                setVideoList(prev => [...prev,res.data.items[0].id.videoId])
            })
            .catch(err=> {
                console.log(err)
                setIsLoading(false)
            })
        }
        setIsLoading(false)
    },[chart])
    
    return isLoading ? <p style={{textAlign: "center"}}>"Loading Data..."</p> : (
        <div className={videoList.length > 0 ? "list-container" : "list-container-fallback"}>
            {chart["songs"].map((song, ind) => {
                return videoList[ind] ? (
                    ind <=maxOnPage && (
                        <div key={song.title}>
                            <iframe title={song.title} class="ytplayer" type="text/html" width="250" height="250"
                                src={`https://www.youtube.com/embed/${videoList[ind]}?autoplay=0`}
                                frameBorder="0"></iframe>
                            <a href={`https://www.youtube.com/watch?v=${videoList[ind]}`}>{`${ind+1}. ${song.title}`}</a>
                        </div>
                    )
                ) :  <a href={`https://www.youtube.com/results?search_query=${song.title} ${song.artist}`}>{`${ind+1}. ${song.title} - ${song.artist}`}</a>
            })
        }
        </div>
    )
}

export default SongList;
