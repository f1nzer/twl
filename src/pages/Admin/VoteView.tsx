import { Box, Button, Stack, Typography } from "@mui/material";
import { GameState, Player } from "../../models/state";
import { PlayersView } from "../Game/PlayersView";
import { usePlayerVotes } from "./hooks/usePlayerVotes";
import { PlayerService } from "../../services/PlayerService";
import { useMemo, useState } from "react";

interface VoteViewProps {
  state: GameState;
  onRoundStartClick: (playerToRemove?: Player) => void;
}

export const VoteView = ({ state, onRoundStartClick }: VoteViewProps) => {
  const votes = usePlayerVotes();
  const [playerToRemove, setPlayerToRemove] = useState<Player>();

  const activePlayers = PlayerService.getActivePlayers(state);

  const playerVotes = useMemo(() => {
    return activePlayers.map((player) => {
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
  }, [activePlayers, votes]);

  const theWeakestPlayer = useMemo(() => {
    if (playerToRemove) {
      return playerToRemove;
    }

    const playersStats = playerVotes
      .map((vote) => vote.against?.connectionLabel)
      .reduce((acc, curr) => {
        if (!curr) {
          return acc;
        }

        const count = acc.get(curr) ?? 0;
        acc.set(curr, count + 1);

        return acc;
      }, new Map<string, number>());

    // get the player with the most votes
    const maxVotes = Math.max(...Array.from(playersStats.values()));
    const weakestLinkPlayers = Array.from(playersStats.entries()).filter(
      (x) => x[1] === maxVotes
    );

    return weakestLinkPlayers.length === 1
      ? activePlayers.find(
          (x) => x.connectionLabel === weakestLinkPlayers[0][0]
        )
      : undefined;
  }, [activePlayers, playerToRemove, playerVotes]);

  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <Box>
        <Typography variant="h5" gutterBottom>
          Слабое звено: {theWeakestPlayer?.name || "отсутствует"}
        </Typography>
        {playerVotes.map((vote) => {
          const msg = `${vote.who.name} => ${
            vote.against?.name ?? "нет голоса"
          }`;
          return <Typography key={vote.who.connectionLabel}>{msg}</Typography>;
        })}
      </Box>
      <PlayersView
        players={activePlayers}
        onClick={(player) => setPlayerToRemove(player)}
        selectedPlayer={theWeakestPlayer}
      />
      <Box textAlign={"center"}>
        <Button
          sx={{ width: 200 }}
          size="large"
          variant="contained"
          color="success"
          disabled={!theWeakestPlayer}
          onClick={() => onRoundStartClick(theWeakestPlayer)}
        >
          НАЧАТЬ РАУНД
        </Button>
      </Box>
    </Stack>
  );
};
