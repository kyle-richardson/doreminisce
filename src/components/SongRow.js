import React from "react"

const SongRow = ({song}) => {
    return (
        <div className="song-card" onClick={()=>window.open(`https://www.youtube.com/results?search_query=${song.title} ${song.artist}`)}>
            <img alt={song.title} src={song.cover} width="60px" height="60px" style={{borderRadius: "8px"}}/>
            {/* <a 
                href={`https://www.youtube.com/results?search_query=${song.title} ${song.artist}`} 
                target="_blank" 
                rel="noreferrer"
            > */}
            <p>{`${song.rank}. ${song.title} - ${song.artist}`}</p>
                
            {/* </a> */}
            
        </div>
    )
}

export default SongRow
