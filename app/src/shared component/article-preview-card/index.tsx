import Meta from "./meta"
import Tags from "./tags"
import Title from "./title"
import User from "./user"
import Avatar from "../avatar"
function ArticlePreviewCard(){
     return(
          <div
          className="border bg-white rounded p-3 d-flex "
          >
               <Avatar
               userName={'narenmagarz'}
               avatar={'/simpson.jpg'}
               />
               <div className="px-2">
               <User
               avatarUrl="/simpson.jpg"
               userName="narenmagarz"
               publishedAt="mar 28, 2023"
               />
               <Title
               title="Paracetamol.js💊| #212: Explica este código JavaScript"
               />
               <Tags
               tags={['javascript','webdev','programming']}
               />
               <Meta
               likes={0}
               comments={0}
               readTime={2}
               />
               </div>
          </div>
     )
}

export default ArticlePreviewCard