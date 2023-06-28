import { useCallback, useEffect, useState } from "react";
import { PeerContext } from "./PeerContext";
import Peer, { DataConnection } from "peerjs";
import { GameState } from "../models/state";

export const PeerContextProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [peer, setPeer] = useState<Peer>();
  const [connected, setConnected] = useState<boolean>(false);
  const [peerId, setPeerId] = useState<string | undefined>();
  const [connections, setConnections] = useState<Map<string, DataConnection>>(
    new Map<string, DataConnection>()
  );
  const [lastData, setLastData] = useState<GameState>();

  const createPeer = useCallback((id?: string) => {
    setPeer(id ? new Peer(id) : new Peer());
  }, []);

  const connect = useCallback(
    (id: string, label?: string) => {
      if (!peer) {
        return;
      }

      const newConnection = peer.connect(id, { label });
      setConnections((connections) =>
        new Map(connections).set(newConnection.label, newConnection)
      );
    },
    [peer]
  );

  const send = useCallback(
    (data: GameState, connectionLabel: string) => {
      if (!connectionLabel) {
        throw new Error("connection is not set");
      }

      if (!connected) {
        throw new Error("connection is not open");
      }

      const connection = connections.get(connectionLabel);
      if (!connection) {
        throw new Error("connection is not set");
      }

      connection.send(data);
    },
    [connected, connections]
  );

  const disconnect = useCallback(() => {
    if (!peer) {
      return;
    }

    peer.disconnect();
    peer.destroy();
    setConnections(new Map<string, DataConnection>());
    setConnected(false);
    setPeer(undefined);
    setPeerId(undefined);
  }, [peer]);

  useEffect(() => {
    if (!connections?.size) {
      return;
    }

    const connectedHandler = () => {
      setConnected(true);
    };

    const disconnectedHandler = () => {
      setConnected(false);
    };

    const onDataHandler = (data: unknown) => {
      setLastData(data as GameState);
    };

    const errorHandler = (error: unknown) => {
      console.error(error);
    };

    const iceStateChangedHandler = (state: string) => {
      // TODO: decide how to handle this event (especially the "disconnected" state)
      console.log("iceStateChangedHandler", state);
    };

    for (const connection of connections.values()) {
      connection.on("open", connectedHandler);
      connection.on("close", disconnectedHandler);
      connection.on("error", errorHandler);
      connection.on("data", onDataHandler);
      connection.on("iceStateChanged", iceStateChangedHandler);
    }

    return () => {
      for (const connection of connections.values()) {
        connection.off("open", connectedHandler);
        connection.off("close", disconnectedHandler);
        connection.off("error", errorHandler);
        connection.off("data", onDataHandler);
        connection.off("iceStateChanged", iceStateChangedHandler);
      }
    };
  }, [connections]);

  useEffect(() => {
    if (!peer) {
      return;
    }

    const openHandler = (id: string) => {
      setPeerId(id);
    };

    const connectedHandler = (connection: DataConnection) => {
      setConnected(true);
      setConnections((connections) =>
        new Map(connections).set(connection.label, connection)
      );
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
