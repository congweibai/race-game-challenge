export const createRaceArray = (n: number) => {
  return Array.from({ length: Math.max(n, 2) }, (_, index) => ({
    order: index,
    studentIds: [],
  }));
};
