import React, { useEffect, useRef, memo } from 'react';
import useSketch from '../hooks/useSketch';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import { useControlContext } from '../context/controlsContext';

const Sketch = React.memo(() => {
    const [sketch] = useSketch()

    return (
        <ReactP5Wrapper sketch={sketch} />
    );
});

export default Sketch;