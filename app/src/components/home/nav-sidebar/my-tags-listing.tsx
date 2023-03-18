import { Link } from "react-router-dom"
import { PostOption } from "../../../custom icon"


function MyTagListing({
     myTags
}:{
     myTags:{path:string}[]
}){
     return(
          <div
          className="d-flex flex-column gap-1">
               <header 
               className="w-100
               following-tags
               d-flex align-items-center justify-content-between">
                    <h2
                    className="crayons-subtitle-3 m-0"
                    >My Tags</h2>
                    <Link 
                    className="p-2 rounded"
                    to='/dashboard/following_tags'>
                         <PostOption/>
                    </Link>
               </header>
               <div 
               style={{
                    maxHeight:400,
                    overflow:'auto'
               }}
               className="
               sidebar-nav-followed-tags
               d-flex flex-column gap-1">
               {
                    myTags.map(({path})=>{
                         return(
                              <Link
                              className="p-2 rounded"
                              key={path}
                              to={`t/${path}`}
                              >
                                   #{path}
                              </Link>
                         )
                    })
               }
               </div>
          </div>
     )
}


export default MyTagListing