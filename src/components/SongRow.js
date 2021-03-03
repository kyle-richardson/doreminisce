import React from "react"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip'

const SongRow = ({song, handleCheck, allChecked, isChecked, darkMode}) => {
    return (
        <div className="song-card" style={{background: `${darkMode ? "rgb(51,51,51)" : "rgb(228,228,228)"}`}} >
            <div className="song-card-left" onClick={()=>window.open(`https://www.youtube.com/results?search_query=${song.title} ${song.artist}`)}>
                <p style={{minWidth: "35px", marginRight: "15px"}}>{song.rank}</p>
                <div style={{width: "60px"}}>
                    <img alt={song.title} src={song.cover} width="60px" height="60px" style={{borderRadius: "8px"}}/>   
                </div>
                <div style={{marginLeft: "30px"}}>
                    <p>{song.title}</p>
                    <p style={{opacity: ".6"}}>{song.artist}</p>
                </div>
            </div>
            <div className="song-card-right">
                
                    <FormControlLabel
                        control={
                            <Tooltip title="Add to playlist">
                                <Checkbox
                                    checked={isChecked[String(song.rank)]}
                                    onChange={(e)=>handleCheck(e, false)}
                                    name={String(song.rank)}
                                    color="primary"
                                />
                            </Tooltip>}
                    />
             
            </div>
            
            
        </div>
    )
}

export default SongRow
