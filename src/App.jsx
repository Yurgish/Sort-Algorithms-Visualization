import { useEffect, useRef } from "react";
import Controls from "./components/controls/Controls";
import Scetch from "./components/Scetch";
import { useControlContext } from "./context/controlsContext";
import DraggableWindow from "./components/global/DraggableWindow";

function App() {
  const ref = useRef()

  const { state, setWindowRef } = useControlContext()

  useEffect(() => { setWindowRef(ref) }, [])

  return <div
    className=" primary flex justify-center h-screen items-center flex-col overflow-hidden text-sm"
    ref={ref}
    style={{ background: state.backgroundColor }}
  >
    <Scetch />
    <Controls />
  </div>;
}

export default App;