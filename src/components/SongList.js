import React, {useState, useEffect} from "react"
import SongRow from "./SongRow"
import moment from "moment"
import CircularProgress from '@material-ui/core/CircularProgress';
import {generateCheckedObjects} from "../utils/functions"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip'

const SongList = ({
    filter, 
    chart, 
    dateFormatted, 
    darkMode, 
    setFilteredChart, 
    filteredChart, 
    isChecked, 
    setIsChecked, 
    allChecked, 
    setAllChecked
    })=> {
    // const maxOnPage = 25
    const date = moment(dateFormatted).format("MMM DD, YYYY")
    const [isLoading, setIsLoading] = useState(true)
    const handleCheck = (e, isAll=false) => {
        if(isAll) {
            filteredChart.forEach(song => {
                setIsChecked(prev =>({
                    ...prev, 
                    [song.rank]: e.target.checked
                }))
            })
            setAllChecked(e.target.checked)
        }
        else {
            const {name} = e.target
            setIsChecked(prev =>({
                ...prev, 
                [name]: !isChecked[name]
            }))
        } 
        

    }

   


    useEffect(()=> {
        setIsLoading(true)
        if (chart) {
            const newChart = chart.songs.filter(ele=> 
                ele.title.toLowerCase().includes(filter.toLowerCase()) || 
                ele.artist.toLowerCase().includes(filter.toLowerCase()))
            setFilteredChart(newChart)
            setIsLoading(false)

        }
        // eslint-disable-next-line
    },[filter, chart])

    // useEffect(()=> {
    //     if(filteredChart) {
    //         const checkForAllChecked = ()=> {
    //             filteredChart.forEach(song=>{
    //                 if(!isChecked[song.rank]) return false
    //             })
    //             return true
    //         }
    
    //         setAllChecked(checkForAllChecked())
    //     }
        
    // }, [filteredChart, isChecked])
    
    return isLoading ? <div style={{textAlign: "center", marginTop: "15vh"}}><CircularProgress color="secondary" /></div> : (
        <>
        
        <div className="list-container-fallback">
        <div className="list-title">
            <h3 className="date">
                {date}
            </h3>
            <div>
                <div className="all-button">
                    
                        <FormControlLabel
                            control={
                                <Tooltip title={`${allChecked ? "Deselect" : "Select"} all${filter && " filtered"}`}>
                                    <Checkbox
                                        checked={allChecked}
                                        onChange={(e)=>handleCheck(e, true)}
                                        name={"check all"}
                                        color="primary"
                                    />
                                </Tooltip>
                            }
                            // label={filter ? "Select all (filtered)" : "Select all"}
                        />
                    
                </div>
            </div>
        </div>
            {filteredChart && filteredChart.map((song, ind) => (
                <SongRow 
                    key = {ind} 
                    song={song} 
                    allChecked = {allChecked} 
                    isChecked={isChecked} 
                    handleCheck={handleCheck}
                    darkMode= {darkMode}
                />
            ))}
        </div>
        </>
        
    )
}

export default SongList;
