import React from 'react'
import Button from '../global/Button'

const ButtonInput = ({ children, onClick, style, className }) => {
    return (
        <Button
            onClick={onClick}
            className={`shadow-window px-4 py-[0.125rem] active:shadow-window-reverse ${className}`}
            style={style}
        >
            {children}
        </Button>
    )
}

export default ButtonInput