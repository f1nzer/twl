import { createContext } from "react";
import { GameState } from "../models/state";

export interface IPeerContext {
  createPeer: (id?: string) => void;
  send: (data: GameState) => void;
  connect: (id: string) => void;
  disconnect: () => void;

  isConnected: boolean;
  peerId?: string;
  lastData?: GameState;
}

export const PeerContext = createContext<IPeerContext | undefined>(undefined);
