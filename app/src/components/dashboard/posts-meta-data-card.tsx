import { Link } from "react-router-dom"
import { Comment, Love } from "../../custom icon"


const PostsMetaDataCard = ({
     article
}:{
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
})=>{
     return(
          <div
          className="mx-2"
          style={{
               maxWidth:1000
          }}
          >
               <header
               className="d-flex justify-content-between mb-2"
               >
                    <h2>Posts</h2>
                    <select
                    className="rounded bg-white color-base-70 border-0"
                    >
                         <option>Recently Created</option>
                         <option>Recently Published</option>
                         <option>Most Views</option>
                         <option>Most Reactions</option>
                         <option>Most Comments</option>
                    </select>
               </header>
               <div
               className="border rounded"
               >
                    {
                         article.map(({
                              articleId,
                              title,
                              likes,
                              comments,
                              views,
                              publishedAt,
                              updatedAt,
                              status,
                              url
                         },i)=>{
                              return(
                                   <div
                                   key={i}
                                   className='bg-white rounded'
                                   >
                                        <div className="p-2 d-flex">
                                             <div
                                             style={{
                                                  flex:2
                                             }}
                                             >
                                                  <Link
                                                  to={url}
                                                  >
                                                       <h5
                                                       style={{
                                                            lineHeight:1.4
                                                       }}
                                                       >
                                                            <span>{title}</span>
                                                       </h5>
                                                  </Link>
                                                  <div className="d-flex gap-2 flex-wrap">
                                                       
                                                       {
                                                            publishedAt && <p className="m-0 color-base fs-15">
                                                            Published:
                                                            <span> {publishedAt}</span>
                                                       </p>
                                                       }
                                                       {
                                                            updatedAt && <p
                                                            className="m-0 color-base fs-15"
                                                            >
                                                                 Edited:
                                                                 <span> {updatedAt}</span>
                                                            </p>
                                                       }
                                                  </div>
                                             </div>
                                             <div
                                             style={{
                                                  flex:1
                                             }}
                                             className="d-flex align-items-center"
                                             >
                                                  {
                                                       status === 'publish' ? 
                                                       <div className="d-flex gap-1">
                                                            <div>
                                                                 <Love/>
                                                                 <span className="color-base fs-s">
                                                                      {likes}
                                                                 </span>
                                                            </div>
                                                            <div>
                                                                 <Comment/>
                                                                 <span
                                                                 className="color-base fs-s"
                                                                 >
                                                                      {comments}
                                                                 </span>
                                                            </div>
                                                            <div>

                                                            </div>
                                                            <div>
                                                                 <Link
                                                                 className="secondary-bg color-base fs-s px-2 py-1 rounded "
                                                                 to={url.concat('/manage')}
                                                                 >
                                                                      Manage
                                                                 </Link>
                                                                 <Link 
                                                                 className="secondary-bg px-2 fs-s py-1 color-base rounded"
                                                                 to={url.concat('/edit')}
                                                                 >
                                                                      Edit
                                                                 </Link>
                                                            </div>
                                                       </div> :
                                                       <div className="d-flex gap-4">
                                                            <div
                                                            >
                                                                 <Link
                                                                 className="rounded bg-warning p-1 color-base fs-15"
                                                                 to={url.concat('/edit')}
                                                                 >
                                                                      Draft
                                                                 </Link>
                                                            </div>
                                                            <div className="d-flex gap-2">
                                                                 <Link
                                                                 to={url.concat('/delete_confirm')}
                                                                 className="secondary-bg rounded px-2 py-1 text-danger color-base fs-s"
                                                                 >
                                                                      Delete
                                                                 </Link>
                                                                 <Link
                                                                 to={url.concat('/edit')}
                                                                 className="secondary-bg rounded px-2 py-1 color-base fs-s"
                                                                 >
                                                                      Edit
                                                                 </Link>
                                                            </div>
                                                       </div>
                                                  }
                                             </div>
                                        </div>
                                        {
                                             i === article.length - 1 ? '' : <hr className="m-0"/>
                                        }
                                        
                                   </div>
                              )
                         })
                    }
               </div>
          </div>
     )
}

export default PostsMetaDataCard