import Follower from "../../model/follower"
import objectId from "../../utils/str-to-objectid"

class FollowerService{
     async findExistingFollower(followerId:string,followeeId:string){
          return await Follower.findOne({
               follower:objectId(followerId),
               followee:objectId(followeeId)
          })
     }
     async createFollower(followerId:string,followeeId:string){
          return await new Follower({
               follower:followerId,
               followee:followeeId
          }).save()
     }
     async removeFollower(followerId:string,followeeId:string){
          return await Follower.deleteOne({
               follower:followerId,
               followee:followeeId
          })
     }
}

export default new FollowerService()