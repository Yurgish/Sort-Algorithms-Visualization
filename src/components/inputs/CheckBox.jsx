import React, { useEffect, useState } from 'react'

const CheckBox = ({ value, onChange }) => {
    const [checked, setChecked] = useState(value)

    const handleChange = () => {
        setChecked(!checked)
    }

    useEffect(() => { onChange(checked) }, [checked])
    return (
        <label className='relative flex items-center pl-3'>
            <input type="checkbox" className='appearance-none'
                checked={value}
                onChange={() => handleChange()}
            />
            <span className='absolute left-0 w-3 h-3 shadow-window-reverse bg-white cursor-pointer flex justify-center items-center'>
                {checked && <img src="src/assets/icons/СheckMark.svg" alt="" />}
            </span>
        </label>

    )
}

export default CheckBox