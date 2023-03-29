import { Link } from "react-router-dom"
function Avatar(avatarProps:{
     avatar:string
     userName:string
}){
     const {
          avatar,
          userName
     } = avatarProps
     return(
          <Link
          to={`/${userName}`}
          >
               <img
               className="user-avatar border"
               src={avatar}
               alt='avatar'
               />
          </Link>
     )
}

export default Avatar