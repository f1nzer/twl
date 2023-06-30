import { useEffect, useState } from "react";
import { Player } from "../../../models/state";
import { usePeerContext } from "../../../hooks/usePeerContext";
import { NetworkMessage, NetworkMessageType } from "../../../models/networking";

interface UsePlayersData {
  players: Player[];
}

export const usePlayers = (): UsePlayersData => {
  const [players, setPlayers] = useState<Player[]>([]);
  const { lastMessages } = usePeerContext();

  useEffect(() => {
    setPlayers((players) => {
      const newPlayers: Player[] = [];
      lastMessages.forEach((message: NetworkMessage, connectionLabel: string) => {
        if (message && message.type === NetworkMessageType.PLAYER_MESSAGE) {
          const playerData = message.data as PlayerMessage;
          const player = players.find(p => p.connectionLabel === connectionLabel);
          const newPlayer: Player = player
            ? { ...player, name: playerData.name, connectionLabel }
            : { name: playerData.name, connectionLabel };
          newPlayers.push(newPlayer);
        }
      });

      return newPlayers;
    });
  }, [lastMessages]);

  return {
    players
  }
}