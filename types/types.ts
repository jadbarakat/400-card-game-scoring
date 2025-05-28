export type Player = {
  id: number;
  playerName: string;
  teamName: string;
};

export type Team = {
  id: number;
  teamName: string;
  players: Player[];
};

export type TableContentProps = {
  data: (string | number)[][];
};
