import Article from '../../model/article'

class ArticleService{
     async deleteArticleById(articleId:string){
          const deletedArticle = await Article.findOneAndDelete({articleId})
          if(!deletedArticle){
               throw new Error('Article not found')
          }
          return deletedArticle
     }
}

export default new ArticleService()