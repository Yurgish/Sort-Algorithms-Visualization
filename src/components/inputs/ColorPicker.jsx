import React, { useEffect, useRef, useState } from 'react'
import Sketch from '@uiw/react-color-sketch';
import DraggableWindow from '../global/DraggableWindow';

const ColorPicker = ({ standartHex = "#fff", handleColorChange }) => {
    const [hex, setHex] = useState(standartHex);
    const [isOpen, setIsOpen] = useState(false)
    const [pos, setPos] = useState({ top: "1.5rem", left: "1.5rem" })
    const ref = useRef()

    const handleOpen = () => {
        setIsOpen(!isOpen)
        const rect = ref.current.getBoundingClientRect()
        setPos({ top: rect.top, left: rect.left + rect.width * 2 })
    }

    useEffect(() => { handleColorChange(hex) }, [hex])

    return <>
        <div className="relative">
            <div
                className="w-6 h-6 cursor-pointer flex justify-center items-center shadow-window-reverse"
                onClick={() => handleOpen()}
                ref={ref}
                style={{ background: hex }}
            >
            </div>
            {isOpen && (
                <DraggableWindow styles={{ width: "auto", ...pos }} closeHandler={() => setIsOpen(false)} title={"Color Picker"}>
                    <Sketch
                        className='bg-window-background'
                        color={hex}
                        onChange={(color) => {
                            setHex(color.hex);
                        }}
                        presetColors={"white"}
                        style={{
                            border: "none",
                            boxShadow: "none",
                            background: "#C0C0C0",
                            borderRadius: 0,
                            color: "black"
                        }}
                    />
                </DraggableWindow>
            )}

        </div >
    </>

}

export default ColorPicker