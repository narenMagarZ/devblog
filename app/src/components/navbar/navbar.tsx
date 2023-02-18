import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {MdPerson} from 'react-icons/md'
import {RiNotificationLine} from 'react-icons/ri'
import './style.css'




export default function NavBar(){
     const style = {
          searchField:{
               outline:'none'
          }
     }
     function highlightSearchBarBorder(ev:FocusEvent){
          const thisElem = ev.currentTarget as HTMLInputElement
          const searchBarWrapper = thisElem.parentElement
          searchBarWrapper?.classList.toggle('focused-searchbar',true)
     }
     function unHighlightSearchBarBorder(ev:FocusEvent){
          const thisElem = ev.currentTarget as HTMLInputElement
          const searchBarWrapper = thisElem.parentElement
          searchBarWrapper?.classList.toggle('focused-searchbar',false)
          
     }
     const searchBarField = useRef<HTMLInputElement>(null)
     setTimeout(()=>{
          if(searchBarField.current){
               searchBarField.current.addEventListener('focusin',
               highlightSearchBarBorder)
               searchBarField.current.addEventListener('focusout',
               unHighlightSearchBarBorder)
          }
     })
     function toggleProfileCardState(){
          const profileCard = document.getElementById('profileCard')
          if(profileCard){
               const {
                    active
               } = profileCard.dataset
               if(active === 'false'){
                    profileCard.classList.toggle('scale-0',false)
                    profileCard.classList.toggle('scale-1',true)
                    profileCard.dataset.active = 'true'
               } else if(active === 'true'){
                    profileCard.classList.toggle('scale-1',false)
                    profileCard.classList.toggle('scale-0',true)
                    profileCard.dataset.active = 'false'
               }
          }
     }
     return(
          <div className=" p-2 bg-white">
               <div className="d-flex gap-2 container-lg align-items-center w-100">
                    <Link className="bg-dark p-2 rounded text-decoration-none text-white fw-bold" to='/'>
                         <p className="m-0">DEV</p>
                    </Link>
                    <div 
                    className="test searchbar rounded p-1">
                         <input
                         ref={searchBarField}
                         id="searchBarField"
                         style={style.searchField}
                         className="border-0"
                         placeholder="Search..." />
                    </div>
                    <div className="flex-grow-1"></div>
                    <Link
                    className="login p-2 rounded"
                    to='/enter'>
                    Log in
                    </Link>
                    <Link
                    className="border nav-hover-link border-primary p-2 rounded"
                    to='/enter?state=new-user'>Create account</Link>
                    <Link to='/new'
                    className="nav-hover-link border border-primary p-2 rounded"
                    >
                         Create Post
                    </Link>
                    <Link 
                    className="notification-link"
                    to='/notifications'>
                         <RiNotificationLine size={18}/>
                    </Link>
                    <div className="position-relative">
                         <button 
                         onClick={toggleProfileCardState}
                         className="profile-avatar-btn">
                              <img src="" alt="" />
                              <MdPerson size={18} className="person-icon"/>
                         </button>
                              <div 
                              data-active='false'
                              id="profileCard"
                              style={{
                                   width:250
                              }}
                              className="border scale-0 pa-left border-mute p-2 bg-white rounded position-absolute">
                                   <Link 
                                   className="profile-card-link fs-15 d-flex flex-column rounded p-2"
                                   to='/'>
                                        naren magar
                                        <br/>
                                        @narenmagarz
                                   </Link>
                                   <hr className="my-2"/>
                                   <div className="">
                                        <Link 
                                        className="d-block rounded p-2 profile-card-link"
                                        to='/dashboard'>
                                        Dashboard</Link>
                                        <Link 
                                        className="d-block rounded p-2 profile-card-link"
                                        to='/new'>Create post</Link>
                                        <Link 
                                        className="d-block rounded p-2 profile-card-link"
                                        to='/readinglist'>
                                             Reading list
                                        </Link>
                                        <Link 
                                        className="p-2 rounded d-block profile-card-link"
                                        to='/settings'>
                                             Settings
                                        </Link>
                                   </div>
                                   <hr className="m-2"/>
                                   <Link 
                                   className="p-2 rouneded d-block profile-card-link"
                                   to='/signout_confirm'> 
                                        Sign Out
                                   </Link>
                         </div>
                    </div>
               </div>
          </div>
     )
}