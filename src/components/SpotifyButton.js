import React from "react"
import Button from "@material-ui/core/Button"
import {GrSpotify} from "react-icons/gr"
        
const SpotifyButton = ({spotifyConnect, handleCreatePlaylist, handleSpotifyConnect}) => {

    return (
    <div className="spotify-button-fixed">
      {/* <p style={{marginBottom: "5px"}}>{spotifyConnect ? "Successfully connected to Spotify" : "To create a playlist, connect to spotify below:"}</p> */}
        <Button variant="contained" color="secondary" onClick={spotifyConnect ? handleCreatePlaylist : handleSpotifyConnect}>
            <GrSpotify size="2em"/> 
            <span style={{paddingLeft: "5px"}}>{spotifyConnect ? "Create Playlist" : "Connect to Spotify"}</span>
        </Button>
    </div> 
    )
    
}       
        
export default SpotifyButton