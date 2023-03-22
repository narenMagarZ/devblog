import { Email, Github, Joined, PersonalWebsite, Twitter } from "../../custom icon"


function ProfileCard(){
     const defaultBrandTheme = '#000000'
     return(
          <div 
          style={{
               maxWidth:1000
          }}
          className="rounded p-0 container bg-white border
          position-relative
          ">
               <div
               style={{
                    marginTop:-40
               }}
               className="bg-white rounded
               d-flex align-items-center justify-content-center"
               >
                    <img 
                    style={{
                         marginTop:-40,
                         border:`8px solid ${defaultBrandTheme}`
                    }}
                    className="lg-profile-avatar"
                    src="/simpson.jpg" alt='' />


               </div>
               <div
               style={{
                    top:-30,
                    right:10
               }}
               className="position-absolute"
               >
               <button
                    className="primary-btn rounded p-2"
                    >
                         Follow
                    </button>
               </div>
               <div 
               className="d-flex flex-column gap-3 p-2 align-items-center">
                    <h2 className="m-0">
                         <span>Adam Nathaniel Davis</span>
                    </h2>
                    <p
                    className="m-0"
                    >
                         <span>React acolyte, jack-of-al(programming)trades, full-stack developer</span>
                    </p>
                    <div 
                    className="d-flex profile-header-meta 
                    align-items-center flex-wrap gap-4">
                         <div>
                              <span>Surkhet, Nepal</span>
                         </div>
                         <div className="d-flex align-items-center gap-2">
                              <span>
                                   <Joined/>
                              </span>
                              <span>Joined on Mar 27, 2022</span>
                         </div>
                         <div className="d-flex align-items-center gap-2">
                              <span><Email/></span>
                              <a href="mailto:narenmagarz98@gmail.com">
                                   <span>
                                   narenmagarz98@gmail.com
                                   </span>
                              </a>
                         </div>
                         <div className="d-flex align-items-center gap-2">
                              <span>
                                   <PersonalWebsite/>
                              </span>
                              <a
                              href="https://narenmagar.com"
                              >
                                   <span>narenmagar.com</span>
                              </a>
                         </div>
                         <div>
                              <a href="https://github.com/narenMagarZ">
                                   <Github/>
                              </a>
                         </div>
                         <div>
                              <a href="https://twitter.com/narenmagarz">
                                   <Twitter/>
                              </a>
                         </div>
                    </div>
               </div>
               <hr className="border"/>
               <div 
               className="d-flex align-items-center
               mb-4 justify-content-center gap-4">
                    <div 
                    className="d-flex flex-column align-items-center">
                         <span className="color-base-60 fs-s">Education</span>
                         <span>Software Engineering</span>
                    </div>
                    <div
                    className="d-flex flex-column align-items-center"
                    >
                         <span className="fs-s color-base-60">Work</span>
                         <span>Frontend Software Enginner</span>
                    </div>
               </div>
          </div>
     )
}

export default ProfileCard