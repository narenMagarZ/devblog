import { Comment, Post, Tag } from "../../../custom icon"


function OtherInfo(){
     return(
          <div
          className="bg-white rounded border px-3 py-2 mb-2"
          >
               <div className="my-2 d-flex gap-2 ">
                   <Post/>
                   <span className="card-secondary-color">4 posts published</span> 
               </div>
               <div className="my-2 d-flex gap-2">
                    <Comment/>
                    <span className="card-secondary-color">1 comment written</span>
               </div>
               <div className="my-2 d-flex gap-2">
                    <Tag/>
                    <span className="card-secondary-color">9 tags followed</span>
               </div>
          </div>
     )
}

export default OtherInfo