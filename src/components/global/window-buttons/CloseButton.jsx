import React from 'react'
import Button from '../Button'

const CloseButton = ({ onClick }) => {
    return (
        <Button onClick={onClick} className="shadow-window w-4 h-4 bg-window-background justify-center items-center flex">
            <img src="src/assets/icons/Close.svg" />
        </Button>
    )
}

export default CloseButton