import LinkListing from "./links-listing"
import MyTagListing from "./my-tags-listing"
import OtherLinks from "./other-links"
import SocialMediaListing from "./social-media-listing"




function NavSidebar(){
     const myTags = [
          {
               path:'machinelearning'
          },
          {
               path:'testing'
          },
          {
               path:'webdev'
          },
          {
               path:'aws'
          },
          {
               path:'python'
          },
          {
               path:'productivity'
          },
          {
               path:'typescript'
          },
          {
               path:'blockchain'
          },
          {
               path:'git'
          },
          {
               path:'career'
          },
          {
               path:'docker'
          },
          {
               path:'linux'
          },
          {
               path:'ubuntu'
          },
          {
               path:'javascript'
          },
          {
               path:'beginners'
          },
          {
               path:'react'
          },
          {
               path:'devops'
          },
          {
               path:'opensource'
          },
          {
               path:'go'
          },
          {
               path:'sql'
          },
          {
               path:'webassembly'
          },
          {
               path:'vim'
          },
          {
               path:'kubernetes'
          },
          {
               path:'npm'
          },
          {
               path:'computerscience'
          }
     ]
     return(
          <div
          className="p-2"
          >
               <LinkListing/>
               <OtherLinks/>
               <SocialMediaListing/>
               <MyTagListing
               myTags={myTags}
               />
          </div>
     )
}


export default NavSidebar