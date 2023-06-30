import { useContext, useEffect, useMemo } from "react";
import { IPeerContext, PeerContext } from "../contexts/PeerContext";

export const usePeer = (): IPeerContext => {
  const context = useContext(PeerContext) as IPeerContext;

  const hasConnections = useMemo(() => {
    if (!context) {
      return false;
    }

    return context.connections.size > 0;
  }, [context.connections]);

  useEffect(() => {
    if (hasConnections) {
      return;
    }

    context.createPeer();

    return () => {
      context.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasConnections]);

  return context;
};
