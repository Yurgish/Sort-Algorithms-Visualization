import React, { useEffect, useState } from 'react'

const useSortingAlgorithms = () => {
    const getSort = (sort) => {
        switch (sort) {
            case "bubble":
                return () => bubbleSort;

            case "h-quick":
                return () => hoareQuickSortWrapper;

            case "l-quick":
                return () => lomutoQuickSortWrapper;
            default:
                return () => bubbleSort;
        }
    };

    const [sortAlgorithm, setSortAlgorithm] = useState(); // Only  one format of function sort(arr, speed, states)

    const setSort = (sort) => {
        setSortAlgorithm(getSort(sort));
    };

    function scale(number, inMin, inMax, outMin, outMax) {

        if (number < inMin) {
            number = inMax;
        }
        if (number > inMax) {
            number = inMax;
        }

        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // Максимум и минимум включаются
    }

    async function delayInIteration(i, delay, lenght = 0) {
        const delayIterations = parseInt(scale(delay, 0, 255, 255, 0) / 2);
        let lengthIteration = 0;
        if (!length <= 0) {
            lengthIteration = parseInt(scale(length, 0, 255, 255, 0))
        }

        if ((i + 2) % (delayIterations + getRandomIntInclusive(-2, 2) + lengthIteration) === 0) {
            await new Promise((resolve) => setTimeout(resolve, delay / 10));
        }
    }

    async function bubbleSort(arr, delay, states) {
        let swapped = true;
        console.log(parseInt(scale(delay, 0, 255, 255, 0)))

        while (swapped) {
            swapped = false;
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i] > arr[i + 1]) {
                    states[i] = 1;
                    states[i + 1] = 1;
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    swapped = true;
                    await delayInIteration(i, delay)
                    states[i] = 0;
                    states[i + 1] = 0;
                }
            }
        }
    }

    async function lomutoPartition(arr, start, end, speed, states) {
        const pivotValue = arr[start]
        let swapIndex = start
        for (let i = start + 1; i <= end; i++) {
            if (pivotValue > arr[i]) {
                swapIndex++
                if (i !== swapIndex) {
                    states[swapIndex] = 1
                    states[i] = 1
                    await new Promise((resolve) => setTimeout(resolve, speed));
                    [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]]
                    states[swapIndex] = 0
                    states[i] = 0
                }
            }
        }
        if (swapIndex !== start) {
            states[swapIndex] = 1
            states[start] = 1
            await new Promise((resolve) => setTimeout(resolve, speed));
            [arr[swapIndex], arr[start]] = [arr[start], arr[swapIndex]]
            states[swapIndex] = 0
            states[start] = 0
        }
        return swapIndex
    }

    async function lomutoQuickSort(arr, start = 0, end = arr.length - 1, speed, states) {
        if (start < end) {
            let pivotIndex = await lomutoPartition(arr, start, end, speed, states);

            await Promise.all([
                lomutoQuickSort(arr, start, pivotIndex, speed, states),
                lomutoQuickSort(arr, pivotIndex + 1, end, speed, states)
            ]);
        }
        return arr;
    }

    function lomutoQuickSortWrapper(arr, speed, states) {
        lomutoQuickSort(arr, 0, arr.length - 1, speed, states)
    }

    async function hoarePartition(arr, lo, hi, speed, states) {
        const pivotIndex = Math.floor((lo + hi) / 2)
        const pivot = arr[pivotIndex];
        let i = lo - 1;
        let j = hi + 1;

        while (true) {
            do {
                i++;
            } while (arr[i] < pivot);
            do {
                j--
            } while (arr[j] > pivot);

            if (i >= j) {
                return j;
            }

            // Swap arr[i] and arr[j]
            states[i] = 1
            states[j] = 1
            await new Promise((resolve) => setTimeout(resolve, speed));
            [arr[i], arr[j]] = [arr[j], arr[i]];
            states[i] = 0
            states[j] = 0
        }
    }

    async function hoareQuickSort(arr, start = 0, end = arr.length - 1, speed, states) {
        if (start < end) {
            let pivotIndex = await hoarePartition(arr, start, end, speed, states);

            await Promise.all([
                hoareQuickSort(arr, start, pivotIndex, speed, states),
                hoareQuickSort(arr, pivotIndex + 1, end, speed, states)
            ]);
        }
        return arr;
    }

    function hoareQuickSortWrapper(arr, speed, states) {
        hoareQuickSort(arr, 0, arr.length - 1, speed, states)
    }

    return [sortAlgorithm, setSort]

}

export default useSortingAlgorithms