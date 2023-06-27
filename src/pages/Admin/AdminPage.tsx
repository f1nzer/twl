import { useSearchParams } from "react-router-dom";
import { GameStatus } from "../../models/state";
import { PeerState } from "../../services/peer-service";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export const AdminPage = () => {
  const [searchParams] = useSearchParams();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const sendState = () => {
    PeerState.send({
      bankTotal: 10,
      players: [],
      status: GameStatus.LOBBY,
    });
  };

  const connect = () => {
    const gameId = searchParams.get("gameId") || "";
    PeerState.init({
      onIdReceived: () =>
        PeerState.connect({
          peerId: gameId,
          onOutConnection: () => {
            setIsConnected(true);
          },
        }),
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

  return (
    <>
      <ul>
        <li>
          <Button onClick={() => connect()}>CONNECT</Button>
        </li>
        <li>
          <Button onClick={() => sendState()}>SEND STATE</Button>
        </li>
      </ul>
    </>
  );
};
