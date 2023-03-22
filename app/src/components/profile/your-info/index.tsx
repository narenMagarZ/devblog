import AvailableFor from "./available-for"
import CurrentlyHackingOn from "./currently-hacking-on"
import CurrentlyLearning from "./currently-learning"
import GithubRepos from "./github-repos"
import OtherInfo from "./other-info"
import SkillsOrLang from "./skills-or-lang"



function YourInfo(){
     return(
          <div 
          style={{
               maxWidth:280
          }}
          className="d-flex 
          your-info-wrapper
          flex-column gap-3">
               <GithubRepos/>
               <CurrentlyLearning/>
               <SkillsOrLang/>
               <CurrentlyHackingOn/>
               <AvailableFor/>
               <OtherInfo/>
          </div>    
     )
}

export default YourInfo