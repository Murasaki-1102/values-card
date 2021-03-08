export type Player = {
  uid: string;
  order: number;
  name: string;
  hand: string[];
};

export type Room = {
  name: string;
  owner: string;
  deck: string[];
  graveyards: string[];
  players: Player[];
};
