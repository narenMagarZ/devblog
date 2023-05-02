import BaseController from "../base-controller";
import {Request,Response,NextFunction} from 'express'
import getGithubAccessToken from "../../utils/get-access-token";
import getGithubUser from "../../utils/get-github-user";
import {MISSING_PARAMETERS,USER_CREATED,USER_LOGGED_IN,AUTH_FAILED,USER_PROFILE_UPDATED,USER_NOT_FOUND,MISSING_USERNAME} from '../../config/constants'
import userService from "../../services/user-service";
import getToken from "../../utils/get-token";
import getGithubEmail from "../../utils/get-github-email";
import _ from "lodash";
import createArticleLink from "../../utils/create-article-link";
import { IRequest } from "../../interfaces";
import getGithubUserRepos from "../../utils/get-user-github-repos";
import formatDateToMMMDDYYYY from "../../utils/formatDateToMMMDDYYYY";

class UserController extends BaseController{
     constructor(){
          super()
          this.createUser = this.createUser.bind(this)
          this.deleteUser = this.deleteUser.bind(this)
          this.updateUser = this.updateUser.bind(this)
          this.getUser = this.getUser.bind(this)
     }
     async createUser(req:Request,res:Response){
          const {code,client_id,client_secret,redirect_uri}=req.body
          if(!code || !client_id || !client_secret || !redirect_uri){
               return this.sendErrorResponse(res,400,MISSING_PARAMETERS)
          }
          try{
               const accessToken =  await getGithubAccessToken(client_id,client_secret,code,redirect_uri)
               if(!accessToken){
                    return this.sendErrorResponse(res,401,AUTH_FAILED)
               }
               const [githubUser,githubEmail] = await Promise.all([
                    getGithubUser(accessToken),
                    getGithubEmail(accessToken)
               ])

               const {email} = githubEmail.find((email:any)=>email.primary)
               let user = await userService.getUserByEmail(email)
               if(user){
                    const token = getToken(user.id,email)
                    this.setAuthorizationHeader(res,token)
                    return this.sendSuccessResponse(res,201,USER_LOGGED_IN)
               }
               const newUser = await userService.createGithubUser(githubUser,email)
               const token = getToken(newUser.id,email)
               this.setAuthorizationHeader(res,token)
               return this.sendSuccessResponse(res,200,USER_CREATED)
          }
          catch(err){
               console.error(err)
               return this.sendErrorResponse(res,400,err.message)
          }
     }
     async updateUser(req:IRequest,res:Response){
          const {id}=req.userData
          try{
               const user = await userService.findByIdAndUpdate(id,req.body)
               if(user){
                    return this.sendSuccessResponse(res,201,USER_PROFILE_UPDATED)    
               }
               return this.sendErrorResponse(res,404,USER_NOT_FOUND)
          }
          catch(err){
               return this.sendErrorResponse(res,400,err.message)
          }
     }
     async deleteUser(req:Request,res:Response){

     }
     async getUser(req:IRequest,res:Response){
          const {username}=req.params
          if(!username){
               return this.sendErrorResponse(res,400,MISSING_USERNAME)
          }
          const{id:userId}=req.userData
          try{
               const user = await userService.getUserByUsername(userId,username)
               console.log(user,'user')
               if(_.isEmpty(user)){
                    return this.sendErrorResponse(res,404,USER_NOT_FOUND)
               }
               const {repoUrl,articles,createdAt,...userDetail} = user[0]
               const githubRepos = getGithubUserRepos(repoUrl)
               const isMe = user[0].username === username
               const formattedArticles = articles.map(article=>{
                    const url = createArticleLink(article.title,article.articleId)
                    const publishedAt = formatDateToMMMDDYYYY(article.publishedAt)
                    return {
                         ...article,
                         url,
                         publishedAt
                    }
               })
               const joinedOn = formatDateToMMMDDYYYY(createdAt)
               return this.sendSuccessResponse(res,200,{
                    ...userDetail,
                    joinedOn,
                    repos:githubRepos,
                    isMe,
                    articles:formattedArticles
               })
          }
          catch(err){
               return this.sendErrorResponse(res,400,err.message)
          }
     }
     
}

export default new UserController()