import User from "../../model/user"
import { IProfile } from "../../interfaces"
import userAggregationBuilder from '../../aggregations/user'

class UserService {
     async getUserByUsername(userId:string,username:string){
          const {userAggregation}=userAggregationBuilder
          const userData = await User.aggregate(userAggregation(userId,username))
          return userData
     }
     async findByIdAndUpdate(id:string,profile:IProfile){
          const updatedUser = await User.findByIdAndUpdate(id,{...profile})
          return updatedUser
     }
     async getUserByEmail(email:string){
          const user = await User.findOne({email})
          return user
     }
     async createGithubUser(githubUser:any,email:string){
          const {login:username,name,location,repoUrl,avatar}=githubUser
          const nameOrDefault = name||username
          const user = await new User({
               username,
               name:nameOrDefault,
               location,
               repoUrl,
               email,
               avatar
          }).save()
          return user
     }
     async getUserDashboard(userId:string){
          const {dashboardAggregation} = userAggregationBuilder
          const dashboardData = await User.aggregate(dashboardAggregation(userId))
          return dashboardData
     }
}

export default new UserService()