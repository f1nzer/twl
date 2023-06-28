import { useSearchParams } from "react-router-dom";
import { GameState, GameStatus } from "../../models/state";
import { ManageRoundView } from "./ManageRoundView";
import { usePeer } from "../../hooks/usePeer";
import { useEffect } from "react";
import { ADMIN_CONNECTION_LABEL } from "../../models/networking";

const gameState: GameState = {
  bankTotal: 10,
  players: [{ name: "КОНСТАНТИН" }, { name: "СЕМЁН" }, { name: "АЛЕКСЕЙ" }],
  status: GameStatus.LOBBY,
  round: {
    activePlayerIndex: 0,
    activePlayersIndexes: [0, 1, 2],
    priceValues: [1000, 2000, 3000, 4000, 5000],
    currentPriceIndex: 0,
    roundDuration: 70 + 30,
    bankTotal: 0,
    activeQuestionText: "Какой ты сегодня?",
  },
};

export const AdminPage = () => {
  const [searchParams] = useSearchParams();
  const { isConnected, peerId, connect, send } = usePeer();

  useEffect(() => {
    if (!peerId || isConnected) {
      return;
    }

    const gameId = searchParams.get("gameId");
    if (!gameId) {
      return;
    }

    connect(gameId, ADMIN_CONNECTION_LABEL);
  }, [connect, isConnected, peerId, searchParams]);

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    send(gameState, ADMIN_CONNECTION_LABEL);
  }, [isConnected, send]);

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
      <ManageRoundView state={gameState} />
    </>
  );
};
