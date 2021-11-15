import React from 'react'
import "../styles/Play.css"
import HomeButton from '../components/HomeButton'
import ButtonLink from '../components/ButtonLink'

export default function Play() {
    return (
        <div className="play-wrapper">
        
            <HomeButton className="home" name="home">Home</HomeButton>
            <ButtonLink className="logout" name="logout">Logout</ButtonLink>
            <div className="grid-1"></div>
            <div className="grid-2"></div>
            <div className="grid-3"></div>
        </div>
    )
}
