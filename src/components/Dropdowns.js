import React, {useState, useEffect} from "react"
import Select from "@material-ui/core/Select"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import {getYears, getMonths, getDays} from "../utils/functions"

const Dropdowns = ({date, setDate})=> {
  let years = getYears(1970)
  let months = getMonths()
  let days = getDays(date.year, date.month)
  useEffect(()=> {
    // years = getYears(1970)
  },[])

  const handleChange = (event) => {
    event.preventDefault()
    const {name, value} = event.target
    setDate(prev=> ({
      ...prev, 
      [name]: [value]
    }))
  }
  return (
    <div className="dropdown-container">
      <FormControl>
        <InputLabel htmlFor="year">Year</InputLabel>
        <Select
          native
          value={date.year}
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
      <FormControl>
        <InputLabel htmlFor="month">Month</InputLabel>
        <Select
          native
          value={String(date.month)}
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
      <FormControl>
        <InputLabel htmlFor="day">Day</InputLabel>
        <Select
          native
          value={date.day}
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
    </div>
  );
}

export default Dropdowns;
