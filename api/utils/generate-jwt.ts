import jwt from 'jsonwebtoken'
function generateJwt(id:string):string{
     const token = jwt.sign({
          id,
     },process.env.SECRET_KEY as string,{
          expiresIn : 2592000000
     })
     return token
}

export default generateJwt


2.592e+9