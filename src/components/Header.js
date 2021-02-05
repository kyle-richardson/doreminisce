import React, {useState, useEffect} from "react"
import Brightness4Icon from '@material-ui/icons/Brightness4';

const Header = ({toggleDarkMode})=> {

  useEffect(()=> {
  },[])

    return (
        <div>
            <h1>Do-Re-Minisce</h1>
            <div style={{ position: "absolute", top: "4%", right: "5%", cursor: "pointer" }} onClick={toggleDarkMode}>
                <Brightness4Icon />
            </div>
            <p className="about-text">Ever wanted to jump in a time machine and reminisce on the music of the past? Look no further.  Simply select a date, and click on a song to play it on Youtube.  Additionally, you can connect to Spotify and create a playlist of the Hot 100 of the date chosen. Enjoy!</p>
        </div>
    )
}

export default Header;
