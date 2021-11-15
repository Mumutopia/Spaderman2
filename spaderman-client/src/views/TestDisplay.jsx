import React from 'react'

export default function TestDisplay({count,otherCounter,myXPosition,myYPosition,otherXPosition,otherYPosition}) {
    return (
        <div>
             counter : {count}
             other ;{otherCounter}
             my pos : [{myXPosition},{myYPosition}]
             other pos :[{otherXPosition},{otherYPosition}]
        </div>
    )
}
