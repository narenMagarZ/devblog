import Footer from "../footer";
import NavBar from "../navbar/navbar";
import ArticleList from "./article-list";
import './style.css'
import { Link, useLocation } from "react-router-dom";
import NavSidebar from "./nav-sidebar";
import { useEffect } from "react";
export default function Home(){
     const location = useLocation()
     console.log(location)
     useEffect(()=>{
          
     },[location])
     return(
          <div className="position-relative">
               <div 
               style={{
                    zIndex:1
               }}
               className="position-fixed top-0 start-0 w-100">
                    <NavBar/>
               </div>
               <div 
               style={{
                    marginTop:80
               }}
               className="d-flex justify-content-center gap-3">
                    <aside
                    className="p-2"
                    >
                         <NavSidebar/>
                    </aside>
                    <div>
                         <div className="d-flex gap-1 crayons-navigation">
                              <Link 
                              className={`p-2 rounded ${location.pathname === '/' ? 'fw-bold current':''}`}
                              to='/'>
                                   Relevant
                              </Link>
                              <Link 
                              className={`p-2 rounded ${location.pathname === '/latest' ? 'fw-bold current':''}`}
                              to='/latest'>
                                   Latest
                              </Link>
                              <Link 
                              to='/top/week'
                              className={`p-2 rounded ${location.pathname === '/top/week' ? 'fw-bold current':''}`}
                              >
                              
                                   Top
                              </Link>
                         </div>
                         <div>
                              <ArticleList/>
                         </div>
                    </div>
               </div>
               {/* <Footer/> */}
          </div>
     )
}