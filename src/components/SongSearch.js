import React, {useEffect} from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CloseIcon from '@material-ui/icons/Close';

const SongSearch = ({filter, setFilter})=> {
  const handleChange = (event) => {
    event.preventDefault()
    const {value} = event.target
    setFilter(value)
  }
  const handleClear = (event) => {
    event.preventDefault()
    setFilter("")
  }

  useEffect(()=> {
  },[])

    return (
        <div className="searchbox-container" >
            <TextField 
              fullWidth
              value={filter}
              label="Search List"
              variant="outlined"
              onChange={handleChange}
            />
            <div style={{position:"relative", left: "-65px", maxWidth: "0px"}}>
              <Button color="primary" onClick={handleClear}>
                <CloseIcon/>
              </Button>
            </div>
        </div>
    )
}

export default SongSearch;
