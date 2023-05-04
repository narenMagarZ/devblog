

async function getGithubEmail(accessToken:string){
     const response = await fetch('https://api.github.com/user/emails',{
          headers :{
               'accept':'application/json',
               'Authorization' : `Bearer ${accessToken}`
          }
     })
     if(response.status !== 200 && !response.ok){
          throw new Error(`failed to fetch data from github`)
     }
     return response.json()
}

export default getGithubEmail