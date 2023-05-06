import { Request } from "express";
export interface IRequest extends Request{
     userData:any
}

export interface IProfile {
     name:string
     userName:string
     email:string
     websiteUrl:string
     location:string
     bio:string
     currentlyLearning:string
     skills:string
     currentlyHackingOn:string
     availableFor:string
     work:string
     education:string
     brandColor:string
     picture:string
}