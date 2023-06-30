import { useCallback, useMemo } from "react";
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

export const usePeerConnection = (connectionLabel: string): UsePeerConnectionData => {
  const { isConnected, lastMessages, connections, connect, send, peerId } = usePeerContext();

  const isConnectionEstablished = useMemo(() => {
    return !!isConnected.get(connectionLabel);
  }, [connectionLabel, isConnected]);

  const lastMessage = useMemo(() => {
    return lastMessages.get(connectionLabel);
  }, [connectionLabel, lastMessages]);

  const connection = useMemo(() => {
    return connections.get(connectionLabel);
  }, [connectionLabel, connections]);

  const connectFunc = useCallback((peerId: string) => {
    return connect(peerId, connectionLabel);
  }, [connectionLabel, connect]);

  const sendFunc = useCallback((message: NetworkMessage) => {
    return send(message, connectionLabel);
  }, [connectionLabel, send]);

  return {
    isConnected: isConnectionEstablished,
    lastMessage,
    connection,
    peerId,
    connect: connectFunc,
    send: sendFunc,
  };
};