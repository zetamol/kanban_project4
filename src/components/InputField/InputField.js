import React, { useContext, useState } from 'react'
import { Context } from '../../context'
import './InputField.css'

export default function InputField(){
const {dispatch} = useContext(Context)
const [status,setStatus] = useState(false)
const [name,setName] = useState('')
const [text,setText] = useState('')
const [html, setHTML] = useState(false)

    return (
        <React.Fragment>
         <button className="button add-button" onClick={()=>{setStatus(true);setHTML(false)}}>Add Task</button>
        {status && ( 
         <div className='modal'>
           <div className='modal-body'>
             <div className="task-header addtask-header">Add Task<i className="fas fa-times-circle close-tab" title="click to close" onClick={()=>setStatus(false)}></i></div>
             <label>Task Name</label><input className="addtask-field" type="text" value={name} onChange={event=>setName(event.target.value)}/>
             <label>Task Description</label><textarea className="addtask-textarea" value={text} onChange={event=>setText(event.target.value)}/>
             <label htmlFor="useHtml">use HTML</label><input id="useHtml" type="checkbox" checked={html} onChange={()=>setHTML(!html)}/>
             <button className="button addtask" disabled={(name!=='' && text!=='')?false:true} onClick={() => {
           
                 dispatch({
                     type: 'add',
                     payload: {'target':'backlog','name':`${name}`, 'description':`${(html)?text:text.replace(/\n/g, '<br>')}`}
                    });
                     setStatus( !status )
                     setName('')
                     setText('') 
                     setHTML(false)                   
                } 
                }>
               Add Task
             </button>
           </div>
         </div>
        )}
      </React.Fragment>
         
    )
}