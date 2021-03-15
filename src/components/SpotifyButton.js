import React from "react"
// import Button from "@material-ui/core/Button"
import {GrSpotify} from "react-icons/gr"
import CircularProgress from "@material-ui/core/CircularProgress"
import Tooltip from "@material-ui/core/Tooltip"
import MuiButton from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const Button = withStyles({
  root: {
    "&.Mui-disabled": {
      pointerEvents: "auto"
    }
  }
})(MuiButton);

const ButtonWithTooltip = ({ tooltipText, disabled, onClick, ...other }) => {
  const adjustedButtonProps = {
    disabled: disabled,
    component: disabled ? "div" : undefined,
    onClick: disabled ? undefined : onClick
  };
  return (
    <Tooltip title={tooltipText}>
      <Button {...other} {...adjustedButtonProps} />
    </Tooltip>
  );
};
        
const SpotifyButton = ({isCreatingPlaylist, spotifyConnect, handleCreatePlaylist, handleSpotifyConnect, isChecked}) => {

    const checkIfAnyChecked = (obj) => {
        for (const songBool in obj) {
            if (obj[songBool]) {
                return true
            }
        }
        return false
    }

    return (
    <div className="spotify-button-fixed">
      {/* <p style={{marginBottom: "5px"}}>{spotifyConnect ? "Successfully connected to Spotify" : "To create a playlist, connect to spotify below:"}</p> */}
         <ButtonWithTooltip
            variant="contained" 
            color="secondary"
            tooltipText= {checkIfAnyChecked(isChecked) ? "" : "No songs checked"}
            onClick={spotifyConnect ? handleCreatePlaylist : handleSpotifyConnect}
            disabled={!checkIfAnyChecked(isChecked)}
        >
            {isCreatingPlaylist ? <CircularProgress size={30}/> : <GrSpotify size="2em"/> }
            <span style={{paddingLeft: "5px"}}>{spotifyConnect ? "Create Playlist" : "Connect to Spotify"}</span>
        </ButtonWithTooltip>
       
    </div> 
    )
    
}       
        
export default SpotifyButton