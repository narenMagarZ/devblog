import { useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { Save } from "../../custom icon"
import Avatar from "../../shared component/avatar"
import baseApiUrl from "../../utils/base_api_url"
import NavBar from "../navbar"



function ReadingList(){
     const [filterKey,setFilterKey] = useState('')
     const {
          data
     } = useQuery<IReadingList>('reading-list',async()=>{
          const response = await baseApiUrl.get('/readinglist')
          return response.data
     },{
          retry:false
     })
     const [allArticles,setAllArticles] = useState<IReadingListArticle[]>([])
     const [articles,setArticles] = useState<IReadingListArticle[]>([])
     const [tags,setTags] = useState<string[]>([])
     function filterReadingList(key:string){
          setFilterKey(key)
          setArticles(()=>{
               if(!key){
                    return [...allArticles]
               }
               const filteredArticles = allArticles.filter((article)=>{
                    const {tags} = article
                    if(tags.includes(key)){
                         return article
                    }
               })
               return [...filteredArticles]
          })
     }
     useEffect(()=>{
          if(data){
               setTags(data.tags)
               setAllArticles(data.articles)
               setArticles(data.articles)
          }
     },[data])
     let time : any = null
     function handleArticleSearch(ev:React.ChangeEvent<HTMLInputElement>){
          const searchKey = ev.currentTarget.value.trim()
          clearTimeout(time)
          time = setTimeout(()=>{
               setArticles(()=>{
                    if(searchKey){
                         const filteredArticles = allArticles.filter((article)=>{
                                   const {title} = article
                                   if(title.includes(searchKey)){
                                        return article
                                   }
                         })
                         return [...filteredArticles]
                    }else return [...allArticles]
               })
          },500)
     }
     return(
          <div>
               <div>
                    <NavBar/>
               </div>
               <div
               className="container-lg"
               >
                    <div
                    className="p-2 d-flex flex-md-row flex-column gap-2"
                    >
                    <div className="">
                         <h3 className="fw-bold color-base-80">Reading list({allArticles.length})</h3>
                         <div
                         style={{
                              maxWidth:250
                         }}
                         className="d-flex flex-column gap-1"
                         >
                              <button
                              onClick={()=>filterReadingList('')}
                              className={`text-start ${!filterKey ? 'active-key' : ''} border-0 rounded secondary-btn p-2 color-base-80`}
                              >
                                   All tags
                              </button>
                              {
                                   tags.map((tag,i)=>{
                                        return(
                                             <button
                                             onClick={()=>filterReadingList(tag)}
                                             className={`text-start ${tag===filterKey ? 'active-key' : ''} border-0 rounded secondary-btn p-2 color-base-80`}
                                             key={i}
                                             >
                                                  #{tag}
                                             </button>
                                        )
                                   })
                              }
                         </div>
                    </div>
                    <div className="flex-grow-1">
                         <div className="mb-2">
                              <form className="d-flex w-100 justify-content-end">
                                   <input
                                   style={{
                                        width:200
                                   }}
                                   onChange={handleArticleSearch}
                                   className="border p-2 rounded input-field fs-16"
                                   placeholder="Search..." />
                              </form>
                         </div>
                         <div className="bg-white rounded p-2 border">
                                   {
                                        articles ? 
                                        articles.length > 0 ? 
                                        articles.map(({
                                             title,
                                             tags,
                                             publishedAt,
                                             readTime,
                                             url,
                                             user:{
                                                  name,
                                                  userName,
                                                  userId,
                                                  picture
                                             }
                                        },i)=>{
                                             return (
                                                  <div
                                                  className="d-flex gap-2 p-2 mb-4"
                                                  key={i}
                                                  >
                                                       <div>
                                                            <Avatar
                                                            userName={userName}
                                                            avatar={picture}
                                                            />
                                                       </div>
                                                       <div>
                                                            <Link
                                                            to={url}
                                                            className="text-dark fs-17 color-base"
                                                            >
                                                                 {title}
                                                            </Link>
                                                            <div
                                                            className="d-flex flex-wrap gap-2 align-items-end"
                                                            >    
                                                            <Link
                                                            className="color-base fs-15"
                                                            to={`/${userName}`}
                                                            >
                                                                 <span className="colorbase-80">{name}</span>
                                                            </Link>
                                                                 <span className="color-base fs-15">{publishedAt}</span>
                                                                 <span className="color-base fs-15">{readTime} min read</span>
                                                                 <div>
                                                                      {
                                                                           tags.map((tag)=>{
                                                                                return <Link 
                                                                                className="tag"
                                                                                to={`/t/${tag}`}
                                                                                key={tag}>
                                                                                     #{tag}
                                                                                </Link>
                                                                           })
                                                                      }
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>
                                             )
                                        }) : <div className="p-5">
                                        <h5 className="text-center">Your reading list is empty</h5>
                                        <p className="text-center m-0 color-base">
                                             Click the bookmark reaction <Save/>
                                             when viewing a post to add it to your reading list.
                                        </p>
                                   </div> : ''
                                   }
                              
                         </div>
                    </div>
                    </div>
               </div>
          </div>
     )
}

export default ReadingList