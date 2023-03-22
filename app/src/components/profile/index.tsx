import { useQuery } from "react-query"
import baseApiUrl from "../../utils/base_api_url"
import ProfileCard from "./profile-card"
import './style.css'
import YourArticles from "./your-articles"
import YourInfo from "./your-info"



function ProfilePage(){
     const {
          data,
          status
     } = useQuery('profile',async()=>{
          const respone = await baseApiUrl.get('/profile')
          if(respone.status === 200 && respone.statusText){
               return await respone.data
          }
          else throw new Error('error')
     })
     const defaultBrandTheme = '#000000'
     return(
          <div>
               <header>
                    <div
                    style={{
                         backgroundColor:defaultBrandTheme
                    }}
                    className="brand-container"></div>
               </header>
               <div
               className="d-flex justify-content-center 
               align-items-center flex-column"
               >
                    <ProfileCard/>
                    <div
                    style={{
                         maxWidth:1000
                    }}
                    className="d-flex gap-2 container mt-2"
                    >
                         <YourInfo/>
                         <YourArticles/>
                    </div>
               </div>
          </div>
     )
}

export default ProfilePage