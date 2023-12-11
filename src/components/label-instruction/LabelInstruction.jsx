import React from 'react'
import './LabelInstruction.css'

/**
 * 
 * @param {React.HTMLProps<HTMLLabelElement>} htmlProps 
 * @returns 
 */
const TextInstruction = ({ text, ...rest }) => {
    return (
        <label className='label-instruction' {...rest}>{text} 👇</label>
    )
}

export default TextInstruction