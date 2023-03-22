


function SkillsOrLang(){
     const skils = 'Typescript, React, Next.js, docker'
     return(
          <div
          className="bg-white rounded border"
          >
               <header className="">
                    <h5 className="my-2 mx-3">Skills/Languages</h5>
                    <hr className="border m-0"/>
               </header>
               <div className="p-3">
                    <p className="m-0">
                         <span
                         className="card-secondary-color"
                         >{skils}</span>
                    </p>
               </div>
          </div>
     )
}

export default SkillsOrLang