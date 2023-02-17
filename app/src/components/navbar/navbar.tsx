import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
     return(
          <div className=" p-2 bg-white">
               <div className="d-flex container-lg align-items-center w-100">
                    <Link className="bg-dark p-2 rounded text-decoration-none text-white fw-bold" to='/'>
                         <p className="m-0">DEV</p>
                    </Link>
                    <div 
                    className="test searchbar rounded p-1 mx-2">
                         <input
                         ref={searchBarField}
                         id="searchBarField"
                         style={style.searchField}
                         className="border-0"
                         placeholder="Search..." />
                    </div>
                    <div className="flex-grow-1"></div>
                    <Link
                    className="login p-2 rounded mx-2"
                    to='/enter'>
                    Log in
                    </Link>
                    <Link
                    className="border create-account border-primary p-2 rounded mx-2"
                    to='/enter?state=new-user'>Create account</Link>
               </div>
          </div>
     )
}