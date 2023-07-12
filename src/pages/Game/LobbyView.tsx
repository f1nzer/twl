import { Stack } from "@mui/material";
import { GameState } from "../../models/state";
import { PlayersView } from "./PlayersView";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

interface LobbyViewProps {
  state: GameState;
  peerId: string;
}

export const LobbyView = ({ state, peerId }: LobbyViewProps) => {
  const playerUrl = `player?peerId=${peerId}`;
  return (
    <Stack spacing={4} direction="column" alignItems="center">
      <PlayersView players={state.players} />
      <Link to={playerUrl} target="_blank" rel="noopener noreferrer">
        <QRCode
          size={512}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={`${location.href}#/${playerUrl}`}
        />
      </Link>
    </Stack>
  );
};
