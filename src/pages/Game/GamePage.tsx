import { useEffect } from "react";
import { PeerState } from "../../services/peer-service";

export const GamePage = () => {
  useEffect(() => {
    PeerState.onData((data) => console.log(data));
  }, []);

  // TODO: display UI for the LOBBY status (with players list)
  // TODO: display UI for the ROUND status (with question, total/current bank, players and timer)
  // TODO: display UI for the VOTE status (players and bank)

  return <>game page</>;
};
