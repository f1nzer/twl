import { useContext, useEffect } from "react";
import { IPeerContext, PeerContext } from "../contexts/PeerContext";

export const usePeer = (): IPeerContext => {
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

  return context;
};
