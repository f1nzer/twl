import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PeerState } from "../../services/peer-service";
import QRCode from "react-qr-code";
import { Grid } from "@mui/material";

function App() {
  const [peerId, setPeerId] = useState<string>("");
  const navigate = useNavigate();

  // TODO: display QR code with a direct link to the page www.twl.com/guid
  // that sets the peerId param to the value from the URL parameter and calls connect()

  // app
  useEffect(() => {
    PeerState.init({
      onIdReceived: (peerId) => setPeerId(peerId),
      onInConnection: () => navigate("/game"),
    });
  }, [navigate]);

  const adminGameUrl = "admin/?gameId=" + peerId;

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
                  <Link to={"/game"}>GAME PAGE</Link>
                </li>
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
                  <QRCode value={window.location + adminGameUrl} />
                </Link>
              )}
            </div>
          </>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
