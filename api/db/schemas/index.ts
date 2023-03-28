import articleModel from "./article-schema"
import userModel from "./userschema" 
import reactionOnPostModel from "./reaction-on-post-schema"
import followersModel from "./followers"
import commentOnPostModel from "./comment-schema"


export const Article = articleModel
export const User = userModel
export const ReactionOnPost = reactionOnPostModel
export const Follower = followersModel
export const Comment = commentOnPostModel