import React from 'react'
import { RangeSlider } from '../inputs/RangeSlider'
import RangeColor from './RangeColor';
import ColorPicker from '../inputs/ColorPicker';
import { useControlContext } from '../../context/controlsContext';
import DraggableWindow from '../global/DraggableWindow';
import DropDown from '../inputs/DropDown';
import ButtonInput from '../inputs/ButtonInput';

const sorts = [
    { text: "Bubble Sort", value: "bubble" },
    { text: "Hoare's Quick Sort", value: "h-quick" },
    { text: "Lomuto's Quick Sort", value: "l-quick" },
]

const Controls = () => {
    const { state, setSpeed, setArraySize, setBackgroundColor, setSort, increaseRestartValue } = useControlContext()

    return (
        <DraggableWindow styles={{ top: "1.5rem", left: "1.5rem" }} title={"Controls"}>
            <div className="p-2">
                <DropDown title={`Select Sort (Current: ${sorts.find(sort => sort.value === state.sortAlgorithm).text})`} items={sorts} className={"mb-1"} handleValueChange={setSort} />
                <RangeSlider min={10} max={4096} standartValue={state.arraySize} valueText="Array size" handleValueChange={setArraySize} />
                <RangeSlider min={0} max={254} standartValue={state.speed} valueText="Delay" handleValueChange={setSpeed} />
                <label className='flex items-center justify-between mt-2'>
                    <p>Background color</p>
                    <ColorPicker standartHex={state.backgroundColor} handleColorChange={setBackgroundColor} />
                </label>
                <RangeColor />
                <div className="flex justify-center">
                    <ButtonInput className="mt-3" onClick={() => increaseRestartValue()}>
                        Restart
                    </ButtonInput>
                </div>
            </div>
        </DraggableWindow>
    )
}

export default Controls