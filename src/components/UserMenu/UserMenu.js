import React, {useState, useContext} from 'react'
import './UserMenu.css'
import {Context} from '../../context'
import avatar from '../../img/userAvatar.png'


export default function UserMenu() {
const [isOpened,setOpened] = useState(false)
const {user, login} = useContext(Context)

    return (
        
            user.name!=='Anonymous' ? (
            <>
            <div className="userMenu" onClick={()=>setOpened(!isOpened)}> 
                <div className="userAvatar"><img alt="avatar" src={avatar} /></div>
                <div className="userTitle">{user.name}</div> {isOpened ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>} 
            </div>
            {isOpened && (
                    <div className="menuList">
                        <ul>
                           <li onClick={()=>{login({
                                type:'logout'
                                }); setOpened(!isOpened)}}>Logout</li>
                        </ul>                        
                    </div>
                ) }
            
            </>) : (
            <>
            <div className="notLogged" onClick={()=>setOpened(!isOpened)}>Log In {isOpened ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}</div>
            {isOpened && (
                    <div className="menuList">
                        <ul>
                            <li  onClick={()=>{login({
                                type:'login', payload : {'name':'Alex'}}); setOpened(!isOpened)}}>Log in as Alex</li>

                        </ul>                        
                    </div>
                ) }
             
            </>
             )
            
        
    )
}