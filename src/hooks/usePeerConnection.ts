import { useCallback, useMemo, useState } from "react";
import { usePeerContext } from "./usePeerContext";
import { NetworkMessage } from "../models/networking";
import { DataConnection } from "peerjs";

interface UsePeerConnectionData {
  isConnected: boolean;
  lastMessage?: NetworkMessage;
  connection?: DataConnection;
  peerId?: string;
  connect: (peerId: string) => void;
  send: (message: NetworkMessage) => void;
}

export const usePeerConnection = (
  connectionLabel: string
): UsePeerConnectionData => {
  const [lastMessage, setLastMessage] = useState<NetworkMessage>();
  const { isConnected, connections, connect, send, peerId, useSubscription } =
    usePeerContext();

  useSubscription((data) => {
    if (data.connectionLabel === connectionLabel) {
      setLastMessage(data.message);
    }
  });

  const isConnectionEstablished = useMemo(() => {
    return !!isConnected.get(connectionLabel);
  }, [connectionLabel, isConnected]);

  const connection = useMemo(() => {
    return connections.get(connectionLabel);
  }, [connectionLabel, connections]);

  const connectFunc = useCallback(
    (peerId: string) => {
      return connect(peerId, connectionLabel);
    },
    [connectionLabel, connect]
  );

  const sendFunc = useCallback(
    (message: NetworkMessage) => {
      return send(message, connectionLabel);
    },
    [connectionLabel, send]
  );

  return {
    isConnected: isConnectionEstablished,
    lastMessage,
    connection,
    peerId,
    connect: connectFunc,
    send: sendFunc,
  };
};
