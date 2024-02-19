import chunk from 'lodash.chunk';

export const DownSampleData = (array2D: number[][], blockSize: number) => {
  const downSampledArray = [];
  const numRows = Math.floor(array2D.length / blockSize);
  const numCols = Math.floor(array2D[0].length / blockSize);

  for (let i = 0; i < numRows; i += 1) {
    const rowStart = i * blockSize;
    const rowEnd = rowStart + blockSize;

    for (let j = 0; j < numCols; j += 1) {
      const colStart = j * blockSize;
      const colEnd = colStart + blockSize;

      let sum = 0;
      for (let x = rowStart; x < rowEnd; x += 1) {
        for (let y = colStart; y < colEnd; y += 1) {
          sum += array2D[x][y];
        }
      }
      const average = sum / (blockSize * blockSize);
      downSampledArray.push(average);
    }
  }
  return chunk(downSampledArray, numCols);
};
