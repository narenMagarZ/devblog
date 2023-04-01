import express, { NextFunction,Request, Response } from 'express'
import fetchArticlesPreview from './handler/fetch-articles-preview'
import uploadImage from './handler/upload-image'
import upload from '../utils/file_handler'
import updateProfile from './handler/update-profile'
import githubEnter from './handler/auth/github-enter'
import twitterEnter from './handler/auth/twitter-enter'
import customizeAccount from './handler/customize-account'
import searchBlogPost from './handler/search-blogpost'
import generateImageUrl from './handler/generate-image-url'
import createArticlePreview from './handler/create-article-preview'
import readLatestArticleDraft from './handler/read-latest-article-draft'
import getOrCreateUnpublishedArticle from './handler/create-or-get-unpublished-article'
import updateUnpublishedArticle from './handler/update-unpublished-article'
import createArticleDraft from './handler/create-article-draft'
import readArticle from './handler/read-article'
import passport from 'passport'
import publishArticle from './handler/publish-article'
import reactionOnPost from './handler/reaction-on-post'
import commentOnPost from './handler/comment-on-post'
import likeOnComment from './handler/like-on-comment'
import readProfile from './handler/read-profile'
import dashboard from './handler/dashboard'
import deleteArticle from './handler/delete-article'
import confirmDelete from './handler/confirm-delete'
import editArticle from './handler/edit-article'
import manageArticle from './handler/manage-article'
import fetchProfileInfo from './handler/fetch-profile-info'
import readCustomizedProfileInfo from './handler/read-customized-profile-info'
import fetchTags from './handler/fetch-tags'
import viewTagInfo from './handler/view-tag-info'
import followTag from './handler/follow-tag'
import readArticlesAndTags from './handler/read-articles-and-tags'
import authenticate from '../utils/authenticate'
import authCheck from './handler/auth-check'
import followUser from './handler/follow-user'
import addArticleToReadList from './handler/add-article-to-list'
import fetchReadingList from './handler/fetch-reading-list'
import saveChanges from './handler/save-changes'


const apiRouter = express.Router()



// unprotected routes
apiRouter.post('/auth/github',githubEnter)
apiRouter.post('/auth/twitter',twitterEnter)
apiRouter.get('/tags',fetchTags)
apiRouter.get('/search',searchBlogPost)
apiRouter.get('/articles',fetchArticlesPreview)
apiRouter.get('/blogposts',(req,res)=>{
     res.send('posts')
})


// protected routes
const authMiddleware = passport.authenticate('jwt',{
     session:false
})
     

apiRouter.get('/auth-check',authenticate,authCheck)
apiRouter.get('/tag/:tag',authenticate,viewTagInfo)

apiRouter.get('/manage/article',authMiddleware,manageArticle)
apiRouter.get('/article/edit',authenticate,editArticle)
apiRouter.get('/delete_confirm',authenticate,confirmDelete)
apiRouter.delete('/article/:articleId',authenticate,deleteArticle)
apiRouter.put('/article/draft',authenticate,createArticleDraft)
apiRouter.post('/article/preview',authMiddleware,createArticlePreview)
apiRouter.post('/image_upload',upload.single('image'),generateImageUrl)
apiRouter.put('/profileinfo',authMiddleware,updateProfile)

apiRouter.route('/profile/customize')
.get(authMiddleware,readCustomizedProfileInfo)
.put(authMiddleware,customizeAccount)


apiRouter.post('/image_uploads',
upload.fields([
     {
          name : 'cover-image',
          maxCount : 1,
     },
     {
          name:'body-image',
          maxCount : 1
     }
]),
uploadImage)


apiRouter.get('/user-feed',authenticate,readArticlesAndTags)
apiRouter.get('/profile/:username',authenticate,readProfile)
apiRouter.get('/article/draft',authMiddleware,readLatestArticleDraft)
apiRouter.route('/article/new')
.get(authenticate,getOrCreateUnpublishedArticle)
.put(authenticate,updateUnpublishedArticle)

apiRouter.get('/:user/:articleslug',authenticate,readArticle)

apiRouter.route('/article/publish')
.post(authenticate,publishArticle)
.put(authenticate,saveChanges)


apiRouter.get('/dashboard',authenticate,dashboard)
apiRouter.patch('/reaction',authenticate,reactionOnPost)
apiRouter.post('/comment',authenticate,commentOnPost)
apiRouter.patch('/like/comment',authenticate,likeOnComment)
apiRouter.get('/profileinfo',authMiddleware,fetchProfileInfo)

apiRouter.patch('/follows',authMiddleware,followTag)

apiRouter.patch('/follower',authenticate,followUser)

apiRouter.patch('/article/add-to-readlist',authenticate,addArticleToReadList)

apiRouter.get('/readinglist',authenticate,fetchReadingList)


export {apiRouter}