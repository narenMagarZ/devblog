import axios from "axios"
import { useQuery } from "react-query"
import baseApiUrl from "../../utils/base_api_url"


export default function GitHub(){
     const searchParams = new URLSearchParams(window.location.search)
     const code = searchParams.get('code')
     const {data,error,status} = useQuery('/auth/callback',async()=>{
          const response = await baseApiUrl.post('/auth/callback',{
               client_id:'c0b558fd447a889e0ec1',
               client_secret:'f4d3e3980a0d63c57459b174a10ab9cdd65d9ff7',
               code:code,
               redirect_uri:'http://127.0.0.1:3000/auth/callback'
          },{
               withCredentials:true
          })
          return response.data

     })
     if(status === 'success'){
          console.log(data,'this is data after response')
     }
     return(
          <div>

          </div>
     )
}