import { atom, useRecoilState } from "recoil";
import { valueCards } from "../config";
import { randomShuffle } from "../utils/card";

export const valueCardsState = atom<string[]>({
  key: "valueCardsState",
  default: randomShuffle(valueCards),
});

export const useCards = () => {
  const [cards, setCards] = useRecoilState(valueCardsState);

  const initialDraw = (index: number = 5) => {
    const initialCards = cards.slice(0, index);
    setCards(cards.slice(index));
    return initialCards;
  };

  const drawCard = () => {
    const drawCard = cards.slice(0, 1);
    setCards([...cards.slice(1)]);
    return drawCard;
  };

  return {
    cards,
    initialDraw,
    drawCard,
  };
};
