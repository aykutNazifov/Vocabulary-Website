export const shuffleArray = (array: Array<object>) => {
  return array.sort((a: object, b: object) => 0.5 - Math.random());
};
