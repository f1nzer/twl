import { useMemo } from "react";
import { usePeer } from "./usePeer";
import { NetworkMessage } from "../models/networking";
import { DataConnection } from "peerjs";

interface UsePeerConnectionData {
  isConnected: boolean;
  lastMessage?: NetworkMessage;
  connection?: DataConnection;
}

export const usePeerConnection = (connectionLabel: string): UsePeerConnectionData => {
  const { isConnected, lastMessages, connections } = usePeer();

  const isConnectionEstablished = useMemo(() => {
    return !!isConnected.get(connectionLabel);
  }, [isConnected]);

  const lastMessage = useMemo(() => {
    return lastMessages.get(connectionLabel);
  }, [lastMessages]);

  const connection = useMemo(() => {
    return connections.get(connectionLabel);
  }, [connections]);

  return {
    isConnected: isConnectionEstablished,
    lastMessage,
    connection
  };
};