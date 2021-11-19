import React, {useEffect} from 'react'






export default function GameListen({storeEvent,handleOther}) {



useEffect(()=>{
    window.addEventListener("keyup", (event) => {
        storeEvent(event)
    })
    
},[])



 
    return (
        <div>
            
        </div>
    )
}
