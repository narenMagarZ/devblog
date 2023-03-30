import { Link } from "react-router-dom"

function NotFoundpage(){
     return(
          <div
          style={{
               height:'100vh'
          }}
          className="d-flex bg-white flex-column
          w-100 border justify-content-center align-items-center"
          >
               <div 
               style={{
                    borderRadius:20
               }}
               className="p-4 mb-4 bg-dark-blue-l">
                    <div
                    style={{
                         padding:100
                    }}
                    className="rounded bg-dark"
                    >
                         <h1
                         style={{
                              fontSize:50
                         }}
                         className="text-white"
                         >
                              404
                         </h1>
                    </div>
               </div>
               <div
               className="d-flex flex-column justify-content-center 
               align-items-center"
               >
                    <p
                    className="m-0 fs-4 mb-2"
                    >This page does not exist</p>
                    <Link
                    to='/'
                    className="text-decoration-underline fs-5"
                    >
                         Return to Home Page
                    </Link>
               </div>
          </div>
     )
}

export default NotFoundpage