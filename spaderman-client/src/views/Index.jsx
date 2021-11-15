import React from 'react'
import "../styles/Index.css"
import MainTitle from '../components/MainTitle'

export default function Index() {
    return (
        <div>
           <div className="index-wrapper" >
        <header >
        
        <MainTitle/>
          {/* <NavMain /> */}
        </header>
        <main className="main-container">
          <img className="image-title" src="./img/blue-shovel4.png" alt="avatar" />
          <div className="signin-signup"><p>signin/signup</p></div>
          <img className="image-title" src="./img/red-shovel4.png" alt="avatar" />
        </main>
        </div> 
        </div>
    )
}
