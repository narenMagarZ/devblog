import { useEffect } from "react"


type inputfield = {
     title:string,
     placeHolder?:string,
     mb?:number,
     setCharCounter?:React.Dispatch<React.SetStateAction<number>>,
     maxChar?:number,
     subTitle?:string,
     fieldRef?:React.RefObject<HTMLInputElement>,
     value?:TStringOrUndef
}

const InputBox : React.FC<inputfield> = (
     {
          title,
          placeHolder='',
          setCharCounter,
          mb=4,
          maxChar=0,
          subTitle,
          fieldRef,
          value
     }
)=>{
     function handleCharCounter(ev:Event){
          ev.preventDefault()
          const thisField = ev.currentTarget as HTMLInputElement
          if(setCharCounter){
               const text = thisField.value
               setCharCounter((prevCounter)=>{
                    if(text.length > maxChar ){
                         ev.preventDefault()
                         return prevCounter
                    }
                    else return text.length
               })
          }
     }
     useEffect(()=>{
          const holdInputField = fieldRef?.current
          if(holdInputField && setCharCounter){
               holdInputField.addEventListener('input',handleCharCounter)
          }
          return()=>{
               if(holdInputField && setCharCounter){
                    holdInputField.removeEventListener('input',handleCharCounter)
               } 
          }
     })
     useEffect(()=>{
          if(fieldRef?.current){
               fieldRef.current.value = value || ''
          }
     },[])
     return(
          <div 
          className={`mb-${mb}`}>
               <label 
               className={`${subTitle ? 'mb-0' : 'mb-2'} d-block`}>
                    {title}
               </label>
                    {
                         subTitle ? <label className="subtitle mb-1">{subTitle}</label> : ''
                    }
               <input
               maxLength={maxChar > 0 ? maxChar : undefined}
               ref={fieldRef}
               placeholder={placeHolder}
               className="p-2 input-field w-100"
               type='text'/>
          </div>
     )
}

export default InputBox