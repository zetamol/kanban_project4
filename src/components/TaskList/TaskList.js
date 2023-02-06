import React from 'react'
import Task from '../Task/Task'
import './TaskList.css'
import InputField from '../InputField/InputField'
import DropDown from '../DropDown/DropDown'

function TaskList({name,data}){
  return (
      <div className="container">
          <div className={`task-header ${name.replace(/\s/g,'')}`}>{name}</div>
          <div className="task-list">              
              { (data.length) ? data.map(item => <Task attr={name} key={item.id} data={item} /> ) : <div className="notasks">No tasks available</div> }
          </div>
          {(name==='backlog') ? <InputField /> : <DropDown data={name}/>}
      </div>
  )
}

export default TaskList