import jwt from 'jsonwebtoken'
function getToken(id:string,email:string):string{
     const token = jwt.sign({
          id,
          email
     },process.env.SECRET_KEY as string,{
          expiresIn : 2592000000
     })
     return token
}

export default getToken

