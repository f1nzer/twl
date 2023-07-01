import { useState } from "react";
import { usePeerContext } from "../../../hooks/usePeerContext";
import { NetworkMessageType, PlayerMessage } from "../../../models/networking";
import { PlayerVote } from "../../../models/player";

export const usePlayerVotes = (): PlayerVote[] => {
  const [votes, setVotes] = useState<PlayerVote[]>([]);
  const { useSubscription } = usePeerContext();

  useSubscription((data) => {
    if (data.message.type === NetworkMessageType.PLAYER_MESSAGE) {
      const playerMessage = data.message.data as PlayerMessage;
      const vote = playerMessage.votePlayerLabel;
      if (vote) {
        setVotes((votes) => {
          const newVotes = [...votes];
          const existingVoteIndex = newVotes.findIndex(
            (vote) => vote.connectionLabel === data.connectionLabel
          );

          if (existingVoteIndex >= 0) {
            newVotes[existingVoteIndex].voteConnectionLabel = vote;
          } else {
            newVotes.push({
              connectionLabel: data.connectionLabel,
              voteConnectionLabel: vote,
            });
          }

          return newVotes;
        });
      }
    }
  });

  return votes;
};
