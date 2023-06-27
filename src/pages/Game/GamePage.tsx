import { useEffect, useState } from "react";
import { PeerState } from "../../services/peer-service";
import { GameState, GameStatus } from "../../models/state";
import { LobbyView } from "./LobbyView";
import { RoundView } from "./RoundView";

export const GamePage = () => {
  const [gameState, setGameState] = useState<GameState>({
    bankTotal: 0,
    status: GameStatus.ROUND,
    round: {
      activeQuestionText: "Какой город является столицей России?",
      activePlayersIndexes: [0, 1, 2],
      activePlayerIndex: 0,
      bankTotal: 10000,
      priceValues: [1000, 2000, 5000, 10000, 20000],
      currentPriceIndex: 0,
      roundDuration: 60,
    },
    players: [{ name: "КОНСТАНТИН" }, { name: "СЕМЁН" }, { name: "АЛЕКСЕЙ" }],
  });

  useEffect(() => {
    PeerState.onData((data) => {
      setGameState(data);
      console.log(data);
    });
  }, []);

  // TODO: display UI for the LOBBY status (with players list)
  // TODO: display UI for the ROUND status (with question, total/current bank, players and timer)
  // TODO: display UI for the VOTE status (players and bank)

  if (gameState.status === GameStatus.LOBBY) {
    return <LobbyView state={gameState} />;
  }

  if (gameState.status === GameStatus.ROUND) {
    return <RoundView state={gameState} />;
  }

  return <>game page</>;
};
