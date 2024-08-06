import React, { useEffect, useRef, useMemo } from 'react'
import { useState } from 'react'
import useSortingAlgorithms from './useSortingAlgorithms'
import { useControlContext } from '../context/controlsContext'

const useSketch = () => {
    const { state } = useControlContext();

    const [speed, setSpeed] = useState(state.speed)
    const [number, setNumber] = useState(state.arraySize)
    const [backgroundColor, setBackgroundColor] = useState(state.backgroundColor)
    const [columnColorArray, setColumnColorArray] = useState(state.arrayColor)
    const [sort, setSort, isSorted] = useSortingAlgorithms("l-quick")
    const width = window.innerWidth;
    const height = window.innerHeight;

    const setState = (state) => {
        setSpeed(state.speed)
        setNumber(state.arraySize)
        setBackgroundColor(state.backgroundColor)
        setSort(state.sortAlgorithm)
        setColumnColorArray(state.arrayColor)
    }

    useEffect(() => { setState(state); }, [state])

    const memoizedSketch = useMemo(() => {
        setState(state);
        return (p5) => {
            let columnSize = width / number
            let values = [];
            let states = [];

            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(p5.random(i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            function isSorted(arr) {
                for (let i = 1; i < arr.length; i++) {
                    if (arr[i] < arr[i - 1]) {
                        return false;
                    }
                }
                return true;
            }

            // async function isSortedAnimation(arr, times) {
            //     for (let i = 0; i < arr.length; i++) {
            //         if (i % times === 0) await new Promise((resolve) => setTimeout(resolve, 0));
            //         states[i] = 2;
            //     }
            //     for (let i = 0; i < arr.length; i++) {
            //         states[i] = 0;
            //     }
            //     drawArr()

            //     p5.noLoop()
            // }

            function drawArr() {
                for (let i = 0; i < values.length; i++) {
                    let color;

                    if (states[i] === 1) {
                        color = '#800000'
                    } else if (states[i] === 2) {
                        color = '#00800D';
                    } else {
                        if (columnColorArray.length === 2)
                            color = colorForHeight(values[i]);
                        else {
                            color = columnColorArray[0]
                        }
                    }

                    p5.noStroke()
                    p5.fill(color);
                    p5.rect(i * columnSize, height, columnSize, -values[i]);
                }
            }

            function colorForHeight(heightValue) {
                const startColor = p5.color(columnColorArray[0]);
                const endColor = p5.color(columnColorArray[1]);
                const colorRange = p5.map(heightValue, 0, height, 0, 1);
                return p5.lerpColor(startColor, endColor, colorRange);
            }

            p5.setup = () => {
                p5.createCanvas(width, height);
                columnSize = width / number;
                for (let i = 0; i < number; i++) {
                    values.push(p5.map(i, 0, number - 1, 0, height));
                    states[i] = 0
                }
                shuffleArray(values)
                sort(values, speed, states);
            };

            p5.draw = () => {
                p5.background(backgroundColor);
                drawArr()
                console.log("d")

                if (isSorted(values)) {
                    // isSortedAnimation(values, 5)
                    p5.noLoop()
                    return;
                }
            };
        };
    }, [state.restartValue, isSorted]);

    // function sketch(p5) {
    //     let columnSize = width / number
    //     let values = [];
    //     let states = [];

    //     function shuffleArray(array) {
    //         for (let i = array.length - 1; i > 0; i--) {
    //             const j = Math.floor(p5.random(i + 1));
    //             [array[i], array[j]] = [array[j], array[i]];
    //         }
    //     }

    //     p5.setup = () => {
    //         p5.createCanvas(width, height);
    //         columnSize = width / number;
    //         for (let i = 0; i < number; i++) {
    //             values.push(p5.map(i, 0, number - 1, 0, height));
    //             states[i] = 0
    //         }
    //         shuffleArray(values)
    //         sort(values, speed, states);
    //     };

    //     p5.draw = () => {
    //         function colorForHeight(heightValue) {

    //             const startColor = p5.color(columnColorArray[0]);
    //             const endColor = p5.color(columnColorArray[1]);
    //             const colorRange = p5.map(heightValue, 0, height, 0, 1);
    //             return p5.lerpColor(startColor, endColor, colorRange);
    //         }

    //         p5.background(backgroundColor);

    //         for (let i = 0; i < values.length; i++) {
    //             let color;
    //             if (states[i] === 1) {
    //                 color = '#800000'
    //             } else if (states[i] === 2) {
    //                 color = 'green';
    //             } else {
    //                 if (columnColorArray.length === 2)
    //                     color = colorForHeight(values[i]);
    //                 else {
    //                     color = columnColorArray[0]
    //                 }
    //             }

    //             p5.noStroke()
    //             p5.fill(color);
    //             p5.rect(i * columnSize, height, columnSize, -values[i]);
    //         }
    //     };
    // }

    return [memoizedSketch]
}

export default useSketch