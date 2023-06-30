import { LobbyView } from "./LobbyView";
import { RoundView } from "./RoundView";
import AdminConnectionView from "./AdminConnectionView";
import { GameState, GameStatus } from "../../models/state";
import { VoteView } from "./VoteView";
import { ADMIN_CONNECTION_LABEL } from "../../models/networking";
import { usePeerConnection } from "../../hooks/usePeerConnection";

export const GamePage = () => {
  const { isConnected, lastMessage } = usePeerConnection(ADMIN_CONNECTION_LABEL);

  if (!isConnected) {
    return <AdminConnectionView />;
  }

  if (!lastMessage) {
    return <>waiting for data...</>;
  }

  const gameState = lastMessage.data as GameState;

  if (gameState.status === GameStatus.LOBBY) {
    return <LobbyView state={gameState} />;
  }

  if (gameState.status == GameStatus.VOTE) {
    return <VoteView state={gameState} />;
  }

  if (gameState.status === GameStatus.ROUND) {
    return <RoundView state={gameState} />;
  }

  return <>game page</>;
};
