import ArticlePreviewCard from "./article-preview-card"


function YourArticles(){
     const fakeArticle =[
          {
               imageUrl:'/simpson.jpg',
               title:'How senior developers sabotage interviews',
               tags:['career','beginners','productivity'],
               reactions:11,
               comments:5,
               readTime:'5 min',
               user:{
                    avatarUrl:'/simpson.jpg',
                    username:'naren',
                    postDate:'mar 20'
               }
          }
     ]
     return(
          <div
          className=""
          >
               {
                    fakeArticle.map((article,i)=>{
                         return(
                              <ArticlePreviewCard
                              key={i}
                              {...article}
                              />
                         )
                    })
               }
             
          </div>
     )
}

export default YourArticles