import React, {useState, useEffect} from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

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
        <div style={{display: "flex", justifyContent: "center", marginTop: "15px", marginBottom: "15px"}}>
          {/* <p>Search List:</p> */}
            <TextField 
              value={filter}
              label="Search List"
              variant="outlined"
              onChange={handleChange}
            />
            <Button color="primary" onClick={handleClear}>x</Button>
        </div>
    )
}

export default SongSearch;
