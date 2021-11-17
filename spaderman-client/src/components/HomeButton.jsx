import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeButton(props) {
    return (

        <Link style={{  textDecoration: 'none' }} to={{
                pathname : `/${props.name}`,
                
            }}>{props.children}</Link>

    )
}
