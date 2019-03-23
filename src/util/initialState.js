const MAX_LENGTH = 10;

const generateInitialState = () => {
  const board = Array(MAX_LENGTH).fill(0).map(row => Array(MAX_LENGTH).fill(0));
  const seed = [[4,5], [4,6], [4,7], [5,5], [5,6], [5,7]];
  const withSeed = seed.reduce((state, point) => {
    const [x, y] = point;
    state[x][y] = 1;
    return state;
  }, board);
  return withSeed;
}

export default generateInitialState;