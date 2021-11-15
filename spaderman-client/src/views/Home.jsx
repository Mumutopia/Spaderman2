import React from 'react'
import "../styles/Home.css"
import ButtonLink from '../components/ButtonLink'

export default function Home() {
    return (
        <div className="home-wrapper">
            <header className="header-home">Welcome Name</header>
            <ButtonLink className="logout" name="logout">Logout</ButtonLink>
            <img className="avatar-home" src="/img/blue-shovel4.png" alt="avatar" />
            <ButtonLink className="grid-1" name="play">Play</ButtonLink>
            <ButtonLink className="grid-2" name="leaderBoard">LeaderBoard</ButtonLink>
            <ButtonLink  className="grid-3" name="howtoplay">How To Play</ButtonLink>
        </div>
    )
}
