import { Stack } from "@mui/material";
import { GameState } from "../../models/state";
import { PlayersView } from "./PlayersView";
import QRCode from "react-qr-code";
import { ADMIN_CONNECTION_LABEL } from "../../models/networking";
import { Link } from "react-router-dom";
import { usePeerConnection } from "../../hooks/usePeerConnection";

interface LobbyViewProps {
  state: GameState;
}

export const LobbyView = ({ state }: LobbyViewProps) => {
  const { connection } = usePeerConnection(ADMIN_CONNECTION_LABEL);

  const adminPeerId = connection!.peer;
  const playerUrl = `player?peerId=${adminPeerId}`;
  return (
    <Stack
      direction="column"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <PlayersView players={state.players} />
      <Link to={playerUrl} target="_blank" rel="noopener noreferrer">
        <QRCode value={`${location.href}#/${playerUrl}`} />
      </Link>
    </Stack>
  );
};
