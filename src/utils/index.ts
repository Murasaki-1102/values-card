export const randomShuffle = (cards: string[]) => {
  const shuffleCards = [...cards];
  for (let i = cards.length; 1 < i; i--) {
    const k = Math.floor(Math.random() * i);
    [shuffleCards[k], shuffleCards[i - 1]] = [
      shuffleCards[i - 1],
      shuffleCards[k],
    ];
  }
  return shuffleCards;
};

export const getNextOrder = (order: number): number => {
  if (order === 4) return 1;
  return order + 1;
};

export const getPrevOrder = (order: number): number => {
  if (order === 1) return 4;
  return order - 1;
};

export const getFrontOrder = (order: number): number => {
  if (order === 3) return 1;
  if (order === 4) return 2;
  return order + 2;
};
