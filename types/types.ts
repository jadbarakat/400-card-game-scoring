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

type Bid = {
  playerId: number;
  amount: number;
};

type Score = {
  playerId: number;
  score: number;
};

export type Round = {
  id: number;
  bids: Bid[];
};

export type Rounds = {
  id: number;
  scores: Score[];
};

export type TotalScore = {
  playerId: number;
  score: number;
};
