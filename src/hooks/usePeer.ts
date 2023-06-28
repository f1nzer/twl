import { useContext, useEffect } from "react";
import { IPeerContext, PeerContext } from "../contexts/PeerContext";
import { GameState } from "../models/state";

interface IUsePeer {
  send: (data: GameState) => void;
  connect: (id: string) => void;
  isConnected: boolean;
  peerId?: string;
  lastData?: GameState;
}

export const usePeer = (): IUsePeer => {
  const context = useContext(PeerContext) as IPeerContext;

  useEffect(() => {
    if (!context) {
      return;
    }

    if (context.isConnected) {
      return;
    }

    context.createPeer();

    return () => {
      context.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.isConnected]);

  return {
    send: context.send,
    connect: context.connect,
    isConnected: context.isConnected,
    peerId: context.peerId,
    lastData: context.lastData,
  };
};
