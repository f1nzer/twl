import { useCallback, useEffect, useState } from "react";
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

  const createPeer = useCallback((id?: string) => {
    setPeer(id ? new Peer(id) : new Peer());
  }, []);

  const connect = useCallback(
    (id: string) => {
      if (!peer) {
        return;
      }

      setConnection(peer.connect(id));
    },
    [peer]
  );

  const send = useCallback((data: GameState) => {
    if (!connection) {
      throw new Error("connection is not set");
    }

    if (!connected) {
      throw new Error("connection is not open");
    }

    connection.send(data);
  }, [connected, connection]);

  const disconnect = useCallback(() => {
    if (!peer) {
      return;
    }

    connection?.close();
    peer.disconnect();
    peer.destroy();
    setPeer(undefined);
  }, [connection, peer]);

  useEffect(() => {
    if (!connection) {
      return;
    }

    const connectedHandler = () => {
      setConnected(true);
    };

    const disconnectedHandler = () => {
      console.log("disconnect...");
      setConnected(false);
    };

    const onDataHandler = (data: unknown) => {
      setLastData(data as GameState);
    };

    const errorHandler = (error: unknown) => {
      console.error(error);
      setConnected(false);
    };

    const iceStateChangedHandler = (state: string) => {
      // TODO: decide how to handle this event (especially the "disconnected" state)
      console.log("iceStateChangedHandler", state);
    };

    connection.on("open", connectedHandler);
    connection.on("close", disconnectedHandler);
    connection.on("error", errorHandler);
    connection.on("data", onDataHandler);
    connection.on("iceStateChanged", iceStateChangedHandler);

    return () => {
      connection.off("open", connectedHandler);
      connection.off("close", disconnectedHandler);
      connection.off("error", errorHandler);
      connection.off("data", onDataHandler);
      connection.off("iceStateChanged", iceStateChangedHandler);
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

    const errorHandler = (error: unknown) => {
      console.error(error);
    };

    peer.on("open", openHandler);
    peer.on("error", errorHandler);
    peer.on("connection", connectedHandler); // incoming
    peer.on("disconnected", disconnectedHandler); // incoming

    return () => {
      peer.off("open", openHandler);
      peer.off("error", errorHandler);
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
