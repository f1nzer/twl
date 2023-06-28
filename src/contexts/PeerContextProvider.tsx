import { useEffect, useState } from "react";
import { PeerContext } from "./PeerContext";
import Peer, { DataConnection } from "peerjs";
import { GameState } from "../models/state";

interface PeerContextProviderProps {
  test?: string;
}

export const PeerContextProvider = ({
  children,
}: React.PropsWithChildren<PeerContextProviderProps>) => {
  const [peer, setPeer] = useState<Peer>();
  const [connected, setConnected] = useState<boolean>(false);
  const [peerId, setPeerId] = useState<string | undefined>();
  const [connection, setConnection] = useState<DataConnection>();
  const [lastData, setLastData] = useState<GameState>();

  const createPeer = (id?: string) => {
    setPeer(id ? new Peer(id) : new Peer());
  };

  const connect = (id: string) => {
    if (!peer) {
      return;
    }

    setConnection(peer.connect(id));
  };

  const send = (data: GameState) => {
    if (!connection) {
      throw new Error("connection is not set");
    }

    if (!connected) {
      throw new Error("connection is not open");
    }

    connection.send(data);
  };

  const disconnect = () => {
    if (!peer) {
      return;
    }

    connection?.close();
    peer.disconnect();
    peer.destroy();
    setPeer(undefined);
  };

  useEffect(() => {
    if (!connection) {
      return;
    }

    const connectedHandler = () => {
      setConnected(true);
    };

    const onDataHandler = (data: unknown) => {
      setLastData(data as GameState);
    };

    connection.on("open", connectedHandler);
    connection.on("data", onDataHandler);

    return () => {
      connection.off("open", connectedHandler);
      connection.off("data", onDataHandler);
    };
  }, [connection]);

  useEffect(() => {
    if (!peer) {
      return;
    }

    const openHandler = (id: string) => {
      setPeerId(id);
    };

    const connectedHandler = (conn: DataConnection) => {
      setConnected(true);
      setConnection(conn);
    };

    const disconnectedHandler = () => {
      setConnected(false);
    };

    peer.on("open", openHandler);
    peer.on("connection", connectedHandler); // incoming
    peer.on("disconnected", disconnectedHandler); // incoming

    return () => {
      peer.off("open", openHandler);
      peer.off("connection", connectedHandler);
      peer.off("disconnected", disconnectedHandler);
    };
  }, [peer]);

  return (
    <PeerContext.Provider
      value={{
        createPeer,
        send,
        connect,
        disconnect,
        isConnected: connected,
        peerId,
        lastData,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};
