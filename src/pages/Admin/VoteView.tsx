import { Box, Button, Grid, Typography } from "@mui/material";
import { GameState, Player } from "../../models/state";
import { PlayersView } from "../Game/PlayersView";
import { usePlayerVotes } from "./hooks/usePlayerVotes";

interface VoteViewProps {
  state: GameState;
  onRoundStartClick: () => void;
}

export const VoteView = ({ state, onRoundStartClick }: VoteViewProps) => {
  const votes = usePlayerVotes();

  const activePlayers: Player[] = state.players.filter((_player, index) =>
    state.round?.activePlayersIndexes.includes(index)
  );

  const playerVotes = activePlayers.map((player) => {
    const voteFromPlayer = votes.find(
      (vote) => vote.connectionLabel === player.connectionLabel
    );
    return {
      player,
      votePlayerLabel: voteFromPlayer?.votePlayerLabel ?? "NO VOTE",
    };
  });

  return (
    <>
      <Grid>
        {playerVotes.map((vote) => {
          const targetPlayer = activePlayers.find(x => x.connectionLabel === vote.votePlayerLabel);
          const msg = `${vote.player.name} => ${targetPlayer?.name}`;
          return <Typography>{msg}</Typography>;
        })}
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
};
