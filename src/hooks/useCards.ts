import { atom, useRecoilState } from "recoil";
import { valueCards } from "../config";
import { randomShuffle } from "../utils/card";

export const valueCardsState = atom<string[]>({
  key: "valueCardsState",
  default: randomShuffle(valueCards),
});

export const useCards = () => {
  const [cards, setCards] = useRecoilState(valueCardsState);

  return {
    cards,
    setCards,
  };
};
