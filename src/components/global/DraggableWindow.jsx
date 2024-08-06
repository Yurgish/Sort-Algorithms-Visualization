import React, { useState, useEffect, useRef, useId, memo } from 'react'
import { motion, useDragControls, useAnimationControls } from 'framer-motion'
import { useControlContext } from '../../context/controlsContext';
import PortalContainer from './PortalContainer';
import MinimizeButton from './window-buttons/MinimizeButton';
import CloseButton from './window-buttons/CloseButton';

const DraggableWindow = React.memo(({ children, dragConstraints, styles, portal, closeHandler, title, ...props }) => {
    const [isWindowOpen, setIsWindowOpen] = useState(true)
    // const id = useId()
    const [isActive, setIsActive] = useState(null)
    const { state } = useControlContext()

    const dragControls = useDragControls()
    const toggleControls = useAnimationControls()

    function startDrag(event) {
        dragControls.start(event)
    }

    useEffect(() => {
        if (isWindowOpen) {
            toggleControls.start("initial")
        }
        else {
            toggleControls.start("toggle")
        }
    }, [isWindowOpen])

    return (
        <PortalContainer portal={portal}>
            <motion.div
                drag
                className="min-w-10 w-96 bg-window-background top-0 left-0 absolute shadow-window p-1 font-Windows95 text-sm select-none"
                dragConstraints={dragConstraints ? dragConstraints : state.windowRef}
                dragListener={false}
                dragControls={dragControls}
                onDragStart={() => setIsActive(true)}
                onDragEnd={() => setIsActive(false)}
                style={styles}
                {...props}
            >
                <div onPointerDown={startDrag} style={{ cursor: isActive ? "grabbing" : "grab" }} className='h-6 flex justify-between items-center bg-window-header py-[0.125rem] px-1 gap-[0.125rem] text-white'>
                    {title && <p>{title}</p>}
                    <div className={!title ? "flex justify-end w-full gap-[0.125rem]" : "flex gap-[0.125rem]"}>
                        <MinimizeButton onClick={() => setIsWindowOpen(!isWindowOpen)} />
                        {closeHandler && <CloseButton onClick={closeHandler} />}
                    </div>
                </div>
                <motion.div
                    variants={{
                        initial: {
                            height: "auto",
                            overflow: "hidden"
                        },
                        toggle: {
                            height: 0,
                        }
                    }}
                    initial="initial"
                    animate={toggleControls}
                >
                    {children}
                </motion.div>
            </motion.div>
        </PortalContainer>
    )
})

export default DraggableWindow