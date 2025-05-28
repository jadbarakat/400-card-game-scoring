import { Player, Team } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

// AsyncStorage.clear();

export const teamsAtom = atomWithStorage<Team[]>(
  "teams",
  [],
  createJSONStorage(() => AsyncStorage)
);

export const playersAtom = atomWithStorage<Player[]>(
  "players",
  [],
  createJSONStorage(() => AsyncStorage)
);

export const totalScoresAtom = atomWithStorage("totalScores", [
  { playerId: 0, playerTotalScore: 20 },
  { playerId: 1, playerTotalScore: 20 },
  { playerId: 2, playerTotalScore: 20 },
  { playerId: 3, playerTotalScore: 20 },
]);

const examplePlayers = [
  { id: 0, name: "Jad", teamName: "Champs" },
  { id: 1, name: "Pat", teamName: "Champs" },
  { id: 2, name: "Jase", teamName: "Losers" },
  { id: 3, name: "Tex", teamName: "Losers" },
];

const exampleTeams = [
  {
    id: 0,
    teamName: "Champs",
    players: [
      {
        id: 0,
        playerName: "Jad",
      },
      {
        id: 1,
        playerName: "Pat",
      },
    ],
  },
  {
    id: 1,
    teamName: "Losers",
    players: [
      {
        id: 2,
        playerName: "Jase",
      },
      {
        id: 3,
        playerName: "Tex",
      },
    ],
  },
];
