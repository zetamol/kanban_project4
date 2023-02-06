import React, {useState,useContext} from 'react'
import {Context} from '../../context'
import './DropDown.css'


export default function DropDown(params) {
const {dispatch,state} = useContext(Context)
const [opened,setOpened] = useState(false)
const [selected,setSelected] = useState ('')
let source
let countLength = 0
let arrays = []

if (state){
     arrays=state;

if (arrays.length) {
switch (params.data){
    case 'ready':
        countLength = 0
        source = 'backlog'
        break
    case 'in progress':
        countLength = 1
        source = 'ready'
        break
    default:
        countLength = 2
        source = 'in progress'
}


}

arrays = arrays[countLength].issues
countLength = arrays.length
}

    return (
      <div>
      {!opened ? <button className="button add-button" onClick={()=>setOpened(true)} disabled={countLength>0 ? false : true} >Add Task</button> : 
      <><select defaultValue='' className="selectbox" onChange={(event) => setSelected(event.target.value)}>
         <option value=''/>    
      { arrays.map(issue => <option value={issue.id} key={issue.id.toString()} >{issue.name}</option> )}
      </select>
      <button className={`button addtask ${selected!=='' ? 'add-active' : ''}`} disabled={selected!=='' ? false : true} onClick={()=>{ 
          if (selected!==''){
          dispatch({
                     type: 'move',
                     payload: {'source':`${source}`,'target':`${params.data}`,'id':`${selected}`}
                    })
                    setOpened(false)
    }}}>Add task</button></>}
      </div>
    )
}
