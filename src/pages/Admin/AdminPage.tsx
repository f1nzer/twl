import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { ADMIN_CONNECTION_LABEL } from "../../models/networking";
import { GameView } from "./GameView";
import { CircularProgress, Grid } from "@mui/material";
import { usePeerConnection } from "../../hooks/usePeer";

export const AdminPage = () => {
  const [searchParams] = useSearchParams();
  const { connect, isConnected, peerId } = usePeerConnection(
    ADMIN_CONNECTION_LABEL
  );

  const size = 256;

  useEffect(() => {
    if (!peerId || isConnected) {
      return;
    }

    const gameId = searchParams.get("gameId");
    if (!gameId) {
      return;
    }

    connect(gameId);
  }, [connect, isConnected, peerId, searchParams]);

  // TODO: add button to remove a player
  // TODO: start new round without the removed player
  // TODO: debug button to RESET state to start from the beginning

  return (
    <Grid container spacing={2} height="100vh">
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {isConnected ? <GameView /> : <CircularProgress size={size} />}
      </Grid>
    </Grid>
  );
};
