const join = (separator:string,...value:string[])=>{
     if(separator === '/'){
         return '/'.concat(value.join('/'))
     }
     return value.join(separator)
}
export default join