import { GameState, GameStatus, RoundState } from "../models/state";
import { QuestionStorage } from "./QuestionStorage";

const defaultPiceValues: number[] = [1000, 2000, 3000, 4000, 5000, 10000];

export const RoundService = {
  createNewRoundState: (
    state: GameState,
    activePlayersIndexes: number[]
  ): GameState => {
    const newState: GameState = {
      ...state,
      status: GameStatus.ROUND,
      roundIndex: state.roundIndex + 1,
      round: {
        activePlayerIndex: 0, //TODO start from the MVP player
        activePlayersIndexes,
        activeQuestionText: QuestionStorage.getNext().text,
        priceValues: defaultPiceValues,
        currentPriceIndex: 0,
        bankTotal: 0,
        startTimerDate: Date.now(),
        roundDuration: 10 + activePlayersIndexes.length * 1,
      },
    };

    return newState;
  },

  saveBank: (state: GameState) => {
    const newState: GameState = { ...state };
    const round = newState.round;
    if (!round) {
      return newState;
    }

    newState.status = getNewStatus(round);
    if (round.currentPriceIndex === 0) {
      return newState;
    }

    round.bankTotal += round.priceValues[round.currentPriceIndex - 1];

    const maxBankValue = round.priceValues[round.priceValues.length - 1];
    if (round.bankTotal >= maxBankValue) {
      newState.status = GameStatus.VOTE;
      round.bankTotal = maxBankValue;
    }

    round.currentPriceIndex = 0;
    return newState;
  },

  applyIncorrectAnswer: (state: GameState) => {
    const newState: GameState = { ...state };
    const round = newState.round;
    if (!round) {
      return newState;
    }

    newState.status = getNewStatus(round);
    round.currentPriceIndex = 0;
    round.activePlayerIndex =
      (round.activePlayerIndex + 1) % round.activePlayersIndexes.length;
    round.activeQuestionText = QuestionStorage.getNext().text;
    return newState;
  },

  applyCorrectAnswer: (state: GameState) => {
    //TODO can be loaded from local storage
    const newState: GameState = { ...state };
    const round = newState.round;
    if (!round) {
      return newState;
    }

    const maxBankValue = round.priceValues[round.priceValues.length - 1];
    const nextPotentialBankValue =
      round.bankTotal + round.priceValues[round.currentPriceIndex];
    const isBankLimitReached = nextPotentialBankValue >= maxBankValue;

    const maxPriceValueIndex = round.priceValues.length - 1;
    const isPriceIndexEndReached =
      round.currentPriceIndex >= maxPriceValueIndex;

    if (isBankLimitReached || isPriceIndexEndReached) {
      newState.status = GameStatus.VOTE;
      round.bankTotal = maxBankValue;
      return newState;
    }

    newState.status = getNewStatus(round);

    round.currentPriceIndex += 1;
    round.activePlayerIndex =
      (round.activePlayerIndex + 1) % round.activePlayersIndexes.length;
    round.activeQuestionText = QuestionStorage.getNext().text;
    return newState;
  },
};

const getNewStatus = (round: RoundState): GameStatus => {
  return isRoundExpired(round) ? GameStatus.VOTE : GameStatus.ROUND;
};

const isRoundExpired = (round: RoundState) => {
  const nowDate = new Date();
  const startTimerDate = new Date(round.startTimerDate);
  return (
    (nowDate.getTime() - startTimerDate.getTime()) / 1000 > round.roundDuration
  );
};
