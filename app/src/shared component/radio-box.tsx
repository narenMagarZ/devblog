

type radiobox = {     
     title:string,
     boxRef?:React.RefObject<HTMLInputElement>,
     value?:string,
     set:React.Dispatch<React.SetStateAction<any>>
}
const RadioBox:React.FC<radiobox> = ({
     title,
     boxRef,
     value,
     set
})=>{
     function toggleBoxState(ev:React.MouseEvent<HTMLDivElement>){
          const boxState = boxRef?.current?.checked
          console.log(boxState)
          const boxField = boxRef?.current as HTMLInputElement
          boxField.checked = !boxState
     }
     return(
          <div 
          onClickCapture={()=>set(title)}
          style={{
               flex:1,
               minWidth:'fit-content'
          }}
          className="font-selector-wrapper border d-flex gap-2  
          align-items-center rounded p-3">
                    <input 
                    checked={value===title?true:false}
                    ref={boxRef}
                    type='radio' />
                    <span>{title}</span>
          </div>
     )
}

export default RadioBox