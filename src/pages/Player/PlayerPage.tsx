import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { NetworkMessageType, PlayerMessage } from "../../models/networking";
import { PlayerNameForm } from "./PlayerNameForm";
import { usePlayerState } from "./hooks/usePlayerState";
import { usePeerConnection } from "../../hooks/usePeerConnection";

export const PlayerPage = () => {
  const [searchParams] = useSearchParams();
  const [playerMessage, setPlayerMessage] = useState<PlayerMessage>();
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
    if (!isConnected || !playerMessage) {
      return;
    }

    send({
      type: NetworkMessageType.PLAYER_MESSAGE,
      data: playerMessage,
    });
  }, [isConnected, playerMessage, send]);

  if (!isConnected) {
    return <CircularProgress size={512} />;
  }

  if (!playerMessage || !playerMessage.name) {
    return (
      <PlayerNameForm
        onSubmit={(name) =>
          setPlayerMessage((msg) => {
            return {
              ...msg,
              name,
            };
          })
        }
      />
    );
  }

  return <>GAME STATE: {gameState?.status ?? "NO DATA"}</>;
};
