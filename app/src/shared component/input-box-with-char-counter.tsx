import InputBox from "./input-box"
import { useState } from "react"


type inputboxwithcharcounter = {
     title:string,
     placeHolder?:string,
     maxChar:number,
     subTitle?:string,
     fieldRef?:React.RefObject<HTMLInputElement>,
     value?:TStringOrUndef
}

const InputBoxWithCharCounter : React.FC<inputboxwithcharcounter> = 
(
     {
          title,
          placeHolder='',
          maxChar,
          subTitle='',
          fieldRef,
          value=''
     }
)=>{
     const [charCounter,setCharCounter] = useState(0)
     return(
          <div className="mb-4">
               <InputBox
               fieldRef={fieldRef}
               title={title}
               placeHolder={placeHolder}
               mb={0}
               setCharCounter={setCharCounter}
               maxChar={maxChar}
               subTitle={subTitle}
               value={value}
               />
               <div className="w-100 
               inputbox-description
               text-end py-1 char-counter-wrapper">
                    <span className="">
                         {charCounter}
                    </span>
                    {'/'+maxChar}
               </div>
          </div>
     )
}


export default InputBoxWithCharCounter