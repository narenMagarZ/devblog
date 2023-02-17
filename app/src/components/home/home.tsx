import NavBar from "../navbar/navbar";

export default function Home(){
     return(
          <div className="position-relative">
               <div className="position-absolute w-100">
                    <NavBar/>
               </div>
          </div>
     )
}