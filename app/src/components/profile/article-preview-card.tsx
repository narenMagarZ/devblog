import { Link } from "react-router-dom";
import User from "../../shared component/article-preview-card/user";
import Title from "../../shared component/article/title";
import Tags from "../../shared component/article-preview-card/tags";
import Meta from "../../shared component/article-preview-card/meta";


interface IArticlePreviewCardProps {
     imageUrl: string;
     user: IUserProps;
     title: string;
     tags: string[];
     reactions: number;
     readTime: string;
     comments: number
   }
   
   function ArticlePreviewCard({
     imageUrl,
     user,
     title,
     tags,
     reactions,
     readTime,
     comments
   }: IArticlePreviewCardProps) {
     return (
       <div className="article-preview-card">
         <div className="content">
           <User {...user} />
           <Title title={title} />
           <Tags tags={tags} />
           <Meta reactions={reactions} comments={comments} readTime={readTime} />
         </div>
       </div>
     );
   }
   
export default ArticlePreviewCard;
