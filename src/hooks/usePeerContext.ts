import { useContext } from "react";
import { IPeerContext, PeerContext } from "../contexts/PeerContext";

export const usePeerContext = (): IPeerContext => {
  return useContext(PeerContext) as IPeerContext;
};
