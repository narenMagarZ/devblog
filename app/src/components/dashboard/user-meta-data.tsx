import { Link } from "react-router-dom"


function UserMetaData({
     totalPosts,
     followers,
     following,
     tagCount
}:{
     totalPosts:number,
     followers:number,
     following:number,
     tagCount:number
}){
     return(
          <div
          >
               <ul>
                    <li>
                         <MetaData
                         label="Posts"
                         value={totalPosts||0}
                         url=''
                         />
                    </li>
                    <li>
                         <MetaData
                         label="Series"
                         value={0}
                         url='series'
                         />
                    </li>
                    <li>
                         <MetaData
                         label="Followers"
                         value={followers||0}
                         url='user_followers'
                         />
                    </li>
                    <li>
                         <MetaData
                         label="Following tags"
                         value={tagCount||0}
                         url='following_tags'
                         />
                    </li>
                    <li>
                         <MetaData
                         label="Following users"
                         value={following||0}
                         url='following_users'
                         />
                    </li>
                    <li>
                         <MetaData
                         label="Following organizations"
                         value={0}
                         url='following_organizations'
                         />
                    </li>
                    <li>
                         <MetaData
                         label="Following podcasts"
                         value={0}
                         url='following_podcasts'
                         />
                    </li>
                    <li>
                         <MetaData
                         label="Listings"
                         url='/listings/dashboard'
                         />
                    </li>
                    <li>
                         <MetaData
                         label="Analytics"
                         url='analytics'
                         />
                    </li>
               </ul>
          </div>
     )
}

function MetaData({
     label,
     value,
     url
}:{
     label:string,
     value?:number,
     url:string
}){
     return (
          <Link
               to={url}
               className='w-100 d-flex rounded p-2 
               justify-content-between
               secondary-btn color-base-90 fs-6'
               >
                    {label}
                    {
                         value !== undefined ? value >=0 ?
                         <span
                         className="bg-grey p-1 rounded">{value}</span> : '' : ''
                    }
          </Link>
     )
}

export default UserMetaData