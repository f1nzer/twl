import { GameState, Player } from "../models/state";

const getActivePlayers = (state?: GameState): Player[] => {
  const round = state?.round;
  if (!round) {
    return [];
  }

  return state.players.filter((_, index) => {
    return round.activePlayersIndexes.includes(index);
  });
};

export const PlayerService = {
  getActivePlayers,
};
