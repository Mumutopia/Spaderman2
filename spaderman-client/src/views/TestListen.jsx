import React, {useEffect} from 'react'






export default function TestListen({count,handleOther, handleCount}) {

console.log("render")

useEffect(()=>{
    console.log("count ici ",count)
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
