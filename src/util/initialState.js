const DEFAULT_SEED = [[4,5], [4,6], [4,7], [5,5], [5,6], [5,7]];

const generateInitialState = (selectedSize, seed) => {
  const board = Array(selectedSize).fill(0).map(row => Array(selectedSize).fill(0));
  const withSeed = (seed.length > 0 ? seed : DEFAULT_SEED).reduce((state, point) => {
    const [x, y] = point;
    state[x][y] = 1;
    return state;
  }, board);
  return withSeed;
}

export default generateInitialState;