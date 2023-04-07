import mongoose from "mongoose"


function objectId(id:string){
     return new mongoose.Types.ObjectId(id)
}

export default objectId