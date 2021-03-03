import React, {useEffect} from "react"
import Brightness4Icon from '@material-ui/icons/Brightness4';
import About from "./About"

const Header = ({toggleDarkMode})=> {

  useEffect(()=> {
  },[])

    return (
        <div>
            <div style={{display:"flex", justifyContent:"center", alignItems: "center", marginTop: "30px"}}>
                <h1 style={{marginRight: "15px"}}>Do-Re-Minisce</h1>
                <About/>
            </div>
            <div style={{ position: "absolute", top: "20px", right: "20px", cursor: "pointer" }} onClick={toggleDarkMode}>
                <Brightness4Icon />
            </div>
           
        </div>
    )
}

export default Header;
