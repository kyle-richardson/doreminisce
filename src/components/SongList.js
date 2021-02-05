import React, {useState, useEffect} from "react"
import SongRow from "./SongRow"
import CircularProgress from '@material-ui/core/CircularProgress';

const SongList = ({filter, chart, dateFormatted})=> {
    // const maxOnPage = 25
    const [isLoading, setIsLoading] = useState(true)
    const [filteredChart, setFilteredChart] = useState(chart)

    useEffect(()=> {
        setIsLoading(true)
        if (chart) {
            const newChart = chart.songs.filter(ele=> 
                ele.title.toLowerCase().includes(filter.toLowerCase()) || 
                ele.artist.toLowerCase().includes(filter.toLowerCase()))
            setFilteredChart(newChart)
        }
        setIsLoading(false)
    },[filter, chart])
    
    return isLoading ? <div style={{textAlign: "center"}}><CircularProgress color="secondary" /></div> : (
        <>
        <h3>
          Top songs for week of {dateFormatted}
        </h3>
        <div className="list-container-fallback">
            {filteredChart.map((song, ind) => (
                <SongRow key = {ind} song={song}/>
            ))}
        </div>
        </>
        
    )
}

export default SongList;
