
import { Link } from "react-router-dom"
import { 
     Facebook, 
     Fosstodon, 
     Github, 
     Instagram, 
     Twitch, 
     Twitter } from "../../../custom icon"

function SocialMediaListing(){
     return(
          <div className="mb-4">
               <SocialMediaIcon 
               path="https://twitter.com/thepracticaldev" 
               Icon={Twitter} />
               <SocialMediaIcon 
               path="https://facebook.com/thepracticaldev" 
               Icon={Facebook} />
               <SocialMediaIcon 
               path="https://github.com/forem" 
               Icon={Github} />
               <SocialMediaIcon 
               path="https://instagram.com/thepracticaldev" 
               Icon={Instagram} />
               <SocialMediaIcon 
               path="https://twitch.com/thepracticaldev" 
               Icon={Twitch} />
               <SocialMediaIcon 
               path="https://fosstodon.org/@thepracticaldev" 
               Icon={Fosstodon} />
          </div>
     )
}

function SocialMediaIcon({
     path,
     Icon
}:{
     path:string,
     Icon:any
}){
     return (
          <Link
          className="rounded p-2"
          to={path}
          >
               <Icon/>
          </Link>
     )
}

export default SocialMediaListing