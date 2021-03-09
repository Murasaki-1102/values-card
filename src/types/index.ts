export type Player = {
  uid: string;
  order: 1 | 2 | 3 | 4;
  name: string;
  hand: string[];
};

export type Room = {
  id: string;
  name: string;
  owner: string;
  deck: string[];
  graveyards: string[];
  players: Player[];
};
