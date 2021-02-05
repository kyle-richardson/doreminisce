import React from "react"

const SongRow = ({song}) => {
    return (
        <div className="song-card" onClick={()=>window.open(`https://www.youtube.com/results?search_query=${song.title} ${song.artist}`)}>
            <img alt={song.title} src={song.cover} width="60px" height="60px" style={{borderRadius: "8px"}}/>
            <p>{`${song.rank}. ${song.title} - ${song.artist}`}</p>
            
        </div>
    )
}

export default SongRow
