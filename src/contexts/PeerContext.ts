import { createContext } from "react";
import { DataConnection } from "peerjs";
import { NetworkMessage, ReceivedNetworkMessage } from "../models/networking";

type Subscription<T> = (val: T) => void;

export interface IPeerContext {
  send: (data: NetworkMessage, connectionLabel: string) => void;
  connect: (id: string, label?: string) => void;
  disconnect: () => void;

  peerId?: string;

  connections: Map<string, DataConnection>;
  isConnected: Map<string, boolean>;
  useSubscription: (callback: Subscription<ReceivedNetworkMessage>) => void;
}

export const PeerContext = createContext<IPeerContext | undefined>(undefined);
