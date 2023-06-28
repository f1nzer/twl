import { useSearchParams } from "react-router-dom";
import { GameState, GameStatus } from "../../models/state";
import { PeerState } from "../../services/peer-service";
import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { ManageRoundView } from "./ManageRoundView";

let gameState : GameState = {
  bankTotal: 10,
  players: [{ name: "КОНСТАНТИН" }, { name: "СЕМЁН" }, { name: "АЛЕКСЕЙ" }],
  status: GameStatus.ROUND,
  round: {
    activePlayerIndex: 0,
    activePlayersIndexes: [0,1,2],
    priceValues: [1000, 2000, 3000, 4000, 5000],
    currentPriceIndex: 0,
    roundDuration: 70 + 30,
    bankTotal: 0,
    activeQuestionText: "Какой ты сегодня?"
  }
}

export const AdminPage = () => {
  const [searchParams] = useSearchParams();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const sendState = () => {
    PeerState.send(gameState);
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
    <Typography>{gameState.bankTotal}</Typography>
      <ul>
        {!isConnected && (
          <li>
            <Button onClick={() => connect()}>CONNECT</Button>
          </li>
        )}
        <li>
          <Button onClick={() => sendState()}>SEND STATE</Button>
        </li>
      </ul>
      <ManageRoundView state={gameState} />
    </>
  );
};
