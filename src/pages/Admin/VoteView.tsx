import { Box, Button, Grid, Typography } from "@mui/material";
import { GameState, Player } from "../../models/state"
import { PlayersView } from "../Game/PlayersView";
import { usePlayersVoteMessages } from "./hooks/usePlayersVoteMessages";

interface VoteViewProps {
  state: GameState,
  onRoundStartClick: () => void;
}

export const VoteView = ({ state, onRoundStartClick }: VoteViewProps) => {
  //TODO clean up vote messages after round or handle each message 
  const { voteMessages } = usePlayersVoteMessages();

  const activePlayers: Player[] = state.players.filter((_player, index) =>
    state.round?.activePlayersIndexes.includes(index)
  );

  return (
    <>
      <Grid>
        {voteMessages.map(voteMessage => (
          <Typography>{voteMessage.name} ={">"} {voteMessage.votePlayerLabel}</Typography>
        ))}
        <PlayersView players={activePlayers} />
        <Box textAlign={"center"}>
          <Button
            sx={{ width: 200 }}
            size="large"
            variant="contained"
            color="success"
            onClick={() => onRoundStartClick()}
          >
            НАЧАТЬ РАУНД
          </Button>
        </Box>
      </Grid>
    </>
  );
}
