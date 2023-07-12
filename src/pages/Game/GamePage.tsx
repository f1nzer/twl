import { LobbyView } from "./LobbyView";
import { RoundView } from "./RoundView";
import { AdminConnectionView } from "./AdminConnectionView";
import { GameState, GameStatus } from "../../models/state";
import { VoteView } from "./VoteView";
import { ADMIN_CONNECTION_LABEL } from "../../models/networking";
import { usePeerConnection } from "../../hooks/usePeerConnection";
import { Box, Container } from "@mui/material";
import Spinner from "../../components/Spinner";

const GameView = () => {
  const { isConnected, lastMessage, peerId, connection } = usePeerConnection(
    ADMIN_CONNECTION_LABEL
  );

  if (!isConnected || !connection) {
    return <AdminConnectionView peerId={peerId} />;
  }

  if (!lastMessage) {
    return <Spinner />;
  }

  const gameState = lastMessage.data as GameState;

  if (gameState.status === GameStatus.LOBBY) {
    return <LobbyView state={gameState} peerId={connection.peer} />;
  }

  if (gameState.status == GameStatus.VOTE) {
    return <VoteView state={gameState} />;
  }

  if (gameState.status === GameStatus.ROUND) {
    return <RoundView state={gameState} />;
  }

  return <>unknown status</>;
};

export const GamePage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <GameView />
      </Box>
    </Container>
  );
};
