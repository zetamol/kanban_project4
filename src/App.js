import React, {useEffect, useReducer} from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar'
import TaskList from './components/TaskList/TaskList'
import { Context } from './context'
import reducer from './reducer'
import userreducer from './userreduser'
import { BrowserRouter as Router, Switch, Route, useParams, Link } from "react-router-dom";
import Parser from 'html-react-parser'


export default function app() {

 let stringToParse
 if (window.localStorage.getItem('todos')){ 
    stringToParse = window.localStorage.getItem('todos')
 } else {
    stringToParse = `[{"title":"backlog","issues":[]},{"title":"ready","issues":[]},{"title":"in progress","issues":[]},{"title":"finished","issues":[]}]`
 }
let initUser = (window.localStorage.getItem('user')) ? window.localStorage.getItem('user') : `{"name":"Anonymous","avatar":null}`

const [state,dispatch] = useReducer(reducer, JSON.parse(stringToParse)) 
const [user,login] = useReducer(userreducer,JSON.parse(initUser))

function RenderTask() {
   let { stack, render } = useParams()   
   let result
   state.map(todo => {               
      if (todo.title === stack) {         
          return result=todo.issues.filter(issue => issue.id===parseInt(render,10))[0]              
      }  
      return false    
   })   
   let d = new Date(result.id)
   let timeStamp = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + " " + d.getHours() + ':' + d.getMinutes()

   return (
   <div className="route-container">
      <div className="task-header">{result.name}<Link to="/"><i className="fas fa-times-circle close-tab inverse" title="click to close" ></i></Link></div>
      <div className="placeholder">Section:</div>
      <div className={`data ${stack}`}>{stack}</div>
      <div className="placeholder">Date Created:</div>
      <div className="data">{timeStamp}</div>
      <div className="placeholder">Description:</div>
      <div className="data">{Parser(result.description)}</div>
   </div>);
 }

 useEffect(() => {    
   localStorage.setItem('todos', JSON.stringify(state))    
 },[state])

 useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(user))
 },[user])
 
  return (
  <Context.Provider value={{dispatch,state,user,login}}>     
   <Navbar />
   { user.name!=='Anonymous' ? (
   <Router>
     <Switch>
        <Route path="/:stack/:render">
           <RenderTask/>
        </Route>
        <Route path="/">
         <div className="app">
           {state.map(item => <TaskList key={item.title} name={item.title} data={item.issues} />)}
         </div>
         </Route>
     </Switch>
    </Router>
    ): (
       <div className="anonymous">Для дальнейшей работы авторизуйтесь!</div>
    )} 
    <Footer data={state}/>
  </Context.Provider>
  );
};


