import React, {useEffect} from 'react'






export default function GameListen({storeEvent,handleOther}) {

console.log("render")

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
