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
