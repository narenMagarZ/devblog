



function Dashboard(){
     return(
          <div className="d-flex align-items-center justify-content-center">
               <header className="d-flex flex-column">
                    <h2>Dashboard</h2>
                    <div
                    className="d-flex align-items-center gap-3"
                    >
                         <div className="bg-white rounded p-3 border">
                              <h3 className="m-0">
                                   <span>0</span>
                              </h3>
                              <p className="text-secondary">Total post reactions</p>
                         </div>
                         <div
                         className="bg-white rounded p-3 border"
                         >
                              <h3 className="m-0">
                                   <span>500</span>
                              </h3>
                              <p className="text-secondary">Total post views</p>
                         </div>
                         <div
                         className="bg-white rounded p-3 border"
                         >
                              <h3 className="m-0">
                                   <span>0</span>
                              </h3>
                              <p className="text-secondary">Listings created</p>
                         </div>
                         <div
                         className="bg-white rounded p-3 border"
                         >
                              <h3 className="m-0">
                                   <span>0</span>
                              </h3>
                              <p className="text-secondary">Credits available</p>
                         </div>
                    </div>
               </header>
               
          </div>
     )
}

export default Dashboard