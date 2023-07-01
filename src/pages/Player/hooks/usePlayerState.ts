import { useEffect, useState } from "react";
import { usePeerContext } from "../../../hooks/usePeerContext";
import { GameState } from "../../../models/state";
import { NetworkMessageType } from "../../../models/networking";

interface UsePlayerStateData {
  connectionLabel: string;
  gameState?: GameState;
}

export const usePlayerState = (): UsePlayerStateData => {
  const [connectionLabel, setConnectionLabel] = useState<string>("");
  const { peerId, useSubscription } = usePeerContext();
  const [gameState, setGameState] = useState<GameState>();

  useEffect(() => {
    setConnectionLabel(peerId ? `player-${peerId}` : "");
  }, [peerId]);

  useSubscription((data) => {
    if (
      data.connectionLabel === connectionLabel &&
      data.message.type === NetworkMessageType.GAME_STATE
    ) {
      setGameState(data.message.data as GameState);
    }
  });

  return {
    connectionLabel,
    gameState,
  };
};
