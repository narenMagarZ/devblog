
async function getGithubUser(accessToken:string){
     const response = await fetch('https://api.github.com/user',{
          headers:{
               'accept' : 'application/json',
               'Authorization' : `Bearer ${accessToken}`
          }                         
     })
     if(response.status !== 200 && !response.ok){
          throw new Error(`failed to fetch data from github`)
     }     
     return await response.json()
}

export default getGithubUser