



const SkeletonLoading = ()=>{
     return(
          <div className="skeleton-card rounded">
               <div className="skeleton-card-comp w-50 p-3 rounded skeleton"></div>
               <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="skeleton-card-comp w-15 rounded skeleton"></div>
                    <div className="skeleton-card-comp w-20 rounded skeleton"></div> 
               </div>
               <div className="skeleton-card-comp w-80 rounded skeleton"></div>
               <div className="skeleton-card-comp w-60 rounded skeleton"></div>
               <div className="skeleton-card-comp w-75 rounded skeleton"></div>
          </div>
     )
}


export default SkeletonLoading