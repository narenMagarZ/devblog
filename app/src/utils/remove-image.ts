import { api } from "./base_api_url"


async function removeImage(articleId?:string){
     const response = await api.patch(`/remove-image/${articleId}`)  
     return response.status 
}
export default removeImage