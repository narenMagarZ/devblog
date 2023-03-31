
function extractArticleIdFromArticleSlug(articleSlug:string){
     const index = articleSlug.lastIndexOf('-')
     return articleSlug.slice(index + 1,articleSlug.length)

}
export default extractArticleIdFromArticleSlug