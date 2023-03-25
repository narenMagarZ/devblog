

function extractComment(comments:any){
     let myComments = {}
     const levels = {}
     const map = new Map<string,string>()
     for(let i of comments){
          const parentId = i.parentCommentId
          const commentId = i.id
          if(parentId){
               let level = ''
               for(let j in levels){
                    if(levels[j].includes(parentId)){
                         level = j
                    }
               }
               let ancestorsId = ''
               let anId : string | undefined = ''
               switch(level){
                    case "first":
                         if(!myComments[parentId]['replies'])
                              myComments[parentId]['replies'] = {}
                         myComments[parentId]['replies'][commentId] = i
                         if(!levels['second'])
                              levels['second'] = []
                         levels['second'].push(commentId)
                         ancestorsId = parentId.concat('/',commentId)
                         map.set(commentId,ancestorsId)
                         break;
                    case "second":
                         anId = map.get(parentId)
                         if(anId){
                              const ids = anId.split('/')
                              if(!myComments[ids[0]]['replies'][ids[1]]['replies'])
                              myComments[ids[0]]['replies'][ids[1]]['replies'] = {}
                              myComments[ids[0]]['replies'][ids[1]]['replies'][commentId] = i
                              if(!levels['third'])
                                   levels['third'] = []
                                   levels['third'].push(commentId)
                                   ancestorsId = anId.concat('/',commentId)
                                   map.set(commentId,ancestorsId)
                              }
                              break;
                    case "third":
                         anId = map.get(parentId)
                         if(anId){
                              const ids = anId.split('/')
                              if(!myComments[ids[0]]['replies'][ids[1]]['replies'][ids[2]]['replies'])
                              myComments[ids[0]]['replies'][ids[1]]['replies'][ids[2]]['replies'] = {}
                              myComments[ids[0]]['replies'][ids[1]]['replies'][ids[2]]['replies'][commentId] = i
                              if(!levels['fourth'])
                                   levels['fourth'] = []
                              levels['fourth'].push(commentId)
                              ancestorsId = anId.concat('/',commentId)
                              map.set(commentId,ancestorsId)
                         }
                         break;
                    case "fourth":
                         anId = map.get(parentId)
                         if(anId){
                              const ids = anId.split('/')
                              if(!myComments[ids[0]]['replies'][ids[1]]['replies'][ids[2]]['replies'][ids[3]]['replies'])
                              myComments[ids[0]]['replies'][ids[1]]['replies'][ids[2]]['replies'][ids[3]]['replies'] = {}
                              myComments[ids[0]]['replies'][ids[1]]['replies'][ids[2]]['replies'][ids[3]]['replies'][commentId] = i
                              if(!levels['fifth'])
                                   levels['fifth'] = []
                              levels['fifth'].push(commentId)
                              ancestorsId = anId.concat('/',commentId)
                              map.set(commentId,ancestorsId)
                         }
                         break;
                    default:
                         break
               }
          } else {
               // obvious the 1st level
               if(!levels['first'])
                    levels['first'] = []                         
               levels['first'].push(commentId)
               myComments[commentId] = i
          }
     }
     return myComments
}
export default extractComment