import { Stack } from "@mui/material";
import { GameState } from "../../models/state";
import { PlayersView } from "./PlayersView";

interface LobbyViewProps {
  state: GameState;
}

export const LobbyView = ({ state }: LobbyViewProps) => {
  return (
    <Stack
      direction="column"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <PlayersView players={state.players} />
    </Stack>
  );
};
