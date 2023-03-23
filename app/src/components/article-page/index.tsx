import NavBar from "../navbar/navbar"
import {useQuery} from 'react-query'
import baseApiUrl from "../../utils/base_api_url"
import { useParams } from "react-router"
import ArticleActionBar from "./article-action-bar"
import Article from "./article"
import Footer from "../footer"
import './style.css'
import ArticleOwnerProfileCard from "./article-owner-profile-card"
import { useEffect } from "react"


interface article {
     title:string
     tags:string[]
     comments:number
     coverImageUrl:string
     content:string
     likes:number
     reactions:IReactions
     isBookMarked:boolean
     yourReaction:IYourReaction
}
type x = string|null
interface user {
     bio:x
     education:x
     isMe:boolean
     location:x
     name:string
     picture:string
     url:string
     userName:string
     work:x
}



function ArticlePage(){

     const params = useParams()
     const {
          user,
          articleslug
     } = params
           
          const {status,data} = useQuery<{
               article:article,
               user:user
          }>('article',async()=>{
               const url = `/${user}/${articleslug}?`
               const response = await baseApiUrl.get(url)
               return await response.data
     
          })
     useEffect(()=>{
          console.log(data)
     },[data,status])

     if(status === 'success')
     return(
          <div
          className=""
          >
               <div 
               style={{
                    zIndex:1
               }}
               className="position-fixed top-0 start-0 w-100">
                    <NavBar/>
               </div>
               <div 
               style={{
                    marginTop:60
               }}
               className="p-2 d-flex
               align-items-start justify-content-center
               ">
                    <div 
                    style={{
                         maxWidth:1000
                    }}
                    className="position-relative grid-test gap-2">
                         <ArticleActionBar
                         yourReaction={data.article.yourReaction}
                         reactions={{
                              like:0,
                              unicorn:0,
                              explodingHead:0,
                              raisedHands:0,
                              fire:0
                         }}
                         likes={data?.article.likes}
                         comments={data.article.comments}
                         saved={0}
                         isBookMarked={data.article.isBookMarked}
                         />
                         <Article
                              title={data.article.title}
                              content={data.article.content}
                              coverImageUrl={data.article.coverImageUrl}
                              tags={data.article.tags}
                              picture={data.user.picture}
                              name={data.user.name}
                              url={data.user.userName}
                         /> 
                         <ArticleOwnerProfileCard
                         name={data.user.name}
                         picture={data.user.picture}
                         url={data.user.userName}
                         bio={data.user.bio}
                         joined="Feb 11, 2020"
                         isFollowedByU={false}
                         location={data.user.location}
                         education={data.user.education}
                         work={data.user.work}
                         />
                    </div>
               </div>
               {/* <Footer/> */}
          </div>
     )
     else return <></>
}


export default ArticlePage


