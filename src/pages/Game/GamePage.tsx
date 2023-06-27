import { useEffect, useState } from "react";
import { PeerState } from "../../services/peer-service";
import { GameState, GameStatus } from "../../models/state";

interface LobbyViewProps {
  state: GameState;
}

export const LobbyView = ({ state }: LobbyViewProps) => {
  return <>lobby view: {state.bankTotal}</>;
};

export const GamePage = () => {
  const [gameState, setGameState] = useState<GameState>({
    bankTotal: 0,
    status: GameStatus.LOBBY,
    players: [],
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

  return <>game page</>;
};
