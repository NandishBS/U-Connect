import React from 'react'

function RadioInput({className, label,  radioValue, ...props }) {
  return (
    <div className='flex justify-center place-items-center transition-all w-full'>
            <label className='cursor-pointer' htmlFor={label}> {label} &nbsp;</label>
            <input className='cursor-pointer h-7 w-4' type="radio" {...props} value={radioValue} checked={props.value === radioValue} id={label}/>
    </div>
  )
}

export default RadioInput
