import { useQuery } from "react-query"
import baseApiUrl from "../../utils/base_api_url"
import TagCard from "./tag-card"


function TagsContainer(){
     const {
          data,
          status
     } = useQuery<{
          id:string
          name:string
          description:string
          totalPosts:number
          isFollowed:boolean,
          theme:string
     }[]>('tag',async()=>{
          const response = await baseApiUrl.get('/tags')
          console.log(response.data)
          return response.data
     })
     if(status === 'success' && data)
     return(
          <div className="container p-4">
               <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                         <div className="d-flex align-items-center
                         mb-2
                         justify-content-between">
                              <h3>Top tags</h3>
                              <div className="d-flex gap-2 align-items-center">
                                   <form>
                                        <input
                                        name="q"
                                        className="border search-tag-field rounded px-2 py-1 fs-15"
                                        placeholder="Search for tag"/>
                                   </form>
                                   <p className="m-0 color-base">Following tags</p>    
                              </div>
                         </div>
                    <div
                    className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2"
                    >
                         {
                              data.map((tag,i)=>{
                                   return(
                                        <TagCard
                                        key={i}
                                        {...tag}
                                        />
                                   )
                              })
                         }
                    </div>
                    </div>
               </div>
          </div>
     )
     else return <></>
}


export default TagsContainer