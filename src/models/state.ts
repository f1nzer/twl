export interface GameState {
  status: GameStatus;
  players: Player[];
  bankTotal: number;

  round?: RoundState; // null only for LOBBY status
  roundIndex: number;
}

export enum GameStatus {
  LOBBY = 'LOBBY',
  ROUND = 'ROUND',
  VOTE = 'VOTE',
}

export interface Player {
  name: string;
  connectionLabel: string;

  statistics?: PlayerRoundStatistics[];
}

export interface PlayerRoundStatistics {
  roundIndex: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestionValuePrice: number;
}

export interface RoundState {
  priceValues: number[]; // [100,200,300,400,500]
  currentPriceIndex: number;

  // who plays the round
  activePlayersIndexes: number[]; // [0, 2, 4]

  startTimerDate: number;

  roundDuration: number; // in seconds

  // who answers the question
  activePlayerIndex: number;

  bankTotal: number;

  activeQuestionText: string;
}
