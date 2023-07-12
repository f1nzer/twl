import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { Box, Stack, Typography } from "@mui/material";
import Spinner from "../../components/Spinner";

interface AdminConnectionViewProps {
  peerId?: string;
}

const QrView = ({ peerId }: AdminConnectionViewProps) => {
  const size = 512;
  if (!peerId) {
    return <Spinner size={size} />;
  }

  const adminGameUrl = "admin?gameId=" + peerId;
  return (
    <Link to={adminGameUrl} target="_blank" rel="noopener noreferrer">
      <QRCode
        size={size}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={`${location.href}#/${adminGameUrl}`}
      />
    </Link>
  );
};

export const AdminConnectionView = ({ peerId }: AdminConnectionViewProps) => {
  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h1">ADMIN</Typography>
      <Box>
        <QrView peerId={peerId} />
      </Box>
    </Stack>
  );
};
