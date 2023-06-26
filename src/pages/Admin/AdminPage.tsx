import { GameStatus } from "../../models/state";
import { PeerState } from "../../services/peer-service";

export const AdminPage = () => {
  const sendState = () => {
    PeerState.send({
      bankTotal: 10,
      players: [],
      status: GameStatus.LOBBY,
    });
  };

  // TODO: add "new player" buttons
  // TODO: add "start game" button
  // TODO: timer for the round
  // TODO: 3 buttons CORRECT, INCORRECT, BANK
  // TODO: on timer end, send GAME STATUS VOTE (but let the player to answer last question)
  // TODO: add button to remove a player
  // TODO: start new round without the removed player

  // TODO: debug button to RESET state to start from the beginning

  return <button onClick={() => sendState()}>SEND STATE</button>;
};
