import { useSearchParams } from "react-router-dom";
import { usePeer } from "../../hooks/usePeer";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { NetworkMessageType } from "../../models/networking";
import { PlayerNameForm } from "./PlayerNameForm";
import { usePlayerState } from "./hooks/usePlayerState";
import { usePeerConnection } from "../../hooks/usePeerConnection";

export const PlayerPage = () => {
  const [searchParams] = useSearchParams();
  const [playerName, setPlayerName] = useState<string>("");
  const { connect, send } = usePeer();
  const { connectionLabel, gameState } = usePlayerState();
  const { isConnected } = usePeerConnection(connectionLabel);

  useEffect(() => {
    if (!connectionLabel || isConnected) {
      return;
    }

    const adminPeerId = searchParams.get("peerId");
    if (!adminPeerId) {
      return;
    }

    connect(adminPeerId, connectionLabel);
  }, [connect, isConnected, connectionLabel, searchParams]);

  useEffect(() => {
    if (!connectionLabel || !playerName || !isConnected) {
      return;
    }

    send({
      type: NetworkMessageType.PLAYER_MESSAGE,
      data: {
        name: playerName
      }
    }, connectionLabel);
  }, [connectionLabel, playerName]);

  if (!isConnected) {
    return <CircularProgress size={512} />
  }

  if (!playerName) {
    return (
      <PlayerNameForm onSubmit={(name) => setPlayerName(name)} />
    );
  }

  return <>GAME STATE: {gameState?.status ?? "NO DATA"}</>;
}
