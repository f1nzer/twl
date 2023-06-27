import Peer from "peerjs";
import { GameState } from "../models/state";

interface InitParams {
  onIdReceived: (id: string) => void;
  onInConnection?: () => void;
}

interface ConnectParams {
  peerId: string;
  onOutConnection: () => void;
}

let peer: Peer;
let onDataReceivedFunc: (data: GameState) => void;
let conn: any;

export const PeerState = {
  init: (params: InitParams) => {
    if (peer) {
      return;
    }

    const peerIdToUse = window.localStorage.getItem("peerId");
    peer = peerIdToUse ? new Peer(peerIdToUse) : new Peer();
    peer.on("open", (peerId) => {
      window.localStorage.setItem("peerId", peerId);
      params.onIdReceived(peerId);
    });
    peer.on("error", (error) => {
      console.error(error);
    });
    // on incoming connection only
    peer.on("connection", (conn) => {
      conn.on("open", () => {
        params.onInConnection && params.onInConnection();
      });
      conn.on("data", (data) => {
        if (onDataReceivedFunc) {
          onDataReceivedFunc(data as GameState);
        }
      });
    });

    peer.on("disconnected", () => {
      peer.reconnect();
    });
  },

  onData: (onDataReceived: (data: GameState) => void) => {
    onDataReceivedFunc = onDataReceived;
  },

  connect: (params: ConnectParams) => {
    conn = peer.connect(params.peerId);
    conn.on("open", params.onOutConnection);
    conn.on("error", (error: any) => {
      console.error(error);
    });
  },

  send: (data: GameState) => {
    conn.send(data);
  },
};
