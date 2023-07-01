import { Box, Button, Stack, Typography } from "@mui/material";
import { GameState } from "../../models/state";
import { PlayersView } from "../Game/PlayersView";
import { usePlayerVotes } from "./hooks/usePlayerVotes";
import { PlayerService } from "../../services/PlayerService";

interface VoteViewProps {
  state: GameState;
  onRoundStartClick: () => void;
}

export const VoteView = ({ state, onRoundStartClick }: VoteViewProps) => {
  const votes = usePlayerVotes();

  const activePlayers = PlayerService.getActivePlayers(state);

  const playerVotes = activePlayers.map((player) => {
    const playerVote = votes.find(
      (vote) => vote.connectionLabel === player.connectionLabel
    );

    const targetPlayerVote = playerVote
      ? activePlayers.find(
          (x) => x.connectionLabel === playerVote.voteConnectionLabel
        )
      : null;

    return {
      who: player,
      against: targetPlayerVote,
    };
  });

  console.log(playerVotes);

  return (
    <Stack direction="column" spacing={2}>
      <Box>
        {playerVotes.map((vote) => {
          const msg = `${vote.who.name} => ${vote.against?.name ?? "NO VOTE"}`;
          return <Typography>{msg}</Typography>;
        })}
      </Box>
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
    </Stack>
  );
};
