import { Box, Stack, Typography } from "@mui/material";
import { GameState } from "../../models/state";
import { BankView } from "./BankView";
import { PlayerView } from "./PlayersView";
import { Timer } from "./Timer";

interface RoundViewProps {
  state: GameState;
}

export const RoundView = ({ state }: RoundViewProps) => {
  const round = state.round;
  if (!round) {
    return;
  }

  const filteredPlayers = state.players.filter((_, index) => {
    return round.activePlayersIndexes.includes(index);
  });

  return (
    <Stack
      height="100vh"
      spacing={10}
      marginX={10}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <BankView state={state} />
      </Box>
      <Box>
        <Stack spacing={6}>
          <PlayerView player={filteredPlayers[round.activePlayerIndex]} />
          <Typography variant="h3" textAlign="center">
            {round.activeQuestionText}
          </Typography>
          <Timer seconds={round.roundDuration} />
        </Stack>
      </Box>
    </Stack>
  );
};
