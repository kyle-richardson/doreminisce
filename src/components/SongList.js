import React, {useState, useEffect} from "react"
import SongRow from "./SongRow"
// import axios from "axios"

const SongList = ({filter, chart})=> {
    const [videoList, setVideoList] = useState([])
    // const [songIDs, setSongIDs] = useState([])
    // const maxOnPage = 25
    const [isLoading, setIsLoading] = useState(true)
    const [filteredChart, setFilteredChart] = useState(chart)
    // const makePlaylist = async () => {
    //     try {
    //         for (let song in chart.songs) {
    //             const res = await axios.get(`${process.env.REACT_APP_YOUTUBE_API_BASE_URL}?part=snippet&filters=0&q=${song.title},${song.artist}&type=video&videoEmbeddable=true&maxResults=1&key=${process.env.REACT_APP_API_KEY}`)
    //             setSongIDs(prev => [...prev, res.data.items[0].id.videoId])
    //         }
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    //     window.open(`http://www.youtube.com/watch_videos?video_ids=${songIDs.join()}`)
    // }
    // useEffect(()=> {
    //     setIsLoading(true)
    //     for (let x=0;x<=maxOnPage;x++){
    //         axios.get(`${process.env.REACT_APP_YOUTUBE_API_BASE_URL}?part=snippet&filters=0&q=${chart.songs[x].title},${chart.songs[x].artist}&type=video&videoEmbeddable=true&maxResults=1&key=${process.env.REACT_APP_API_KEY}`)
    //         .then(res => {
    //             console.log(res.data)
    //             setVideoList(prev => [...prev,res.data.items[0].id.videoId])
    //         })
    //         .catch(err=> {
    //             console.log(err)
    //             setIsLoading(false)
    //         })
    //     }
    //     setIsLoading(false)
    // },[chart])

    useEffect(()=> {
        setIsLoading(true)
        if (chart) {
            const newChart = chart["songs"].filter(ele=> 
                ele.title.toLowerCase().includes(filter.toLowerCase()) || 
                ele.artist.toLowerCase().includes(filter.toLowerCase()))
            setFilteredChart(newChart)
        }
        setIsLoading(false)
    },[filter, chart])
    
    return isLoading ? <p style={{textAlign: "center"}}>"Loading Songs..."</p> : (

        <>
        {/* <div>
            <button onClick={makePlaylist}>Create Youtube Playlist</button>
        </div> */}
        <div className={videoList.length > 0 ? "list-container" : "list-container-fallback"}>
            {/* following code is for embed youtube video, which quickly hits free use youtube api limits.  For now, just using search queries, which is free */}
            {/* {chart["songs"].map((song, ind) => {
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
            }*/}
            {filteredChart.map((song, ind) => (
                <SongRow key = {ind} song={song} ind={ind}/>
            ))}
        </div>
        </>
        
    )
}

export default SongList;
