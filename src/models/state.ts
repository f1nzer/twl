export interface GameState {
  status: GameStatus;
  players: Player[];
  bankTotal: number;

  round?: RoundState; // null only for LOBBY status
}

export enum GameStatus {
  LOBBY,
  ROUND,
  VOTE,
}

export interface Player {
  name: string;
  avatarUrl?: string;
}

export interface RoundState {
  priceValues: number[]; // [100,200,300,400,500]
  currentPriceIndex: number;

  // who plays the round
  activePlayersIndexes: number[]; // [0, 2, 4]

  roundDuration: number; // in seconds

  // who answers the question
  activePlayerIndex: number;

  bankTotal: number;

  activeQuestionText: string;
}
