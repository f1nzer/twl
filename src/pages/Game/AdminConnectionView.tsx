import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { usePeer } from "../../hooks/usePeer";

function AdminConnectionView() {
  const { peerId } = usePeer();

  const adminGameUrl = "admin?gameId=" + peerId;
  const size = 512;

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      {" "}
      <div>
        <Link to={"/player"}>PLAYER PAGE</Link>
      </div>
      <Typography variant="h1">ADMIN</Typography>
      <Box>
        {peerId ? (
          <Link to={adminGameUrl} target="_blank" rel="noopener noreferrer">
            <QRCode
              size={size}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`${location.href}#/${adminGameUrl}`}
            />
          </Link>
        ) : (
          <CircularProgress size={size} />
        )}
      </Box>
    </Stack>
  );
}

export default AdminConnectionView;
