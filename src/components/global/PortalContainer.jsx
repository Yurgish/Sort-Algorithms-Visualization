import { createPortal } from 'react-dom'

const PortalContainer = ({ children, portal }) => {
    return (
        createPortal(
            children,
            portal ? portal : document.body
        )
    )
}

export default PortalContainer