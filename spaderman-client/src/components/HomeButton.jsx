import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeButton() {
    return (

        <Link  to={{
                pathname : `/home`,
                
            }}>Home</Link>

    )
}
