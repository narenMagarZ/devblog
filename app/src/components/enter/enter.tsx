import { Link, useSearchParams } from "react-router-dom"
import NavBar from "../navbar/navbar"

export default function EnterForm(){
     const searchParams = useSearchParams()
     console.log(searchParams[0].get('state'))

     return (
          <form>
               <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="input-field"/>
               </div>
               <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                    className="input-field"/>
               </div>
               <div className="mb-3 form-check">
                    <input type='checkbox' className="form-check-input" />
                    <label className="form-check-label">Remember me</label>
               </div>
               <button type="submit" className="btn btn-primary w-100 my-2">Continue</button>
               <div className="text-center w-100 my-2">
                    <Link 
                    style={{
                         fontSize:14
                    }}
                    className="text-decoration-none"
                    to='/users/password/new'>I forgot my password</Link>
               </div>
          </form>
     )
}