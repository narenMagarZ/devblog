import { useEffect, useState } from "react"


export default function CoverImage(){
     const [coverImage,setCoverImage] = useState<boolean>(false)
     const [error,setError] = useState<string|null>(null)
     function selectCoverImage(){
          const coverImageSelector = document.getElementById('coverImageSelector') as HTMLInputElement
          coverImageSelector?.click()
     }
     function storeAndRenderCoverImage(ev:React.ChangeEvent<HTMLInputElement>){
          const file = ev.currentTarget.files
          if(file){
               const fileReader = new FileReader()
               fileReader.readAsDataURL(file[0])
               fileReader.onerror = ()=>{
                    console.error('error while reading cover image')
               }
               fileReader.onload = (event)=>{
                    const imgSrc = event.target?.result as string
                    if(imgSrc){
                         const image = new Image()
                         image.src = imgSrc
                         image.onload = function(ev){
                              const width = image.naturalWidth
                              const height = image.naturalHeight
                              if(width > 4096 || height > 4096){
                                   setError(()=>'Image size should be less than or equal to 4096*4096')
                              } else {
                                   setError(()=>null)
                                   setCoverImage(()=>true)
                                   const coverImage = document.getElementById('coverImage') as HTMLImageElement
                                   coverImage.src = imgSrc
                              }
                         }
                    }

               }
          }
     }

     function removeCoverImage(){
          const coverImage = document.getElementById('coverImage') as HTMLImageElement
          const coverImageSelector = document.getElementById('coverImageSelector') as HTMLInputElement
          coverImageSelector.value = ''
          coverImage.src = ''
          setError(()=>null)
          setCoverImage(()=>false)
     }
     useEffect(()=>{
          console.log(coverImage,'changed')
     },[coverImage])
     return(
          <div className="d-flex align-items-center border border-primary">
               <input
               onInput={storeAndRenderCoverImage}
               id="coverImageSelector"
               hidden 
               type='file' accept="image/*" />
               <img
               hidden={!coverImage}
               className="cover-image"
               id="coverImage"
               src="" alt="" />
          {
               coverImage ? 
               <div className="d-flex align-items-center gap-2 rouned">
                    <button
                    data-bs-toggle='tooltip'
                    data-bs-placement='bottom'
                    title="Use a ratio of 100:42 for best results."
                    onClick={selectCoverImage}
                    type="button"
                    className="rounded p-1 change-btn px-2"
                    >
                         Change
                    </button>
                    <button
                    onClick={removeCoverImage}
                    type="button"
                    className="remove-btn rounded p-1 px-2"
                    >
                         Remove
                    </button>
               </div> : 
               <div>
                    <button
                    data-bs-toggle='tooltip'
                    data-bs-placement='bottom'
                    title="Use a ratio of 100:42 for best results."
                    className="rounded px-2 p-1 add-cover-image-btn"
                    onClick={selectCoverImage}
                    >
                         Add a cover image
                    </button>
          </div>
          }
          <span className="error">{error}</span>
     </div>
     )
}