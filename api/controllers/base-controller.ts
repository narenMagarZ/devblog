import {Response} from 'express'

class BaseController {
    protected setAuthorizationHeader(res:Response,token:string){
      res.setHeader('Authorization',`Bearer ${token}`)
    }
    protected sendSuccessResponse(res:Response,statusCode:number,message:string){
      res.status(statusCode).json({
        status:'success',
        message
      })
    }
    protected sendSuccessResponseWithData(res:Response, statusCode:number, data:any) {
      res.status(statusCode).json({
        status: 'success',
        data
      });
    }
   
   protected sendErrorResponse(res:Response, statusCode:number, message:string) {
      res.status(statusCode).json({
        status: 'error',
        message
      });
    }
   
    protected sendNotFoundResponse(res:Response, message:string) {
      res.status(404).json({
        status: 'fail',
        message,
      });
    }
   
    protected handleRequest(res:Response) {
      res.status(500).json({
        status: 'error',
        message: 'Unhandled request'
      });
    }
  }
   
export default BaseController   