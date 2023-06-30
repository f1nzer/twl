import { createContext } from "react";
import { DataConnection } from "peerjs";
import { NetworkMessage } from "../models/networking";

export interface IPeerContext {
  createPeer: (id?: string) => void;
  send: (data: NetworkMessage, connectionLabel: string) => void;
  connect: (id: string, label?: string) => void;
  disconnect: () => void;

  peerId?: string;

  connections: Map<string, DataConnection>;
  isConnected: Map<string, boolean>;
  lastMessages: Map<string, NetworkMessage>;
}

export const PeerContext = createContext<IPeerContext | undefined>(undefined);
