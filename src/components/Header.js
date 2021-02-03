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
        </div>
    )
}

export default Header;
