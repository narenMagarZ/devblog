import { Link } from "react-router-dom"

function TagCard({
     id,
     name,
     description,
     totalPosts,
     isFollowed,
     theme
}:{
     id:string
     name:string
     description:string
     totalPosts:number
     isFollowed:boolean
     theme:string
}){

     return(
          <div 
          data-id={id}
          style={{
               height:300
          }}
          className="rounded border col overflow-hidden 
          bg-white p-0">
                    <header
                    style={{
                         backgroundColor:theme
                    }}
                    className="p-2"
                    ></header>
                    <div className="p-3">
                         <Link
                         className="color-base-80"
                         to={`/t/${name}`}
                         >
                              <h5>
                                   <span 
                                   style={{
                                        color:theme
                                   }}>#</span>
                                   <span>{name}</span>     
                              </h5>
                         </Link>
                         <p
                         style={{
                              textOverflow:'ellipsis',
                              maxHeight:100
                         }}
                         className="m-0 color-base overflow-hidden"
                         >{description}</p>
                         <p className="m-0">
                              <span
                              className="fs-xs color-base"
                              >{totalPosts} posts published</span>
                         </p>
                         <button
                         className="border-0 rounded mt-2 secondary-bg px-2 py-1 bg-grey"
                         >
                              {
                                   isFollowed?'Following':'Follow'
                              }
                         </button>
                    </div>
          </div>
     )
}

export default TagCard