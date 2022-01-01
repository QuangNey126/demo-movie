import React from 'react'

const Input = ({type,placeholder,value,onChange}) => {
    return (
   
            <input
            className='search__input'
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange ? (e) => onChange(e) : null}
            />
            
      
    )
}

export default Input
