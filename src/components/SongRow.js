import React from "react"

const SongRow = ({song}) => {
    return (
        <div className="song-card" onClick={()=>window.open(`https://www.youtube.com/results?search_query=${song.title} ${song.artist}`)}>
            <p style={{minWidth: "35px", marginRight: "15px"}}>{song.rank}</p>
            <div style={{width: "60px"}}>
                <img alt={song.title} src={song.cover} width="60px" height="60px" style={{borderRadius: "8px"}}/>   
            </div>
            <div style={{marginLeft: "30px"}}>
                <p>{song.title}</p>
                <p style={{opacity: ".6"}}>{song.artist}</p>
            </div>
            
        </div>
    )
}

export default SongRow
