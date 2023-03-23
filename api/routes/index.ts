import express from 'express'
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


const apiRouter = express.Router()



// unprotected routes
apiRouter.post('/auth/github',githubEnter)
apiRouter.post('/auth/twitter',twitterEnter)


apiRouter.get('/search',searchBlogPost)
apiRouter.get('/articles',fetchArticlesPreview)
apiRouter.get('/blogposts',(req,res)=>{
     res.send('posts')
})


// protected routes
const authMiddleware = passport.authenticate('jwt',{
     session:false
})
// apiRouter.use(authMiddleware)
apiRouter.put('/article/draft',authMiddleware,createArticleDraft)
apiRouter.post('/article/preview',authMiddleware,createArticlePreview)
apiRouter.post('/image_upload',upload.single('image'),generateImageUrl)
apiRouter.put('/profile',updateProfile)
apiRouter.put('/customize',customizeAccount)
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
apiRouter.get('/article/draft',authMiddleware,readLatestArticleDraft)
apiRouter.route('/article/new')
.get(authMiddleware,getOrCreateUnpublishedArticle)
.put(authMiddleware,updateUnpublishedArticle)
apiRouter.get('/:user/:articleslug',(req,res,next)=>{
     authMiddleware.bind(null,req,res,next)('string')
},readArticle)

apiRouter.post('/article/publish',
authMiddleware,
publishArticle)

apiRouter.patch('/reaction',reactionOnPost)



export {apiRouter}