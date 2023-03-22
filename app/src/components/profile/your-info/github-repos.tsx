import { Link } from "react-router-dom"


function GithubRepos(){
     const myRepos = [
          {
               name:'devBlog',
               lang:'Typescript'
          },
          {
               name:'facebook.com-clone',
               desc:'this is clone of facebook.com',
               lang:'Javascript'
          }
     ]
     return(
          <div
          className="border rounded bg-white"
          >
               <header className="">
                    <h5 className="my-2 mx-3">GitHub Repositories</h5>
               </header>
               <hr className="border m-0"/>
               <div
               className="p-3 py-2">
                    {
                         myRepos.map(({name,lang,desc})=>{
                              return(
                                   <Link
                                   key={name}
                                   className="repo-link d-flex flex-column"
                                   to='https://github.com/repo'
                                   >
                                        <h5 className="repo-name m-0">{name}</h5>
                                        {
                                             desc && <span className="repo-desc">{desc}</span>
                                        }
                                        <span className="repo-lang">{lang}</span>
                                   </Link>
                              )
                         })
                    }
               </div>
          </div>
     )
}
export default GithubRepos