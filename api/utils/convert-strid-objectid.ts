import mongoose from "mongoose";




function convertStrIdToObjectId(strId:string)
:mongoose.Types.ObjectId{
     return new mongoose.Types.ObjectId(strId)
}


export default convertStrIdToObjectId