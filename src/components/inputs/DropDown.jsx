import React, { useState } from 'react'
import PortalContainer from '../global/PortalContainer'

const DropDown = ({ title, items = [], className, handleValueChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const handleSelect = (item) => {
        setIsOpen(false)
        setSelectedItem(item.text)
        handleValueChange(item.value)
    }

    return (
        <div className={`relative ${className}`}>
            <div className="shadow-window-reverse bg-white px-1 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <p>{selectedItem ? selectedItem : (title ? title : items[0].text)}</p>
            </div>
            <div className="absolute top-[2px] right-[2px] h-4">
                <button
                    className={`w-[15px] h-full bg-window-background flex items-center justify-center ${isOpen ? "shadow-window-reverse" : "shadow-window"}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img src="src/assets/icons/arrows/ArrowDown.svg" className='scale-150' />
                </button>
            </div>
            {isOpen &&
                <ul className="absolute left-0 w-full bg-white shadow-window-reverse-back z-10">
                    {items.map(item => (
                        <li key={item.value} onClick={() => handleSelect(item)} className='cursor-pointer hover:bg-window-header hover:text-white px-1 transition-none'>
                            {item.text}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default DropDown