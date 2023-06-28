import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { Grid } from "@mui/material";
import { usePeer } from "../../hooks/usePeer";

function AdminConnectionView() {
  const { peerId } = usePeer();

  const adminGameUrl = "admin?gameId=" + peerId;

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <>
            <div>
              <ul>
                <li>
                  <Link to={"/player"}>PLAYER PAGE</Link>
                </li>
              </ul>
            </div>
            <div>
              {peerId && (
                <Link
                  to={adminGameUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <QRCode value={`${location.href}#/${adminGameUrl}}`} />
                </Link>
              )}
            </div>
          </>
        </Grid>
      </Grid>
    </>
  );
}

export default AdminConnectionView;
