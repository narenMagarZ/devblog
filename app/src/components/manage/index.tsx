import { useEffect } from "react"
import { useQuery } from "react-query"
import { Link, useParams } from "react-router-dom"
import baseApiUrl from "../../utils/base_api_url"

function ManageArticle(){
     const param = useParams()
     const {
          data,
          status
     } = useQuery<{
          title:string,
          likes:number,
          comments:number,
          views:number,
          publishedAt:string,
          updatedAt:string,
          url:string
     }>('manage',async()=>{
          const {
               user,
               articleslug
          } = param
          const url = `/manage/article?user=${user}&articleSlug=${articleslug}`
          const response = await baseApiUrl.get(url)
          if(response.status=== 200)
               return response.data
     })
     useEffect(()=>{
          console.log(data)
     },[data])
     if(status === 'success')
     return(
          <div
          className="d-flex flex-column align-items-center 
          justify-content-center"
          >
               <header
               className="w-100 d-flex 
               bg-dark-blue
               align-items-center justify-content-center"
               >
                    <div
                    className="text-white p-4 container"
                    >
                         <Link 
                         className="text-white text-decoration-underline"
                         to='/dashboard'>
                              Dashboard
                         </Link>
                         👉 Manage Your Post
                         <br/>
                         <h4 className="m-0">Tools:</h4>
                         <h5 className="m-0">Experience Level of Post:</h5>Is your post written more for a beginner 
                         or an advanced audience? Adjust this level as a gentle indicator 
                         which will help show the post to the people who will benefit the most.
                         <h4 className="m-0">Tips:</h4>
                         <ol>
                              <li
                              className="fs-16"
                              >
                              1. Write your own tweet about the post, describing personally 
                              why you wrote it or why people might find it useful. 
                              We may retweet you.
                              </li>
                              <br/>
                              <li
                              className="fs-16"
                              >
                              2. Share to link aggregators such as 
                              <a
                              className="text-white text-decoration-underline"
                              href='https://reddit.com'>
                                   &nbsp;Reddit
                              </a>
                              . Try to choose the 
                              most topic-specific subreddits, such as 
                              <a 
                              className="text-white text-decoration-underline"
                              href="https://reddit.com/r/javascript">
                                   &nbsp;/r/javascript
                              </a>
                               &nbsp;or 
                              <a 
                              className="text-white text-decoration-underline"
                              href="https://reddit.com/r/python">
                                   &nbsp;/r/python
                               </a>
                               , etc. Warning: jerks and trolls may be lurking.
                              </li>
                              <br/>
                              <li
                              className="fs-16"
                              >
                                   3. Share with your co-workers or local communities. 
                                   Ask people to leave questions for you in the comments. 
                                   It's a great way to spark additional discussion.
                              </li>
                         </ol>
                    </div>
               </header>
               <div
               style={{
                    maxWidth:'70%',
                    marginTop:-20,
                    width:'fit-content'
               }}
               className="border bg-white mx-2 rounded p-4"
               >
                    <h4 
                    style={{
                         lineHeight:1.5
                    }}
                    className="m-0">
                         <Link 
                         to='/'>
                              {
                                   data.title
                              }
                         </Link>
                    </h4>
                    <div className="d-flex  gap-2 my-3">
                         <p className="m-0 color-base fs-15">
                              Published: 
                              <span> Mar 16</span>
                         </p>
                         <p className="m-0 color-base fs-15">
                              Edited:
                              <span> Mar 16</span>
                         </p>
                    </div>
                    <div
                    className="d-flex align-items-center gap-2 flex-wrap"
                    >
                         <Link 
                         to={data.url.concat('/edit')}
                         className="primary-btn rounded p-2 text-white">
                              Edit
                         </Link>
                         <Link
                         
                         to={data.url.concat('/delete_confirm')}
                         className="btn btn-danger">
                              Delete
                         </Link>
                         <button
                         style={{
                              minWidth:'fit-content'
                         }}
                         className="primary-btn rounded p-2"
                         >
                              Pin to profile
                         </button>
                         <Link
                         to='/stats'
                         className="primary-btn rounded text-white"
                         >
                              Stats
                         </Link>
                         <Link
                         style={{
                              minWidth:'fit-content'
                         }}
                         to='/discussion_lock_confirm'
                         className="primary-btn rounded text-white"
                         >
                              Lock discussion
                         </Link>
                         <div className="d-flex gap-3">
                              <p className="m-0 color-base-80">
                                   <span className="mx-2">{data.views}</span>
                                   views
                              </p>
                              <p className="m-0 color-base-80">
                                   <span className="mx-2">{data.likes}</span>
                                   reactions
                              </p>
                              <p className="m-0 color-base-80">
                                   <span className="mx-2">{data.comments}</span>
                                   comments
                              </p>
                         </div>
                    </div>
               </div>
          </div>
     )
     else return <></>
}


export default ManageArticle