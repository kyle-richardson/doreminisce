import React, {useState, useEffect} from "react"
import axios from "axios"
// import {extractSongData} from "../utils/functions"

const SongList = ({chart})=> {
    const [videoList, setVideoList] = useState([])
    const maxOnPage = 25
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=> {
        setIsLoading(true)
        for (let x=0;x<=maxOnPage;x++){
            axios.get(`${process.env.REACT_APP_YOUTUBE_API_BASE_URL}?part=snippet&filters=0&q=${chart.songs[x].title},${chart.songs[x].artist}&type=video&videoEmbeddable=true&maxResults=1&key=${process.env.REACT_APP_API_KEY}`)
            .then(res => {
                console.log(res.data)
                setVideoList(prev => [...prev,res.data.items[0].id.videoID])
            })
            .catch(err=> {
                console.log(err)
            })
        }
        setIsLoading(false)
    },[chart])
    
    return isLoading ? <p>"..."</p> : (
        <div className="list-container">
            {chart["songs"].map((ele, ind) => {
                return (
                    ind <=25 && (
                        <div>
                            <iframe id="ytplayer" type="text/html" width="250" height="250"
                                src={`https://www.youtube.com/embed/${videoList[ind]}?autoplay=0`}
                                frameBorder="0"></iframe>
                            <p key={ele.title}>{`${ind+1}. ${ele.title}`}</p>
                        </div>
                )
                
                )
            })
        }
        </div>
    )
}

export default SongList;
