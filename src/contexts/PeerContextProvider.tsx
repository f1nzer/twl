import { useCallback, useEffect, useState } from "react";
import { PeerContext } from "./PeerContext";
import Peer, { DataConnection } from "peerjs";
import { NetworkMessage, ReceivedNetworkMessage } from "../models/networking";
import { useEventEmitter } from "ahooks";

export const PeerContextProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [peer, setPeer] = useState<Peer>();
  const [peerId, setPeerId] = useState<string>();

  const dataEmitter = useEventEmitter<ReceivedNetworkMessage>();

  const [connected, setConnected] = useState<Map<string, boolean>>(
    new Map<string, boolean>()
  );
  const [connections, setConnections] = useState<Map<string, DataConnection>>(
    new Map<string, DataConnection>()
  );

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
    (data: NetworkMessage, connectionLabel: string) => {
      if (!connectionLabel) {
        throw new Error(`connection label is not set: ${connectionLabel}`);
      }

      if (!connected.get(connectionLabel)) {
        throw new Error(`connection is not open: ${connectionLabel}`);
      }

      const connection = connections.get(connectionLabel);
      if (!connection) {
        throw new Error(`connection was not created: ${connectionLabel}`);
      }

      console.log("SENDING DATA", data);
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
    setConnected(new Map<string, boolean>());
    setPeer(undefined);
    setPeerId(undefined);
  }, [peer]);

  useEffect(() => {
    if (!connections?.size) {
      return;
    }

    function connectedHandler(this: DataConnection) {
      setConnected((connected) => new Map(connected).set(this.label, true));
    }

    function disconnectedHandler(this: DataConnection) {
      setConnected((connected) => {
        const newMap = new Map(connected);
        newMap.delete(this.label);
        return newMap;
      });

      setConnections((connections) => {
        const newMap = new Map(connections);
        newMap.delete(this.label);
        return newMap;
      });
    }

    function onDataHandler(this: DataConnection, data: unknown) {
      console.log(this.label, "received data", data);
      dataEmitter.emit({
        connectionLabel: this.label,
        message: data as NetworkMessage,
      });
    }

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
  }, [connections, dataEmitter]);

  useEffect(() => {
    if (!peer) {
      return;
    }

    const openHandler = (id: string) => {
      setPeerId(id);
      sessionStorage.setItem("peerId", id);
    };

    const connectedHandler = (connection: DataConnection) => {
      setConnected((connected) =>
        new Map(connected).set(connection.label, true)
      );
      setConnections((connections) =>
        new Map(connections).set(connection.label, connection)
      );
    };

    const disconnectedHandler = () => {
      if (!peer.destroyed) {
        peer.reconnect();
      }
    };

    const errorHandler = (error: unknown) => {
      const { type: errorType } = error as { type: string };
      console.error(errorType, error);
      disconnect();
    };

    peer.on("open", openHandler);
    peer.on("error", errorHandler);
    peer.on("connection", connectedHandler);
    peer.on("disconnected", disconnectedHandler);

    return () => {
      peer.off("open", openHandler);
      peer.off("error", errorHandler);
      peer.off("connection", connectedHandler);
      peer.off("disconnected", disconnectedHandler);
    };
  }, [disconnect, peer]);

  // initialize peer
  useEffect(() => {
    if (peer) {
      return;
    }

    const sessionPeerId = sessionStorage.getItem("peerId");
    setPeer(sessionPeerId ? new Peer(sessionPeerId) : new Peer());

    return () => {
      disconnect();
    };
  }, [disconnect, peer]);

  return (
    <PeerContext.Provider
      value={{
        send,
        connect,
        disconnect,
        isConnected: connected,
        peerId,
        connections,
        useSubscription: dataEmitter.useSubscription,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};
