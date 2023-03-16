import { useContext } from 'react'
import { articleContainerContext } from '.'
import {PostOption} from '../../custom icon/'
import { useMutation } from 'react-query'
import baseApiUrl from '../../utils/base_api_url'
import { useNavigate } from 'react-router'




export default function Footer(){
     const navigate = useNavigate()
     const {
          articleContainerRef
     } = useContext(articleContainerContext)
     const {
          mutate:saveDraft,
          status
     } = useMutation(async()=>{
          const articleId = articleContainerRef?.current?.dataset['articleId']
          const url = `/article/draft?articleId=${articleId}`
          const response = await baseApiUrl.put(url)
          if(response.status === 200 && response.statusText){
               const {
                    url
               } = await response.data
               navigate(url)
          }
     })

     const {
          mutate:publishArticle
     } = useMutation(async()=>{
          const articleId = articleContainerRef?.current?.dataset['articleId']
          const url = `/article/publish?articleId=${articleId}`
          const response = await baseApiUrl.post(url)
          if(response.status === 200 && response.statusText){
               const {
                    url
               } = await response.data
               navigate(url)
          }
     })

     return (
          <footer className="mt-2">
               <div className="d-flex gap-2 align-items-center">
                    <button 
                    onClick={()=>publishArticle()}
                    className="rounded p-2 px-3 
                    publish-blog-post-btn">Publish</button>
                    <button 
                    onClick={()=>saveDraft}
                    className="rounded 
                    p-2 px-3
                    save-blog-post-draft-btn">
                         Save draft
                    </button>
                    <div>
                         <button className="rounded blog-post-option-btn
                         p-2
                         border-0">
                              <PostOption/>
                         </button>
                    </div>
                    <button 
                    className="rounded border-0 
                    p-2 px-3
                    revert-blog-post-new-change-btn">
                         Revert new changes
                    </button>
               </div>
          </footer>
     )
}