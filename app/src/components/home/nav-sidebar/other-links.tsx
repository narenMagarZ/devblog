import { Link } from "react-router-dom"
import { CodeOfConduct, PrivacyPolicy, TermsOfUse } from "../../../custom icon"



function OtherLinks(){
     return(
          <div className="mb-4">
               <strong>Other</strong>
               <div className="d-flex flex-column gap-1">
                    <Test
                    label="Code of Conduct"
                    path="code-of-conduct"
                    Icon={CodeOfConduct}
                    />
                    <Test
                    label="Privacy Policy"
                    path="privacy"
                    Icon={PrivacyPolicy}
                    />
                    <Test
                    label="Terms of use"
                    path="terms"
                    Icon={TermsOfUse}
                    />
               </div>
          </div>
     )
}

function Test({
     label,
     path,
     Icon
}:{
     label:string,
     path:string,
     Icon:any
}){
     return (
          <Link
          to={path}
          className='
          aside-navbar-link
          d-flex align-items-center gap-2 rounded p-2'
          >
               <Icon/>
               {label}
          </Link>
     )
}
export default OtherLinks