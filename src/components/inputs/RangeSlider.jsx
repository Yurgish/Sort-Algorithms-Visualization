import React, { useState } from 'react'
import NumberInput from './NumberInput'
import RangeInput from './RangeInput'

export const RangeSlider = ({ min, max, standartValue, valueText, handleValueChange }) => {
    const [value, setValue] = useState(standartValue)

    const handleChange = (value) => {
        setValue(value)
        handleValueChange(value)
    }

    return (
        <label className='flex items-center w-full '>
            <p className='mr-auto'>{valueText}</p>
            <RangeInput value={value} min={min} max={max} onChange={handleChange} />
            <NumberInput value={value} min={min} max={max} step="1" onChange={handleChange} className="ml-10" />
        </label>
    )
}
