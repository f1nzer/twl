import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Box, Container } from "@mui/material";
import { NetworkMessageType } from "../../models/networking";
import { PlayerNameForm } from "./PlayerNameForm";
import { usePlayerState } from "./hooks/usePlayerState";
import { usePeerConnection } from "../../hooks/usePeerConnection";
import { GameStatus } from "../../models/state";
import { PlayerVoteView } from "./PlayerVoteView";
import { PlayerWaitingView } from "./PlayerWaitingView";
import { useSessionStorageState } from "ahooks";
import { PlayerService } from "../../services/PlayerService";
import Spinner from "../../components/Spinner";
import { useNoSleep } from "../../hooks/useNoSleep";

const PlayerPageView = () => {
  const [searchParams] = useSearchParams();
  const [name, setName] = useSessionStorageState<string>("");
  const { connectionLabel, gameState } = usePlayerState();
  const { connect, send, isConnected } = usePeerConnection(connectionLabel);

  useEffect(() => {
    if (isConnected) {
      return;
    }

    const adminPeerId = searchParams.get("peerId");
    if (!adminPeerId) {
      return;
    }

    connect(adminPeerId);
  }, [connect, isConnected, searchParams]);

  useEffect(() => {
    if (!isConnected || !name) {
      return;
    }

    send({
      type: NetworkMessageType.PLAYER_MESSAGE,
      data: { name },
    });
  }, [isConnected, name, send]);

  if (!isConnected) {
    return <Spinner />;
  }

  if (!name) {
    return <PlayerNameForm onSubmit={(name) => setName(name)} />;
  }

  const isCurrentPlayerActive =
    gameState?.round &&
    PlayerService.getActivePlayers(gameState).some(
      (player) => player.connectionLabel === connectionLabel
    );

  if (gameState?.status === GameStatus.LOBBY || !isCurrentPlayerActive) {
    return <PlayerWaitingView />;
  }

  if (gameState?.status === GameStatus.VOTE) {
    const playersToVoteAgainst = PlayerService.getActivePlayers(
      gameState
    ).filter((x) => x.connectionLabel !== connectionLabel);

    return (
      <PlayerVoteView
        players={playersToVoteAgainst}
        onVote={(player) => {
          send({
            type: NetworkMessageType.PLAYER_MESSAGE,
            data: {
              votePlayerLabel: player.connectionLabel,
            },
          });
        }}
      />
    );
  }

  return <>GAME STATE: {gameState?.status ?? "NO DATA"}</>;
};

export const PlayerPage = () => {
  useNoSleep();

  return (
    <Container maxWidth="md">
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <PlayerPageView />
      </Box>
    </Container>
  );
};
