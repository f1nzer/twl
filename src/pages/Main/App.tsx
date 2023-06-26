import { useEffect, useState } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import { PeerState } from "../../services/peer-service";

function App() {
  const [myPeerId, setMyPeerId] = useState<string>("");
  const [peerId, setPeerId] = useState<string>("");
  const navigate = useNavigate();

  // TODO: display QR code with a direct link to the page www.twl.com/guid
  // that sets the peerId param to the value from the URL parameter and calls connect()

  // app
  useEffect(() => {
    PeerState.init({
      onIdReceived: (peerId) => setMyPeerId(peerId),
      onInConnection: () => navigate("/game"),
    });
  }, [navigate]);

  const connect = () => {
    console.log("connect...");
    if (peerId) {
      PeerState.connect({
        peerId,
        onOutConnection: () => navigate("/admin"),
      });
    }
  };

  return (
    <>
      <div>
        <Link to={"/admin"}>ADMIN PAGE</Link>
        <br />
        <Link to={"/game"}>GAME PAGE</Link>
      </div>
      <div>
        <div>My peer id: {myPeerId}</div>
      </div>
      <div>
        <input
          type="text"
          value={peerId}
          onChange={(e) => setPeerId(e.target.value)}
        />
        <button onClick={() => connect()}>Connect</button>
      </div>
    </>
  );
}

export default App;
