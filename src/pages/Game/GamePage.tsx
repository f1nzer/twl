import { LobbyView } from "./LobbyView";
import { RoundView } from "./RoundView";
import { usePeer } from "../../hooks/usePeer";
import AdminConnectionView from "./AdminConnectionView";
import { GameStatus } from "../../models/state";
import { VoteView } from "./VoteView";

export const GamePage = () => {

  const { isConnected, lastData } = usePeer();

  if (!isConnected) {
    return <AdminConnectionView />;
  }

  console.log("LAST DATA", lastData);
  if (!lastData) {
    return <>waiting for data...</>;
  }

  // TODO: display UI for the LOBBY status (with players list)
  // TODO: display UI for the ROUND status (with question, total/current bank, players and timer)
  // TODO: display UI for the VOTE status (players and bank)

  if (lastData.status === GameStatus.LOBBY) {
    return <LobbyView state={lastData} />;
  }

  if (lastData.status == GameStatus.VOTE) {
    return <VoteView state={lastData} />;
  }

  if (lastData.status === GameStatus.ROUND) {
    return <RoundView state={lastData} />;
  }

  return <>game page</>;
};
