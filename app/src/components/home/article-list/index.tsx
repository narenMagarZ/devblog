import ArticleCard from "./article-card"
import { useQuery } from "react-query"
import baseApiUrl from "../../../utils/base_api_url"
import { useEffect } from "react"


interface User {
     id:string
     userName:string
     url:string
     picture:string
}
interface Article {
     id:string
     articleId:string
     title:string
     tags:string[]
     likes:number
     comments:0
     readTime:0
     coverImageUrl:string
     publishedAt:string
     url:string
     user:User
}

function ArticleList(){

     const {
          data,
          status,
          error
     } = useQuery<Article[]>('article',async()=>{
          const response = await baseApiUrl.get('/articles')
          if(response.status === 200 && response.statusText){
               return response.data
          }
          throw new Error(`Failed to fetch articles: ${response.status}`)
     })
     useEffect(()=>{
          console.log(data,status)
     },[status,data])
     const articles = [
          {
               id:1,
               postBy:'naren magar',
               createdAt:new Date().toDateString(),
               title:'Ai powered code debugging extensions my favorite free courses to learn devops in 2023',
               tags:'openai,vscode,ai,python',
               reactions:24,
               comments:2,
               readTime:2,
               isPostSavedToReadList:false,
               coverImage:'/shirt.png',
               picture:'',
               url:'the awesome side of github'
          },
          {
               id:2,
               postBy:'naren magar',
               createdAt:new Date().toDateString(),
               title:'Ai powered code debugging extensions my favorite free courses to learn devops in 2023',
               tags:'openai,vscode,ai,python',
               reactions:24,
               comments:2,
               readTime:2,
               isPostSavedToReadList:false,
               coverImage:'/shirt.png',
               picture:'',
               url:'top 7 featured dev posts from the past week'
          },          {
               id:3,
               postBy:'naren magar',
               createdAt:new Date().toDateString(),
               title:'Ai powered code debugging extensions my favorite free courses to learn devops in 2023',
               tags:'openai,vscode,ai,python',
               reactions:24,
               comments:2,
               readTime:2,
               isPostSavedToReadList:false,
               coverImage:'/shirt.png',
               picture:'',
               url:'size years on dev, already?'
          },
     ]
     return(
          <div 
          style={{
               maxWidth:600
          }}
          className="mt-5">
               {
                    articles.map((article,i)=>{
                      return (
                         <ArticleCard
                         key={i}
                         {...article}
                         />
                      )
                    })
               }
          </div>
     )
}


export default ArticleList
