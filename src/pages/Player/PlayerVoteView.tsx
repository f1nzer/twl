import { useEffect, useState } from "react";
import { GameState, Player } from "../../models/state";
import { NetworkMessageType } from "../../models/networking";
import { usePlayerState } from "./hooks/usePlayerState";
import { PlayersView } from "../Game/PlayersView";
import { Box, Button } from "@mui/material";
import { usePeerConnection } from "../../hooks/usePeerConnection";

interface PlayerViewProps {
  state: GameState;
}

export const PlayerVoteView = ({ state }: PlayerViewProps) => {
  const { connectionLabel } = usePlayerState();
  const [playerToRemove, setPlayerToRemovePlayer] = useState<Player>();
  const { send } = usePeerConnection(connectionLabel);

  useEffect(() => {
    if (!playerToRemove) {
      return;
    }

    const player = state.players.filter(player => player.connectionLabel === connectionLabel)[0];
    send(
      {
        type: NetworkMessageType.PLAYER_MESSAGE,
        data: {
          name: player.name,
          votePlayerLabel: playerToRemove.connectionLabel
        }
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerToRemove]);

  const onVoteClick = () => {
    //TODO get selected player to remove
    const player = state.players[0];
    setPlayerToRemovePlayer(player);
  };

  const round = state.round;
  if (!round) {
    return <>WAITING END ROUND</>
  }

  const candidatePlayers = state.players.filter((player, index) =>
    round.activePlayersIndexes.includes(index) &&
    player.connectionLabel !== connectionLabel);

  return (
    <>
      <PlayersView players={candidatePlayers} />
      <Box textAlign={"center"}>
        <Button
          size="large"
          variant="contained"
          onClick={() => onVoteClick()}
        >
          ПРОГОЛОСОВАТЬ
        </Button>
      </Box>
    </>
  );
}
