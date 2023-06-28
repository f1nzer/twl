import { Grid } from "@mui/material";
import { GameState } from "../../models/state";
import { PlayersView } from "./PlayersView";

interface LobbyViewProps {
  state: GameState;
}

export const LobbyView = ({ state }: LobbyViewProps) => {
  return (
    <Grid container spacing={4} height="100vh">
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <PlayersView players={state.players} />
      </Grid>
    </Grid>
  );
};
