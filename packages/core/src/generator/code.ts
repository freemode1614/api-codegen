// First define your merge function
function merge(leftArray: number[], rightArray: number[]): number[] {
  const result = [];
  while (leftArray.length > 0 && rightArray.length > 0) {
    if (leftArray[0] <= rightArray[0]) {
      result.push(leftArray.shift()!);
    } else {
      result.push(rightArray.pop()!);
    }
  }
  return [...result, ...leftArray, ...rightArray];
}

// Now define your sort function that will use the merge sort algorithm
function sort(array: number[]): number[] {
  if (array.length <= 1) {
    // Base case for recursion - an array with one or zero elements is already sorted
    return array;
  }
  const mid = Math.floor(array.length / 2);
  return merge(sort(array.slice(0, mid)), sort(array.slice(mid)));
}

// Now you can use the 'sort' function like this:
// let sortedArray = [1, 4, 2, 3].sort(); // should become [1, 2, 3, 4]
