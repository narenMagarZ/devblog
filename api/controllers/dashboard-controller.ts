
import { Response } from "express"
import { IRequest } from "../interfaces"
import userService from "../services/user-service"
import BaseController from "./base-controller"
import _ from 'lodash'
import createArticleLink from "../utils/create-article-link"

class DashboardController extends BaseController{
     async getDashboard(req:IRequest,res:Response){
          const {id}=req.userData
          try{
               const dashboard = await userService.getUserDashboard(id)
               if(!_.isEmpty(dashboard)){
                    const username = dashboard[0].username
                    for(let article of dashboard[0].articles){
                         const articleStatus = article.status
                         // article.url = join('/',username,article.url)
                         console.log(article,'article')
                         createArticleLink(article.url,article.id)
                         if(articleStatus === 'publish'){
                              const articlePublishedDate = article.publishedAt
                              article.views = article.views ? article.views : 0
                              // article.publishedAt = createRelativeDateTime(articlePublishedDate)
                              // article.updatedAt = createRelativeDateTime(article.updatedAt||articlePublishedDate)
                         }
                    }
                    dashboard[0].totalPosts = dashboard[0].article.length
                    return this.sendSuccessResponseWithData(res,200,dashboard[0])
               }
               return this.sendErrorResponse(res,400,'')

          }
          catch(err){
               return this.sendErrorResponse(res,400,err.message)
          }
     }
}

export default new DashboardController()