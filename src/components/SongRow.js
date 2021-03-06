import React from "react"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
      width: "70%",
      height: "105px",
      borderRadius: "9px",
      marginTop: "-25px",
      marginBottom: "-37px",
      [theme.breakpoints.down('sm')]: {
          width: "95%"
      }
    }
  }))


const SongRow = ({isLoaded, song, handleCheck, isChecked, darkMode}) => {
    const classes = useStyles()
    return (
    !isLoaded ? 
    <span><Skeleton animation="wave" className={classes.root}/></span> 
    : (
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
                            <Tooltip title={isChecked[String(song.rank)] ? "Remove from playlist" : "Add to playlist"}>
                                <Checkbox
                                    checked={!!isChecked[String(song.rank)]}
                                    onChange={(e)=>handleCheck(e, false)}
                                    name={String(song.rank)}
                                    color="primary"
                                />
                            </Tooltip>}
                    />
             
            </div>
            
            
        </div>
    )
    )
}

export default SongRow
