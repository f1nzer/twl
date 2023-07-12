import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { ADMIN_CONNECTION_LABEL } from "../../models/networking";
import { GameView } from "./GameView";
import { Box, Container } from "@mui/material";
import { usePeerConnection } from "../../hooks/usePeerConnection";
import Spinner from "../../components/Spinner";
import { useNoSleep } from "../../hooks/useNoSleep";

export const AdminPage = () => {
  const [searchParams] = useSearchParams();
  const { connect, isConnected, peerId } = usePeerConnection(
    ADMIN_CONNECTION_LABEL
  );

  useNoSleep();

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
    <Container maxWidth="md">
      <Box
        minHeight="100vh"
        paddingY={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {isConnected ? <GameView /> : <Spinner size={size} />}
      </Box>
    </Container>
  );
};
