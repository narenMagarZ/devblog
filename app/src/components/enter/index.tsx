import {useSearchParams } from "react-router-dom"
import NavBar from "../navbar/navbar"
import EnterForm from "./enter"
import { Link } from "react-router-dom"
import Footer from "../footer"



export default function Enter(){
     const searchParams = useSearchParams()
     const enterState = searchParams[0].get('state')
     function enterWithGithub(){
          interface OauthParams {
               client_id:string
               redirect_uri:string
               scope:string
          }
          const {
               REACT_APP_GITHUB_CLIENT_ID,
               REACT_APP_GITHUB_REDIRECT_URI,
               REACT_APP_GITHUB_SCOPE
          } = process.env
          const githubOauthParam : OauthParams = {
               client_id:REACT_APP_GITHUB_CLIENT_ID as string,
               redirect_uri:REACT_APP_GITHUB_REDIRECT_URI as string,
               scope:REACT_APP_GITHUB_SCOPE as string
          }
          const {
               client_id,
               redirect_uri,
               scope
          } = githubOauthParam
          window.location.href = 
          `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`

}
     return (
          <div>
               <div>
                    <NavBar/>
               </div>
               <div 
               className="d-flex align-items-center justify-content-center py-2">
                    <div className="border d-flex flex-column bg-white border-mute rounded p-4">
                         <big className="text-center fw-bold">Welcome to DEV Community 👩‍💻👩‍💻</big>
                         <span className="text-center">DEV Community 👩‍💻👩‍💻 is a community of 1,003,540 amazing developers</span>
                         <div className="d-flex flex-column justify-content-center my-2">
                              <button
                              onClick={enterWithGithub}
                              className="btn btn-dark my-2">Continue with GitHub</button>
                              <button className="btn btn-primary">Continue with Twitter</button>
                         </div>
                         <div className="d-flex align-items-center justify-content-center my-3">
                              <span className="border border-mute border-top-0 flex-grow-1"></span>
                              {
                                   enterState !== 'new-user' ?
                                   <small className="mx-2">
                                        Have a password? Continue with your email address
                                   </small>
                                    :
                                    <small className="mx-2">
                                        Already have an account? 
                                        <Link 
                                        className="text-decoration-none"
                                        to='/enter'> Log in.</Link>
                                   </small>

                              }
                              

                              <span className="border border-mute border-top-0 flex-grow-1"></span>
                         </div>
                         {
                              enterState !== 'new-user' ? <EnterForm/> : ''
                         }
                    </div>
               </div>
               <Footer/>
          </div>
     )
}