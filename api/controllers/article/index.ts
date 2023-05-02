import BaseController from "../base-controller";
import {Request,Response} from 'express'
import articleService from "../../services/article-service";
import checkAuth from "../../utils/check-auth";

class ArticleController extends BaseController{
     async createArticle(req:Request,res:Response){
          try{

          }
          catch(err){

          }
     }
     async updateArticle(req:Request,res:Response){
          try{
               const{id}=req.params
               const{username,slug}=req.query
               const{title,content,tags,coverImge}=req.body
          }
          catch(err){
               this.sendErrorResponse(res,400,err.message)
          }
     }
     async deleteArticle(req:Request,res:Response){
          try{
               const{id}=req.params
               const article = articleService.deleteArticleById(id)
               if(!article){
                    this.sendNotFoundResponse(res,'Article not found')
                    return
               }
               this.sendSuccessResponse(res,200,article)

          }
          catch(err){
               this.sendErrorResponse(res,400,err.message)
          }
     }
     
}

export default ArticleController