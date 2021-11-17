import React from 'react'
import "../styles/lobby.css"
import { useParams } from 'react-router'
export default function Lobby() {

    const params=useParams()
    
    return (
        
        <div className="lobby-wrapper">
            <div className="lobby-header">hello {params.name}</div>
            <div className="lobby-grid-1"></div>
            <div className="lobby-grid-2">VS</div>
            <div className="lobby-grid-3"></div>
            <div id="star">Start-Game</div>
            
        </div>
    )
}
