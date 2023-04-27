
import express from 'express'
import { 
     addArticleToReadList,
     confirmDelete, 
     createArticleDraft, 
     createArticlePreview, 
     deleteArticle, 
     editArticle, 
     fetchArticlesPreview, 
     manageArticle 
} from '../handler'


const articleRouter = express.Router()

articleRouter.get('/',fetchArticlesPreview)
articleRouter.get('/manage',manageArticle)
articleRouter.get('/edit',editArticle)
articleRouter.get('/delete_confirm',confirmDelete)


articleRouter.delete('/:articleId',deleteArticle)



articleRouter.put('/draft',createArticleDraft)




articleRouter.post('/preview',createArticlePreview)



articleRouter.patch('/add-to-readlist',addArticleToReadList)
export default articleRouter