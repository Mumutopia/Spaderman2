import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeButton() {
    return (

        <Link className="spaderman-title" to={{
                pathname : `/home`,
                
            }}>Spaderman</Link>

    )
}
