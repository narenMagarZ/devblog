import { Link } from "react-router-dom"
import { 
     Home, 
     ReadingList, 
     Listings, 
     Podcasts, 
     Videos,
     Tags,
     Faq,
     ForemShop,
     Sponsors,
     About,
     Contact
} from "../../../custom icon"


function LinkListing(){
     return(
          <nav
          className="d-flex flex-column gap-1 mb-4"
          >
               <Test
               label="Home"
               Icon={Home}
               path=''
               />
               <Test
               label="Reading List"
               Icon={ReadingList}
               path='readinglist'
               />
               <Test
               label="Listings"
               Icon={Listings}
               path='listings'
               />              
               <Test
               label="Podcasts"
               Icon={Podcasts}
               path='podcasts'
               />
               <Test
               label="Videos"
               Icon={Videos}
               path='vidoes'
               />
               <Test
               label='Tags'
               Icon={Tags}
               path='tags'
               />
               <Test
               label="FAQ"
               Icon={Faq}
               path='faq'
               />
               <Test
               label="Forem Shop"
               Icon={ForemShop}
               path='shop.forem.com'
               />
               <Test
               label="Sponsors"
               Icon={Sponsors}
               path='sponsorships'
               />
               <Test
               label='about'
               Icon={About}
               path='about'
               />
               <Test
               label="Contact"
               Icon={Contact}
               path='contact'
               />
          </nav>
     )
}

function Test({
     Icon,
     label,
     path
}:{
     Icon:any,
     label:string,
     path:string
}){
     return(
          <Link
          className="
          aside-navbar-link
          d-flex rounded p-2 align-items-center gap-2"
          to={path}
          >
          <Icon/>
          {label}
          </Link>
     )
}

export default LinkListing