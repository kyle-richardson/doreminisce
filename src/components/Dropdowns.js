import React, {useState, useEffect} from "react"
import Select from "@material-ui/core/Select"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Button from "@material-ui/core/Button"
import moment from "moment"
import {getYears, getMonths, getDays, generateCheckedObjects} from "../utils/functions"

const Dropdowns = ({date, setDate, setIsChecked, setAllChecked})=> {
  let years = getYears(1950)
  let months = getMonths()
  const [localDate, setLocalDate] = useState(date)
  const [revertToday, setRevertToday] = useState(false)
  let days = getDays(localDate.year, localDate.month)


  useEffect(()=> {
    if(revertToday){
      setLocalDate({
        year: moment().format('YYYY'),
        month: moment().format('MM'),
        day: moment().format('DD')
      })
      setDate({
        year: moment().format('YYYY'),
        month: moment().format('MM'),
        day: moment().format('DD')
      })
      setRevertToday(false)
    }
  },[revertToday, setDate])

  const handleSubmit = (event) => {
    event.preventDefault()
    const dateSelected = `${localDate.year}-${localDate.month}-${localDate.day}`
    if (localDate.year=== "" || localDate.month==="" || localDate.day === "") {
      setRevertToday(true)
    } 
    else 
    if (moment(dateSelected).isAfter()) {
      setRevertToday(true)
    }
    else {
      setDate({
        year: localDate.year,
        month: localDate.month,
        day: localDate.day
      })
    }
    setIsChecked(generateCheckedObjects(true))
    setAllChecked(false)
      
    
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
            value={String(localDate.year)}
            // defaultValue={""}
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
            // defaultValue={""}
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
            value={String(localDate.day)}
            // defaultValue={""}
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
        <Button variant="contained" color="primary" type="submit">Update</Button>
      </form>
    </div>
  );
}

export default Dropdowns;
