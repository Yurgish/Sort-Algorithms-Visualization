export default function sketch(p5) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let number = 0;
    let speed = 0
    let columnSize = width / number
    let values = [];
    let states = []


    const clearState = () => {
        for (let i = 0; i < number; i++) {
            states[i] = 0
        }
    }

    async function bubbleSort(arr) {
        let swapped = true;

        while (swapped) {
            swapped = false;
            for (let i = 0; i < arr.length - 1; i++) {

                if (arr[i] > arr[i + 1]) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    swapped = true;
                }
            }
            await new Promise((resolve) => setTimeout(resolve, speed));
        }
        console.log(values)
    }

    async function partition(arr, start, end) {
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


    //need to make Hoare partition
    //Lomuto quick sort tech

    async function hoarePartition(arr, lo, hi) {
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

    async function quickSort(arr, start = 0, end = arr.length - 1) {
        if (start < end) {
            let pivotIndex = await partition(arr, start, end);

            await Promise.all([
                quickSort(arr, start, pivotIndex), // Сортуємо ліву частину
                quickSort(arr, pivotIndex + 1, end) // Сортуємо праву частину
            ]);
        }
        return arr;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(p5.random(i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    p5.setup = () => {
        p5.createCanvas(width, height);
        columnSize = width / number;
        for (let i = 0; i < number; i++) {
            values.push(p5.map(i, 0, number - 1, 0, height));
            states[i] = 0
        }
        console.log(values)
        shuffleArray(values)
        quickSort(values);
        //bubbleSort(values);
    };

    // p5.updateWithProps = props => {
    //     if (props.reset !== undefined) {
    //         speed = props.speed; // оновлюємо швидкість
    //         number = props.number; // оновлюємо кількість елементів
    //         columnSize = width / number; // оновлюємо розмір стовпців залежно від кількості
    //         values = [];
    //         clearState()
    //         for (let i = 0; i < number; i++) {
    //             values.push(p5.map(i, 0, number - 1, 0, height));
    //         }
    //         shuffleArray(values); // перемішуємо масив значень
    //         quickSort(values)
    //     }

    // };

    p5.draw = () => {
        function colorForHeight(heightValue) {

            const startColor = p5.color('#F29492');
            const endColor = p5.color('#114357');
            const colorRange = p5.map(heightValue, 0, height, 0, 1);
            return p5.lerpColor(startColor, endColor, colorRange);
        }

        p5.background("black");

        for (let i = 0; i < values.length; i++) {
            let color;
            if (states[i] === 1) {
                color = 'red'
            } else if (states[i] === 2) {
                color = 'green';
            } else {
                color = colorForHeight(values[i]);
            }

            p5.noStroke()
            p5.fill(color);
            p5.rect(i * columnSize, height, columnSize, -values[i]);
        }
    };
}