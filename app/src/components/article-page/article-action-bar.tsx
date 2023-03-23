import { useEffect, useState } from "react"
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
     const [yrReaction,setYrReaction] = useState<IYourReaction>(yourReaction)
     const [reactionNum,setReactionNum] = useState<IReactions>(reactions)
     const [totalLikes,setTotalLikes] = useState(likes)
     async function handleReactionOnArticle(x:'like'|'unicorn'|'explodingHead'|'raisedHands'|'fire'){
          Object.keys(yrReaction).map((reaction)=>{
               if(reaction === x){
                    let y = reactionNum[x] + 1
                    let z = 1
                    let w = true
                    if(yrReaction[x]){
                         z = -1
                         w = false
                         y = y - 2
                    }
                    setYrReaction((state)=>({...state,[x]:w}))
                    setTotalLikes((state)=>state + z)
                    setReactionNum((state)=>({
                         ...state,
                         [x] : y
                    }))
                    return true
               }
               return false
          })
          const response = await baseApiUrl.patch(`/reaction?type=${x}`)
          console.log(response)
     }
     function scrollToCommentBox(){
          const commentBox = document.getElementById('commentBox')
          const scrollTop = commentBox?.getBoundingClientRect().top || 0
          window.scrollBy(0,scrollTop)
     }
     useEffect(()=>{
          console.log(yrReaction,reactionNum)
     },[yrReaction,reactionNum])
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
                         {
                              Object.values(yrReaction)
                              .some((reaction)=>reaction) ? 
                              <LoveFill/> : <LovePlus/>
                         }
                         <span>
                              {totalLikes}
                         </span>
                    </button>
                    <ReactionDrawer 
                    reactions={reactionNum}
                    yourReaction={yrReaction}
                    handleReactionOnArticle={handleReactionOnArticle}
                    />
               </div>
               <div>
                    <button 
                    onClick={()=>scrollToCommentBox()}
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
               onClick={()=>handleReactionOnArticle('explodingHead')}
               className={`reaction-btn rounded ${eh?'reacted':''}`}>
                    <img src="/icon/exploding-head.svg" alt="" />
                    <span className="fs-s color-base-60">
                         {explodingHead}
                    </span>
               </button>
               <button 
               onClick={()=>handleReactionOnArticle('raisedHands')}
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