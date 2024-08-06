import React from 'react'
import Button from '../Button'

const MinimizeButton = ({ onClick }) => {
    return (
        <Button onClick={onClick} className="shadow-window w-4 h-4 bg-window-background justify-center items-end flex">
            <img src="src/assets/icons/Minimize.svg" className='mb-1' />
        </Button>
    )
}

export default MinimizeButton