import { useEffect, useState } from "react";
import { usePeerContext } from "../../../hooks/usePeerContext";
import { NetworkMessage, NetworkMessageType, PlayerMessage } from "../../../models/networking";

interface UsePlayersVoteData {
  voteMessages: PlayerMessage[];
}

export const usePlayersVoteMessages = (): UsePlayersVoteData => {
  const [voteMessages, setVoteMessages] = useState<PlayerMessage[]>([]);
  const { lastMessages } = usePeerContext();

  useEffect(() => {
    setVoteMessages(() => {
      const newVoteMessages: PlayerMessage[] = [];
      lastMessages.forEach((message: NetworkMessage) => {
        if (message && message.type === NetworkMessageType.PLAYER_MESSAGE) {
          const playerData = message.data as PlayerMessage;
          if (playerData.votePlayerLabel) {
            newVoteMessages.push(playerData);
          }
        }
      });

      return newVoteMessages;
    })

  }, [lastMessages]);

  return {
    voteMessages
  }
}
