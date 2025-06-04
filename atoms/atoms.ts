import { Player, Round, Rounds, Team, TotalScore } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<Player[]>(() => AsyncStorage);

export const playersAtom = atomWithStorage<Player[]>("players", [], storage);
export const teamsAtom = atom<Team[]>([]);

export const currentRoundAtom = atom<Round | null>(null);
export const roundsAtom = atom<Rounds[]>([
  {
    id: 0,
    scores: [
      { playerId: 0, score: 0 },
      { playerId: 1, score: 0 },
      { playerId: 2, score: 0 },
      { playerId: 3, score: 0 },
    ],
  },
  {
    id: 1,
    scores: [
      { playerId: 0, score: 10 },
      { playerId: 1, score: 2 },
      { playerId: 2, score: 3 },
      { playerId: 3, score: 2 },
    ],
  },
]);

export const currentDealerAtom = atom<Player | null>(null);
export const currentCutterAtom = atom<Player | null>(null);

export const totalScoresAtom = atom<TotalScore[]>([
  { playerId: 0, score: 0 },
  { playerId: 1, score: 0 },
  { playerId: 2, score: 0 },
  { playerId: 3, score: 0 },
]);

const exampleRounds = [
  {
    id: 0,
    bids: [
      { playerId: 0, amount: 10 },
      { playerId: 1, amount: 2 },
      { playerId: 2, amount: 2 },
      { playerId: 3, amount: 2 },
    ],
  },
];

const exampleTotalScores = [
  { playerId: 0, score: 0 },
  { playerId: 1, score: 0 },
  { playerId: 2, score: 0 },
  { playerId: 3, score: 0 },
];
