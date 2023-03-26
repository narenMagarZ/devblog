import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import baseApiUrl from "../../utils/base_api_url"


function DeleteArticle(){
     const param = useParams()
     const navigate = useNavigate()
     console.log(param)
     async function handleDeletionOfArticle(){
          const response = await baseApiUrl.delete(`/article?user=${param.user}&articleSlug=${param.articleslug}`)
          if(response.status === 200){
               navigate('/dashboard')
          }

     }
     const {
          data,
          status
     } = useQuery<{
          title:string
     }>('delete',async()=>{
          const response = await baseApiUrl.get(`/delete_confirm?user=${param.user}&articleSlug=${param.articleslug}`)
          if(response.status===200){
               return await response.data
          }
     })
     if(data)
     return(
          <div className="d-flex align-items-center flex-column
          justify-content-center">
               <header
               className="container"
               >
                    <div
                    className="border rounded bg-white p-4"
                    >
                         <p className="m-0">
                              <span>{data.title}</span>
                         </p>
                    </div>
               </header>
               <div
               className="border bg-white rounded p-4 container"
               >
                    <h4 className="fw-bold color-base">Are you sure you want to delete this article?</h4>
                    <p>
                         <span>You cannot undo this action, perhaps you just want to</span>
                         <Link
                         to={'/edit'}
                         >
                             &nbsp;edit&nbsp;
                         </Link>
                         instead?
                    </p>
                    <div
                    className="d-flex gap-2"
                    >
                         <button
                         onClick={handleDeletionOfArticle}
                         className="btn btn-danger"
                         >
                              Delete
                         </button>
                         <Link
                         className="btn btn-secondary"
                         to={'/edit'}
                         >
                              Edit
                         </Link>
                         <Link 
                         className="btn secondary-bg"
                         to={'/dashboard'}>
                              Dismiss
                         </Link>
                    </div>
               </div>
          </div>
     )
     else return <></>
}


export default DeleteArticle