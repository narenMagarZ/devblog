import slugify from "slugify"

function createArticleLink(title:string,articleId:string){
     const slug = slugify(title,{
          lower:true,
          trim:true,
          strict:true
     })
     return `${slug}/${articleId}`
}


export default createArticleLink