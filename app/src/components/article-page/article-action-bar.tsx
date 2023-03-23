import { useState } from "react"
import { Comment, LoveFill, LovePlus, Save } from "../../custom icon"
import baseApiUrl from "../../utils/base_api_url"


type articleactionbar = {
     reactions:IReactions,
     comments:number,
     saved:number,
     likes:number,
     isBookMarked:boolean,
     yourReaction:IYourReaction
}

const ArticleActionBar : React.FC<articleactionbar> = ({
     reactions,
     likes,
     comments,
     saved,
     yourReaction
})=>{
     const [reaction,setReaction] = useState({
          like:false,
          unicorn:false,

     })
     async function handleReactionOnArticle(x:string){
          console.log(x)
          const response = await baseApiUrl.patch(`/reaction?type=${x}`)
          console.log(response)
     }
     return(
          <div 
          className="article-action-btn-bar-wrapper
          position-sticky
          d-flex flex-column gap-3 p-2">
               <div className="reaction-drawer-outer position-relative">
                    <button 
                    onClick={()=>handleReactionOnArticle('like')}
                    className="d-flex flex-column 
                    action-bar-love-plus-btn
                    like-btn
                    align-items-center">
                         {/* <LovePlus/> */}
                         <LoveFill/>
                         <span>
                              {likes}
                         </span>
                    </button>
                    <ReactionDrawer 
                    reactions={reactions}
                    yourReaction={yourReaction}
                    handleReactionOnArticle={handleReactionOnArticle}
                    />
               </div>
               <div>
                    <button 
                    onClick={()=>handleReactionOnArticle.bind(null,'love')}

                    className="d-flex flex-column 
                    action-bar-comment-btn 
                    align-items-center">
                         <Comment/>
                         <span>
                              {comments}
                         </span>
                    </button>
               </div>
               <div>
                    <button 
                    className="d-flex action-bar-save-btn
                    flex-column align-items-center">
                         <Save/>
                         <span>
                              {saved}
                         </span>
                    </button>
               </div>
          </div>
     )
}

export default ArticleActionBar



const ReactionDrawer = ({
     handleReactionOnArticle,
     yourReaction:{
          like:lk,
          unicorn:un,
          explodingHead:eh,
          raisedHands:rh,
          fire:fi
     },
     reactions:{
          like,
          unicorn,
          explodingHead,
          raisedHands,
          fire
     }
}:{
     handleReactionOnArticle:(x:any)=>void,
     reactions:IReactions,
     yourReaction:IYourReaction
})=>{
     return(
          <div 
          className="bg-white reaction-drawer-wrapper p-2 rounded border">
               <button 
               onClick={()=>handleReactionOnArticle('like')}
               className={`reaction-btn rounded ${lk?'reacted':''}`}>
                    <img src="/icon/like.svg" alt="" />
                    <span className="fs-s color-base-60">
                         {like}
                    </span>
               </button>
               <button 
               onClick={()=>handleReactionOnArticle('unicorn')}
               className={`reaction-btn rounded ${un?'reacted':''}`}>
                    <img src="/icon/unicorn.svg" alt="" />
                    <span className="fs-s color-base-60">
                         {unicorn}
                    </span>
               </button>
               <button 
               onClick={()=>handleReactionOnArticle('exploding-head')}
               className={`reaction-btn rounded ${eh?'reacted':''}`}>
                    <img src="/icon/exploding-head.svg" alt="" />
                    <span className="fs-s color-base-60">
                         {explodingHead}
                    </span>
               </button>
               <button 
               onClick={()=>handleReactionOnArticle('raised-hands')}
               className={`reaction-btn rounded ${rh?'reacted':''}`}>
                    <img src="/icon/raised-hand.svg" alt="" />
                    <span className="fs-s color-base-60">
                         {raisedHands}
                    </span>
               </button>
               <button 
               onClick={()=>handleReactionOnArticle('fire')}
               className={`reaction-btn rounded ${fi?'reacted':''}`}>
                    <img src="/icon/fire.svg" alt="" />
                    <span className="fs-s color-base-60">
                         {fire}
                    </span>
               </button>
          </div>
     )
}