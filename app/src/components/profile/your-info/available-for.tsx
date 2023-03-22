


function AvailableFor(){
     const availableFor = 'React, Web development, typescript, nodejs, mongodb, docker, testing'
     return(
          <div
          className="border rounded bg-white"
          >
               <header className="">
                    <h5 className="my-2 mx-3">Available For</h5>
                    <hr className="border m-0"/>
               </header>
               <div className="p-3">
                    <p className="m-0">
                         <span
                         className="card-secondary-color"
                         >{availableFor}</span>
                    </p>
               </div>
          </div>
     )
}

export default AvailableFor