import React, {useEffect} from 'react'






export default function TestListen({count,handlingInput,handleOther, handleCount}) {

console.log("render")

useEffect(()=>{
    window.addEventListener("keyup", (event) => {
        handlingInput(event)
    })
    
},[])

const setCondition = () => {
    if (count < 20) {handleCount(1)}
    else {console.log("c'est mort frere")}
}

 console.log(count);
    return (
        <div>
            <button onClick={setCondition}>incremente</button>
        </div>
    )
}
