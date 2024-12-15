import React, { useEffect, useRef, useState } from 'react'
import { VscFileMedia } from "react-icons/vsc";

function FileInput({className, placeHolderText , prevImage = '' , required, onChange ,...props}) {
    const ref = useRef();
    const [img,setImg] = useState(prevImage);

    return (
    <div className={`bg-blue-600 border-2 bg-opacity-15 border-opacity-60 border-blue-400 border-dashed p-2 rounded-md flex justify-center items-center cursor-pointer flex-shrink-0 overflow-hidden relative ${className} `} onClick={()=>{ref.current.click()}}>
      { (required && !img) && <div className='absolute bottom-2 left-2 bg-red-500 px-1 rounded-sm '> required </div> }
      {img ? <img className='rounded-lg' src={img} /> : 
        <div className='flex-col text-gray-200 justify-center place-items-center gap-1'>
          <VscFileMedia className='w-36 h-36' />
          <p className='text-lg'>{placeHolderText}</p>
        </div>
      }
      <input
      ref={ref}
      type='file' 
      hidden
      onChange={(event)=>{
        try {
          setImg(URL.createObjectURL(event.target.files[0]))
        } catch (error) {
          setImg('')
        }
        return onChange(event.target.files[0])
      }}
      {...props}
      />

    </div>
  )
}

export default FileInput


{/* <Controller
          name='content'
          control={control}
          defaultValue={''}
          render={({field}) => (
            <FileInput placeHolderText="Upload the content" accept="image/*, video/*" value={field.value} onChange={field.onChange} />
          )}
      /> */}