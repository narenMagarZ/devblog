
import { Link } from "react-router-dom"
import '../style.css'
export default function DevLogo(){
     return(
          <Link 
          className="dev-logo fw-bold fs-5 bg-dark text-white rounded p-2" 
          to='/'>
               Dev
          </Link>
     )
}