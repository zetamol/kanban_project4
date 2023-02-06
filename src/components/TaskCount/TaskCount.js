import React from 'react'
import './TaskCount.css'

export default function TaskCount(prop){    
    return (
        <div className="task-count">{(prop.type==='active')?`Active: `:`Finished: `}{prop.count}</div>
    )
}