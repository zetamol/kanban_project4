import React, {useContext} from 'react'
import './Task.css'
import { Context } from '../../context'
import { Link } from 'react-router-dom'

export default function Task({attr,data}) {
    const {dispatch} = useContext(Context)
    return(    
        <div className='task'><Link to={`/${attr}/${data.id}`}>{data.name}</Link><i className="fas fa-trash-alt remove" onClick={()=>{
            dispatch({
                type: 'remove',
                payload: {'id':`${data.id}`, 'attr':`${attr}`}
               });
        }}></i></div>
    )    
}
