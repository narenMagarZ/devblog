import PostsMetaDataCard from "./posts-meta-data-card"
import UserMetaData from "./user-meta-data"
import { useQuery } from "react-query"
import baseApiUrl from "../../utils/base_api_url"
import { useEffect } from "react"
import NavBar from "../navbar"

function Dashboard(){
     const {
          data,
          status
     }=useQuery<{
          following:number,
          followers:number,
          tagCount:number,
          totalPosts:number,
          article:{
               title:string,
               articleId:string,
               url:string,
               status:string,
               publishedAt?:string|null,
               updatedAt?:string|null,
               comments:number,
               likes:number,
               owner:string,
               views?:number
          }[]
     }>('dashboard',async()=>{
          const response = await baseApiUrl.get('/dashboard')
          if(response.status===200){
               return await response.data
          }
     })
     useEffect(()=>{
          console.log(data)
     },[data])
     if(data)
     return(
          <div>
               <div>
                    <NavBar/>
               </div>
          <div 
          className="d-flex align-items-center 
          justify-content-center flex-column">
               <header className="d-flex flex-column mb-2">
                    <h2>Dashboard</h2>
                    <div
                    className="d-flex align-items-center gap-3"
                    >
                         <div className="bg-white rounded p-3 border">
                              <h3 className="m-0">
                                   <span>0</span>
                              </h3>
                              <p className="text-secondary">Total post reactions</p>
                         </div>
                         <div
                         className="bg-white rounded p-3 border"
                         >
                              <h3 className="m-0">
                                   <span>{data.totalPosts}</span>
                              </h3>
                              <p className="text-secondary">Total post views</p>
                         </div>
                         <div
                         className="bg-white rounded p-3 border"
                         >
                              <h3 className="m-0">
                                   <span>0</span>
                              </h3>
                              <p className="text-secondary">Listings created</p>
                         </div>
                         <div
                         className="bg-white rounded p-3 border"
                         >
                              <h3 className="m-0">
                                   <span>0</span>
                              </h3>
                              <p className="text-secondary">Credits available</p>
                         </div>
                    </div>
               </header>
               <div
               className="d-flex gap-2"
               >
                    <UserMetaData
                    totalPosts={data.totalPosts}
                    tagCount={data.tagCount}
                    followers={data.followers}
                    following={data.following}
                    />
                    <PostsMetaDataCard
                    article={data?.article}
                    />
               </div>
          </div>
          </div>
     )
     else return <></>
}

export default Dashboard