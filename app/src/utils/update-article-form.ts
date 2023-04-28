
import { articleApi } from "./base_api_url"


type articleformdata = {
     articleId?:string,
     title:string,
     tags:string[],
     markdown:string,
     coverImageUrl:string
}
async function updateArticleForm({
     articleId='',
     title,
     tags,
     markdown,
     coverImageUrl
}:articleformdata){
     try{
          await articleApi.put('/new',
          {
               articleId,
               coverImageUrl,
               title,
               tags,
               markdown
          })
     }catch(err){
          console.error(err)
     }
}

export default updateArticleForm