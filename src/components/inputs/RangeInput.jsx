import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, } from "framer-motion"

const RangeInput = ({ min, max, value, onChange }) => {
    const constraintsRef = useRef()
    const handleRef = useRef();
    const progressBarRef = useRef();
    const handleSize = 8;
    const [inputValue, setValue] = useState(value);
    let handleX = useMotionValue(0);

    function handleDrag() {
        let handleBounds = handleRef.current.getBoundingClientRect();
        let middleOfHandle = handleBounds.x + handleBounds.width / 2;
        let progressBarBounds = progressBarRef.current.getBoundingClientRect();
        let newProgress =
            (middleOfHandle - progressBarBounds.x) / progressBarBounds.width;

        setValue(Math.round(newProgress * (max - min)));
        onChange(Math.round(newProgress * (max - min)))
    }

    useEffect(() => {
        let newProgress = value / (max - min);
        let progressBarBounds = progressBarRef.current.getBoundingClientRect();

        handleX.set(newProgress * progressBarBounds.width);
    }, [handleX, max, min, value]);

    return (
        <div className='relative flex flex-col justify-center' ref={constraintsRef}>
            <div className="shadow-window-reverse relative w-32 h-1"></div>
            <div
                data-test="slider-progress"
                ref={progressBarRef}
                className="absolute h-2"
                style={{
                    left: handleSize / 2,
                    right: handleSize / 2,
                }}
            />
            <motion.div
                className="absolute flex justify-center"
                drag="x"
                dragMomentum={false}
                dragConstraints={constraintsRef}
                dragElastic={0}
                ref={handleRef}
                onDrag={handleDrag}
                style={{ x: handleX }}
            >
                <div className="w-2 h-3 bg-window-background shadow-window"></div>
            </motion.div>
        </div>
    )
}

export default RangeInput
