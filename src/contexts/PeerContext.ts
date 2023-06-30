import { createContext } from "react";
import Peer, { DataConnection } from "peerjs";
import { NetworkMessage } from "../models/networking";

export interface IPeerContext {
  send: (data: NetworkMessage, connectionLabel: string) => void;
  connect: (id: string, label?: string) => void;
  disconnect: () => void;

  peer?: Peer;
  peerId?: string;

  connections: Map<string, DataConnection>;
  isConnected: Map<string, boolean>;
  lastMessages: Map<string, NetworkMessage>;
}

export const PeerContext = createContext<IPeerContext | undefined>(undefined);
