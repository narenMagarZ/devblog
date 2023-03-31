import articleModel from "./article-schema"
import userModel from "./userschema" 
import reactionOnPostModel from "./reaction"
import followersModel from "./followers"
import commentOnPostModel from "./comment-schema"
import tagModel from "./tag-schema"
import notificationModel from "./notification"
import reactionModel from "./reaction"


export const Article = articleModel
export const User = userModel
export const ReactionOnPost = reactionOnPostModel
export const Follower = followersModel
export const Comment = commentOnPostModel
export const Tag = tagModel
export {
     notificationModel as Notification,
     reactionModel as Reaction
}