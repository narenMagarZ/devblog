

async function getGithubUserRepos(reposUrl:string){
     const response = await fetch(reposUrl)
     const data = await response.json()
     const repos : {
          name:string,
          description:string,
          language:string,
          url:string
     }[] = []
     if(data){
          if(Array.isArray(data))
               data.map((repo)=>{
                    const {
                         name,
                         description,
                         language,
                         visibility,
                         html_url
                    } = repo
                    if(visibility==='public')
                         repos.push({
                              name,
                              description,
                              language,
                              url:html_url
                         })
               })
     }
     return repos
}

export default getGithubUserRepos