import { GameState } from "./state";

export const ADMIN_CONNECTION_LABEL = "admin";

export enum NetworkMessageType {
  GAME_STATE = "GAME_STATE",
  PLAYER_MESSAGE = "PLAYER_MESSAGE",
}

export interface ReceivedNetworkMessage {
  connectionLabel: string;
  message: NetworkMessage;
}

export interface NetworkMessage {
  type: NetworkMessageType;
  data: GameState | PlayerMessage;
}

export interface PlayerMessage {
  name?: string;
  votePlayerLabel?: string;
}

