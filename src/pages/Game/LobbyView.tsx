import { GameState } from "../../models/state";
import { PlayersView } from "./PlayersView";

interface LobbyViewProps {
  state: GameState;
}

export const LobbyView = ({ state }: LobbyViewProps) => {
  return <PlayersView players={state.players} />;
};
