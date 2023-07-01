import { useState } from "react";
import { Player } from "../../../models/state";
import { usePeerContext } from "../../../hooks/usePeerContext";
import { NetworkMessageType, PlayerMessage } from "../../../models/networking";

export const usePlayers = (): Player[] => {
  const [players, setPlayers] = useState<Player[]>([]);
  const { useSubscription } = usePeerContext();

  useSubscription((data) => {
    if (data.message.type === NetworkMessageType.PLAYER_MESSAGE) {
      const playerMessage = data.message.data as PlayerMessage;
      if (!playerMessage.name) {
        return;
      }

      const playerName = playerMessage.name;
      setPlayers((players) => {
        const newPlayers = [...players];
        const existingPlayerIndex = newPlayers.findIndex(
          (player) => player.connectionLabel === data.connectionLabel
        );

        if (existingPlayerIndex >= 0) {
          newPlayers[existingPlayerIndex].name = playerName;
        } else {
          newPlayers.push({
            name: playerName,
            connectionLabel: data.connectionLabel,
          });
        }

        return newPlayers;
      });
    }
  });

  return players;
};
