import {
     Request,
     Response
} from 'express'
import {User} from '../../../db/schemas'
import createCookie from '../../../utils/create-cookie'

interface GithubEnterReqBody {
     code : string
     client_id:string
     client_secret:string
     redirect_uri:string
}

async function githubEnter(req:Request<{},{},GithubEnterReqBody>,res:Response){
     const {
          code,
          client_id,
          client_secret,
          redirect_uri          
     } = req.body 
     if(!code || !client_id || !client_secret || !redirect_uri)
          return res.status(401).json({
               msg:'unauthorized request'
          })
     try{
               const response = await 
               fetch(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}`,
               {
                    method : 'POST',
                    headers : {
                         accept : 'application/json'
                    }
               })
               if(!response.ok) throw new Error('github authentication failed')
               const {access_token} = await response.json() 
               if(!access_token) 
                    return res.status(401).json({
                         msg:'unauthorized request'
                    })
                    const getUser = async ()=>{
                              const response = await fetch('https://api.github.com/user',{
                                   headers:{
                                        'accept' : 'application/json',
                                        'Authorization' : `Bearer ${access_token}`
                                   }                         
                              })
                              if(response.status !== 200 && !response.ok)
                                   throw new Error(`failed to fetch data from github`)
                              return response.json()
                    }
                    const getEmail = async()=>{
                              const response = await fetch('https://api.github.com/user/emails',{
                                   headers :{
                                        'accept':'application/json',
                                        'Authorization' : `Bearer ${access_token}`
                                   }
                              })
                              if(response.status !== 200 && !response.ok)
                                   throw new Error(`failed to fetch data from github`)
                              return response.json()
                    }
                    const [userDetail,emailDetail] = await Promise.all([
                         getUser(),
                         getEmail()
                    ])
                    let {
                         login:userName,
                         avatar_url:picture,
                         name,
                         location,
                         repos_url:repoUrl
                    } = userDetail
                    const {
                         email
                    } = emailDetail.find((email:any)=>email.primary)
                    let user = await User.findOne({
                         email,
                    })
                    if(user){
                         createCookie(res,user.id)
                         return res.status(200).json({
                              msg:'user entered in'
                         })
                    }else{
                         name = name ? name : userName
                         user = new User({
                              userName,
                              name,
                              location,
                              repoUrl,
                              email,
                              picture,
                              accountType:'github'
                         })
                         await user.save()
                         createCookie(res,user.id)
                         return res.status(201).json({
                              msg:'user created and entered successfully.'
                         })
                    }
     }
     catch(err){
          console.error(err)
          return res.status(500).json({
               msg:'failed to authenticate with github.'
          })
     }
}

export default githubEnter