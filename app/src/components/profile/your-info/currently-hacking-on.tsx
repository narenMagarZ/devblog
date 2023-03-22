



function CurrentlyHackingOn(){
     const currentlyHackingOn = 'Open source projects'
     return(
          <div
          className="border rounded bg-white"
          >
               <header className="">
                    <h5 className="my-2 mx-3">Currently Hacking On</h5>
                    <hr className="border m-0"/>
               </header>
               <div className="p-3">
                    <p className="m-0">
                         <span className="card-secondary-color">{currentlyHackingOn}</span>
                    </p>
               </div>
          </div>
     )
}

export default CurrentlyHackingOn