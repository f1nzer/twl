import { Box, Stack } from "@mui/material";
import { GameState } from "../../models/state";
import { PlayersView } from "./PlayersView";
import { BankItemView } from "./BankItemView";
import { PlayerService } from "../../services/PlayerService";

interface VoteViewProps {
  state: GameState;
}

export const VoteView = ({ state }: VoteViewProps) => {
  const activePlayers = PlayerService.getActivePlayers(state);
  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <PlayersView players={activePlayers} />
      <Box>
        <BankItemView isSummary value={`БАНК: ${state.bankTotal}`} />
      </Box>
    </Stack>
  );
};
