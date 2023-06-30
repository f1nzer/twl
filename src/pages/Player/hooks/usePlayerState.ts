import { useEffect, useState } from "react";
import { usePeer } from "../../../hooks/usePeer";
import { GameState } from "../../../models/state";
import { NetworkMessageType } from "../../../models/networking";

interface UsePlayerStateData {
  connectionLabel: string;
  gameState?: GameState;
}

export const usePlayerState = (): UsePlayerStateData => {
  const [connectionLabel, setConnectionLabel] = useState<string>("");
  const { peerId, lastMessages } = usePeer();
  const [gameState, setGameState] = useState<GameState>();

  useEffect(() => {
    setConnectionLabel(peerId ? `player-${peerId}` : "");
  }, [peerId]);

  useEffect(() => {
    const msg = lastMessages.get(connectionLabel);
    if (msg && msg.type === NetworkMessageType.GAME_STATE) {
      setGameState(msg.data as GameState);
    }
  }, [lastMessages]);

  return {
    connectionLabel,
    gameState,
  }
}