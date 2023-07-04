import { Box, Button, Stack, Typography } from "@mui/material";
import { GameState, Player } from "../../models/state";
import { PlayersView } from "../Game/PlayersView";
import { usePlayerVotes } from "./hooks/usePlayerVotes";
import { PlayerService } from "../../services/PlayerService";
import { useState } from "react";

interface VoteViewProps {
  state: GameState;
  onRoundStartClick: (playerToRemove: Player | undefined) => void;
}

// interface VoteStat {
//   player: Player;
//   votesCount: number;
// }

export const VoteView = ({ state, onRoundStartClick }: VoteViewProps) => {
  const votes = usePlayerVotes();

  const [playerToRemove, setPlayerToRemove] = useState<Player>();

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

  // const [voteStats, setVoteStats] = useState<VoteStat[]>([]);
  // const updateVoteStats = (against: Player) => {
  //   const updatedVoteStats = [...voteStats];
  //   const playerIndex = updatedVoteStats.findIndex(x => x.player.connectionLabel === against.connectionLabel);
  //   if (playerIndex > -1) {
  //     updatedVoteStats[playerIndex].votesCount += 1;
  //   } else {
  //     updatedVoteStats.push({ player: against, votesCount: 1 });
  //   }
  //   setVoteStats(updatedVoteStats);
  // }

  const onPlayerSelected = (player: Player) => {
    setPlayerToRemove(player);
  }

  console.log(playerVotes);

  return (
    <Stack direction="column" spacing={2}>
      <Box>
        {playerVotes.map((vote) => {
          const msg = `${vote.who.name} => ${vote.against?.name ?? "NO VOTE"}`;
          return <Typography>{msg}</Typography>;
        })}
      </Box>
      <PlayersView players={activePlayers} onClick={onPlayerSelected} selectedPlayer={playerToRemove} />
      <Box textAlign={"center"}>
        <Button
          sx={{ width: 200 }}
          size="large"
          variant="contained"
          color="success"
          disabled={!playerToRemove}
          onClick={() => onRoundStartClick(playerToRemove)}
        >
          НАЧАТЬ РАУНД
        </Button>
      </Box>
    </Stack>
  );
};

