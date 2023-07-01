import { Box, Stack } from "@mui/material";
import { GameState } from "../../models/state";
import { PlayersView } from "./PlayersView";
import { BankItemView } from "./BankItemView";

interface VoteViewProps {
  state: GameState;
}

export const VoteView = ({ state }: VoteViewProps) => {

  return (
    <Stack
      direction="column"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <PlayersView players={state.players} />
      <Box>
        <BankItemView isSummary value={`БАНК: ${state.bankTotal}`} />
      </Box>
    </Stack>
  );
};
