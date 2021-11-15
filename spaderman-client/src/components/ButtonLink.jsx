import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonLink(props) {
    
    return (
        
            <Link style={{  textDecoration: 'none' }} to={`/home/${props.name}`}>{props.children}</Link>
        
    )
}


