import { api } from "./base_api_url"


async function uploadImage(formData:FormData):Promise<string|undefined>{
     try{
          const response = await api.post('/image_upload',formData)
          if(response.status === 200 && response.statusText)
          return response.data.url
     }catch(err){
          console.error(err)
     }
}


export default uploadImage