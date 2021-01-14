import React, {useState, useEffect} from "react"
import logo from './logo.svg';
import './App.css';
import moment from "moment"
import {getChart} from "billboard-top-100"
import Dropdowns from "./components/Dropdowns"

function App() {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
  const [chart, setChart] = useState(null)

  useEffect(()=> {
    getChart('hot-100', date, (err, ch) => {
      if (err) console.log(err)
      setChart(ch)
    })
  },[date])
  
  // getChart('hot-100', '2016-08-27', (err, chart) => {
  //   if (err) console.log(err);
  //   console.log(chart.week) // prints the week of the chart in the date format YYYY-MM-DD
  //   console.log(chart.previousWeek.url) // prints the URL of the previous week's chart
  //   console.log(chart.previousWeek.date) // prints the date of the previous week's chart in the date format YYYY-MM-DD
  //   console.log(chart.nextWeek.url) // prints the URL of the next week's chart
  //   console.log(chart.nextWeek.date) // prints the date of the next week's chart in the date format YYYY-MM-DD
  //   console.log(chart.songs); // prints array of top 100 songs for week of August 27, 2016
  //   console.log(chart.songs[3]); // prints song with rank: 4 for week of August 27, 2016
  //   console.log(chart.songs[0].title); // prints title of top song for week of August 27, 2016
  //   console.log(chart.songs[0].artist); // prints artist of top songs for week of August 27, 2016
  //   console.log(chart.songs[0].rank) // prints rank of top song (1) for week of August 27, 2016
  //   console.log(chart.songs[0].cover) // prints URL for Billboard cover image of top song for week of August 27, 2016
  // })
  return (
    <div className="App">
      <h1>
        Do-Re-Minisce
      </h1>
      <Dropdowns date = {date} setDate = {setDate}/>
      <h2>
        Top 100 for week of {date}
      </h2>
      {chart && chart["songs"].map((ele, ind) => {
        console.log(ele)
        return (
          <p key={ele.title}>{`${ind+1}. ${ele.title}`}</p>
        )
       
      })}
    </div>
  );
}

export default App;
