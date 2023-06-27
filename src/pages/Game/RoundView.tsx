import { Grid, Stack, Typography } from "@mui/material";
import { GameState } from "../../models/state";
import { BankView } from "./BankView";
import { PlayersView } from "./PlayersView";

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
    <Stack spacing={10} sx={{ minHeight: "100vh" }}>
      <PlayersView
        players={filteredPlayers}
        activePlayerIndex={round.activePlayerIndex}
      />
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={4}>
          <BankView state={state} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h3">{round.activeQuestionText}</Typography>
        </Grid>
      </Grid>
    </Stack>
  );
};
