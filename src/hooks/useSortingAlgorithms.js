import { useState } from "react";

const useSortingAlgorithms = () => {
  const getSort = (sort) => {
    switch (sort) {
      case "bubble":
        return () => bubbleSort;
      case "h-quick":
        return () => hoareQuickSortWrapper;
      case "l-quick":
        return () => lomutoQuickSortWrapper;
      case "selection":
        return () => selectionSort;
      case "insertion":
        return () => insertionSort;
      case "merge":
        return () => mergeSortWrapper;
      case "heap":
        return () => heapSort;
      case "shell":
        return () => shellSort;
      case "radix":
        return () => radixSort;
      case "cocktail":
        return () => cocktailShakerSort;
      case "gnome":
        return () => gnomeSort;
      case "bogo":
        return () => bogoSort;
      case "bitonic":
        return () => bitonicSort;
      default:
        return () => bubbleSort;
    }
  };

  const [sortAlgorithm, setSortAlgorithm] = useState();

  const setSort = (sort) => {
    setSortAlgorithm(getSort(sort));
  };

  // ─────────────────────────────
  // Bubble Sort
  // ─────────────────────────────
  async function bubbleSort(arr, delay, states) {
    let swapped = true;
    while (swapped) {
      swapped = false;
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          states[i] = 1;
          states[i + 1] = 1;
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
          await new Promise((resolve) => setTimeout(resolve, delay));
          states[i] = 0;
          states[i + 1] = 0;
        }
      }
    }
  }

  // ─────────────────────────────
  // Selection Sort
  // ─────────────────────────────
  async function selectionSort(arr, delay, states) {
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        states[i] = 1;
        states[minIndex] = 1;
        await new Promise((resolve) => setTimeout(resolve, delay));
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        states[i] = 0;
        states[minIndex] = 0;
      }
    }
  }

  // ─────────────────────────────
  // Insertion Sort
  // ─────────────────────────────
  async function insertionSort(arr, delay, states) {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        states[j] = 1;
        states[j + 1] = 1;
        arr[j + 1] = arr[j];
        await new Promise((resolve) => setTimeout(resolve, delay));
        states[j] = 0;
        states[j + 1] = 0;
        j = j - 1;
      }
      arr[j + 1] = key;
    }
  }

  // ─────────────────────────────
  // Quick Sort (Lomuto)
  // ─────────────────────────────
  async function lomutoPartition(arr, start, end, speed, states) {
    const pivotValue = arr[start];
    let swapIndex = start;
    for (let i = start + 1; i <= end; i++) {
      if (pivotValue > arr[i]) {
        swapIndex++;
        if (i !== swapIndex) {
          states[swapIndex] = 1;
          states[i] = 1;
          await new Promise((resolve) => setTimeout(resolve, speed));
          [arr[i], arr[swapIndex]] = [arr[swapIndex], arr[i]];
          states[swapIndex] = 0;
          states[i] = 0;
        }
      }
    }
    if (swapIndex !== start) {
      states[swapIndex] = 1;
      states[start] = 1;
      await new Promise((resolve) => setTimeout(resolve, speed));
      [arr[swapIndex], arr[start]] = [arr[start], arr[swapIndex]];
      states[swapIndex] = 0;
      states[start] = 0;
    }
    return swapIndex;
  }

  async function lomutoQuickSort(arr, start = 0, end = arr.length - 1, speed, states) {
    if (start < end) {
      let pivotIndex = await lomutoPartition(arr, start, end, speed, states);

      await Promise.all([
        lomutoQuickSort(arr, start, pivotIndex, speed, states),
        lomutoQuickSort(arr, pivotIndex + 1, end, speed, states),
      ]);
    }
    return arr;
  }

  function lomutoQuickSortWrapper(arr, speed, states) {
    lomutoQuickSort(arr, 0, arr.length - 1, speed, states);
  }

  // ─────────────────────────────
  // Quick Sort (Hoare)
  // ─────────────────────────────
  async function hoarePartition(arr, lo, hi, speed, states) {
    const pivotIndex = Math.floor((lo + hi) / 2);
    const pivot = arr[pivotIndex];
    let i = lo - 1;
    let j = hi + 1;

    while (true) {
      do {
        i++;
      } while (arr[i] < pivot);
      do {
        j--;
      } while (arr[j] > pivot);

      if (i >= j) {
        return j;
      }

      states[i] = 1;
      states[j] = 1;
      await new Promise((resolve) => setTimeout(resolve, speed));
      [arr[i], arr[j]] = [arr[j], arr[i]];
      states[i] = 0;
      states[j] = 0;
    }
  }

  async function hoareQuickSort(arr, start = 0, end = arr.length - 1, speed, states) {
    if (start < end) {
      let pivotIndex = await hoarePartition(arr, start, end, speed, states);

      await Promise.all([
        hoareQuickSort(arr, start, pivotIndex, speed, states),
        hoareQuickSort(arr, pivotIndex + 1, end, speed, states),
      ]);
    }
    return arr;
  }

  function hoareQuickSortWrapper(arr, speed, states) {
    hoareQuickSort(arr, 0, arr.length - 1, speed, states);
  }

  return [sortAlgorithm, setSort];
};

export default useSortingAlgorithms;

// ─────────────────────────────
// Merge Sort
// ─────────────────────────────
async function merge(arr, start, mid, end, speed, states) {
  let leftArr = arr.slice(start, mid + 1);
  let rightArr = arr.slice(mid + 1, end + 1);
  let i = 0,
    j = 0,
    k = start;

  while (i < leftArr.length && j < rightArr.length) {
    states[k] = 1; // Highlight element being placed
    await new Promise((resolve) => setTimeout(resolve, speed));
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    states[k] = 0;
    k++;
  }

  while (i < leftArr.length) {
    states[k] = 1;
    await new Promise((resolve) => setTimeout(resolve, speed));
    arr[k] = leftArr[i];
    states[k] = 0;
    i++;
    k++;
  }

  while (j < rightArr.length) {
    states[k] = 1;
    await new Promise((resolve) => setTimeout(resolve, speed));
    arr[k] = rightArr[j];
    states[k] = 0;
    j++;
    k++;
  }
}

async function mergeSort(arr, start = 0, end = arr.length - 1, speed, states) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    await mergeSort(arr, start, mid, speed, states);
    await mergeSort(arr, mid + 1, end, speed, states);
    await merge(arr, start, mid, end, speed, states);
  }
}

function mergeSortWrapper(arr, speed, states) {
  mergeSort(arr, 0, arr.length - 1, speed, states);
}

// ─────────────────────────────
// Heap Sort
// ─────────────────────────────
async function heapify(arr, n, i, speed, states) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    states[i] = 1;
    states[largest] = 1;
    await new Promise((resolve) => setTimeout(resolve, speed));
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    states[i] = 0;
    states[largest] = 0;
    await heapify(arr, n, largest, speed, states);
  }
}

async function heapSort(arr, speed, states) {
  let n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i, speed, states);
  }

  for (let i = n - 1; i > 0; i--) {
    states[0] = 1;
    states[i] = 1;
    await new Promise((resolve) => setTimeout(resolve, speed));
    [arr[0], arr[i]] = [arr[i], arr[0]];
    states[0] = 0;
    states[i] = 0;
    await heapify(arr, i, 0, speed, states);
  }
}

// ─────────────────────────────
// Shell Sort
// ─────────────────────────────
async function shellSort(arr, delay, states) {
  let n = arr.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    await new Promise((resolve) => setTimeout(resolve, delay));
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        states[j] = 1;
        states[j - gap] = 1;
        arr[j] = arr[j - gap];
        await new Promise((resolve) => setTimeout(resolve, delay));
        states[j] = 0;
        states[j - gap] = 0;
      }
      arr[j] = temp;
      states[j] = 1;
      await new Promise((resolve) => setTimeout(resolve, delay));
      states[j] = 0;
    }
  }
}

// ─────────────────────────────
// Radix Sort
// ─────────────────────────────
async function radixSort(arr, delay, states) {
  let max = Math.max(...arr);
  let exp = 1;
  while (Math.floor(max / exp) > 0) {
    await countingSortByDigit(arr, arr.length, exp, delay, states);
    exp *= 10;
  }
}

async function countingSortByDigit(arr, n, exp, delay, states) {
  const output = new Array(n);
  const count = new Array(10).fill(0);

  for (let i = 0; i < n; i++) {
    states[i] = 1;
    count[Math.floor(arr[i] / exp) % 10]++;
    await new Promise((resolve) => setTimeout(resolve, delay));
    states[i] = 0;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    states[i] = 1;
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    await new Promise((resolve) => setTimeout(resolve, delay));
    count[Math.floor(arr[i] / exp) % 10]--;
    states[i] = 0;
  }

  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
    states[i] = 1;
    await new Promise((resolve) => setTimeout(resolve, delay));
    states[i] = 0;
  }
}

// ─────────────────────────────
// Cocktail Shaker Sort
// ─────────────────────────────
async function cocktailShakerSort(arr, delay, states) {
  let swapped = true;
  let start = 0;
  let end = arr.length - 1;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        states[i] = 1;
        states[i + 1] = 1;
        await new Promise((resolve) => setTimeout(resolve, delay));
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        states[i] = 0;
        states[i + 1] = 0;
      }
    }
    if (!swapped) break;
    swapped = false;
    end--;

    for (let i = end - 1; i >= start; i--) {
      if (arr[i] > arr[i + 1]) {
        states[i] = 1;
        states[i + 1] = 1;
        await new Promise((resolve) => setTimeout(resolve, delay));
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        states[i] = 0;
        states[i + 1] = 0;
      }
    }
    start++;
  }
}

// ─────────────────────────────
// Gnome Sort
// ─────────────────────────────
async function gnomeSort(arr, delay, states) {
  let index = 0;
  while (index < arr.length) {
    if (index === 0) {
      index++;
    }
    states[index] = 1;
    states[index - 1] = 1;
    await new Promise((resolve) => setTimeout(resolve, delay));
    if (arr[index] >= arr[index - 1]) {
      states[index] = 0;
      states[index - 1] = 0;
      index++;
    } else {
      [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
      states[index] = 0;
      states[index - 1] = 0;
      index--;
    }
  }
}

// ─────────────────────────────
// Bogo Sort
// ─────────────────────────────
function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false;
    }
  }
  return true;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

async function bogoSort(arr, delay, states) {
  while (!isSorted(arr)) {
    shuffle(arr);
    await new Promise((resolve) => setTimeout(resolve, delay));
    for (let i = 0; i < arr.length; i++) {
      states[i] = 1;
      states[i] = 0;
    }
  }
}

// ─────────────────────────────
// Bitonic Sort
// ─────────────────────────────
async function bitonicMerge(arr, low, cnt, dir, delay, states) {
  if (cnt > 1) {
    const k = Math.floor(cnt / 2);
    for (let i = low; i < low + k; i++) {
      states[i] = 1;
      states[i + k] = 1;
      await new Promise((resolve) => setTimeout(resolve, delay));

      if ((dir && arr[i] > arr[i + k]) || (!dir && arr[i] < arr[i + k])) {
        [arr[i], arr[i + k]] = [arr[i + k], arr[i]];
      }

      states[i] = 0;
      states[i + k] = 0;
    }
    await bitonicMerge(arr, low, k, dir, delay, states);
    await bitonicMerge(arr, low + k, k, dir, delay, states);
  }
}

async function bitonicSortRecursive(arr, low, cnt, dir, delay, states) {
  if (cnt > 1) {
    const k = Math.floor(cnt / 2);
    await bitonicSortRecursive(arr, low, k, true, delay, states); // ascending
    await bitonicSortRecursive(arr, low + k, k, false, delay, states); // descending
    await bitonicMerge(arr, low, cnt, dir, delay, states);
  }
}

async function bitonicSort(arr, delay, states) {
  // Якщо довжина не ступінь 2, округлюємо до найближчого меншого степеня двійки
  let n = arr.length;
  let pow2 = 1;
  while (pow2 * 2 <= n) pow2 *= 2;

  await bitonicSortRecursive(arr, 0, pow2, true, delay, states);
}
