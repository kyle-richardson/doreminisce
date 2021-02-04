import React, {useState, useEffect} from "react"
import Select from "@material-ui/core/Select"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Button from "@material-ui/core/Button"
import {getYears, getMonths, getDays} from "../utils/functions"

const Dropdowns = ({date, setDate})=> {
  let years = getYears(1950)
  let months = getMonths()
  let [localDate, setLocalDate] = useState(date)
  let days = getDays(localDate.year, localDate.month)
  useEffect(()=> {
  },[])

  const handleSubmit = (event) => {
    event.preventDefault()
    setDate({
      year: localDate.year,
      month: localDate.month,
      day: localDate.day
    })
  }
  const handleChange = (event) => {
    event.preventDefault()
    const {name, value} = event.target
    setLocalDate(prev=> ({
      ...prev, 
      [name]: [value]
    }))
  }
  return (
    <div>
      <form className="dropdown-container" onSubmit = {handleSubmit}>
        <FormControl className="dropdown" variant="filled">
          <InputLabel htmlFor="year">Year</InputLabel>
          <Select
            className="dropdown"
            native
            value={localDate.year}
            onChange={handleChange}
            inputProps={{
              name: 'year',
              id: 'year-select',
            }}
          >
            <option aria-label="None" value="" />
            {years && years.map(ele => <option key={ele} value={ele}>{ele}</option>)}
          </Select>
        </FormControl>
        <FormControl variant="filled">
          <InputLabel htmlFor="month">Month</InputLabel>
          <Select
            className="dropdown"
            native
            value={String(localDate.month)}
            onChange={handleChange}
            inputProps={{
              name: 'month',
              id: 'month-select',
            }}
          >
            <option aria-label="None" value="" />
            {months && months.map(ele => <option key={ele} value={ele}>{ele}</option>)}
          </Select>
        </FormControl>
        <FormControl className="dropdown" variant="filled">
          <InputLabel htmlFor="day">Day</InputLabel>
          <Select
            className="dropdown"
            native
            value={localDate.day}
            onChange={handleChange}
            inputProps={{
              name: 'day',
              id: 'day-select',
            }}
          >
            <option aria-label="None" value="" />
            {days && days.map(ele => <option key={ele} value={ele}>{ele}</option>)}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">Update List</Button>
      </form>
    </div>
  );
}

export default Dropdowns;
