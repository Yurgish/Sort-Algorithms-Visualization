
import React, { useEffect, useState } from 'react'
import ColorPicker from '../inputs/ColorPicker'
import { useControlContext } from '../../context/controlsContext'
import CheckBox from '../inputs/CheckBox'

const RangeColor = () => {
    const { state, setColorArray } = useControlContext()

    const [firstColor, setFirstColor] = useState(state.arrayColor[0])
    const [secondColor, setSecondColor] = useState('#000080')

    const [isGradient, setIsGradient] = useState(false)

    useEffect(() => {
        if (isGradient) {
            setColorArray([firstColor, secondColor])
        }
        else {
            setColorArray([firstColor])
        }
    }, [firstColor, secondColor, isGradient])

    return (
        <div className={`mt-2 ${!isGradient ? "flex items-center" : "block"}`}>
            <label className='flex items-center w-full justify-between' >
                <p>Column color</p>
                <label className={`flex items-center ${isGradient ? "" : "mr-4"}`}>
                    <CheckBox value={isGradient} onChange={setIsGradient} />
                    <p className='ml-2'>Gradient</p>
                </label>
            </label>
            {isGradient ? (
                <div className="flex justify-between mt-2" style={{ background: `linear-gradient( 90deg, ${firstColor}, ${secondColor})` }}>
                    <ColorPicker handleColorChange={setFirstColor} standartHex={firstColor} />
                    <ColorPicker handleColorChange={setSecondColor} standartHex={secondColor} />
                </div>
            ) : (
                <ColorPicker handleColorChange={setFirstColor} standartHex={firstColor} />
            )}

        </div>
    )
}

export default RangeColor