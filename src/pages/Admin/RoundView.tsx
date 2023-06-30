import { Button, Stack, Typography } from "@mui/material";
import { GameState, GameStatus, RoundState } from "../../models/state";
import { QuestionStorage } from "../../services/question-storage";
import { PlayerView } from "../Game/PlayersView";
import { Timer } from "../Game/Timer";

interface RoundViewProps {
  state: GameState;
  onUpdateState: (state: GameState) => void;
}

const applyCorrectAnswer = (state: GameState) => {
  //TODO can be loaded from local storage
  const newState: GameState = { ...state };
  const round = newState.round;
  if (!round) {
    return newState;
  }

  const maxBankValue = round.priceValues[round.priceValues.length - 1];
  const nextPotentialBankValue = round.bankTotal + round.priceValues[round.currentPriceIndex];
  const isBankLimitReached = nextPotentialBankValue >= maxBankValue;

  const maxPriceValueIndex = round.priceValues.length - 1;
  const isPriceIndexEndReached = round.currentPriceIndex >= maxPriceValueIndex;

  if (isBankLimitReached || isPriceIndexEndReached) {
    newState.status = GameStatus.VOTE;
    round.bankTotal = maxBankValue;
    return newState;
  }

  newState.status = getNewStatus(newState.round!);

  round.currentPriceIndex += 1;
  round.activePlayerIndex =
    (round.activePlayerIndex + 1) % round.activePlayersIndexes.length;
  round.activeQuestionText = QuestionStorage.getNext();
  return newState;
};

const applyIncorrectAnswer = (state: GameState) => {
  const newState: GameState = { ...state };
  const round = newState.round;
  if (!round) {
    return newState;
  }

  newState.status = getNewStatus(newState.round!);
  round.currentPriceIndex = 0;
  round.activePlayerIndex =
    (round.activePlayerIndex + 1) % round.activePlayersIndexes.length;
  round.activeQuestionText = QuestionStorage.getNext();
  return newState;
};

const saveBank = (state: GameState) => {
  const newState: GameState = { ...state };
  const round = newState.round;
  if (!round) {
    return newState;
  }

  newState.status = getNewStatus(newState.round!);
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
};

const getNewStatus = (round: RoundState): GameStatus => {
  return isRoundExpired(round) ? GameStatus.VOTE : GameStatus.ROUND;
}

const isRoundExpired = (round: RoundState) => {
  const nowDate = new Date();
  const startTimerDate = new Date(round.startTimerDate);

  return (nowDate.getTime() - startTimerDate.getTime()) / 1000 > round.roundDuration;
};

export const RoundView = ({ state, onUpdateState }: RoundViewProps) => {

  const onCorrectAnswerClick = () => {
    var newState = applyCorrectAnswer(state);
    onUpdateState(newState);
  };

  const onIncorrectAnswerClick = () => {
    const newState = applyIncorrectAnswer(state);
    onUpdateState(newState);
  };

  const onSaveBankClick = () => {
    const newState = saveBank(state);
    onUpdateState(newState);
  };

  const filteredPlayers = state.players.filter((_, index) => {
    return state.round?.activePlayersIndexes.includes(index) ?? true;
  });

  return (
    <Stack direction="column" spacing={4}>
      <PlayerView player={filteredPlayers[state.round!.activePlayerIndex]} />

      <Typography variant="h3" textAlign="center">
        {state.round!.activeQuestionText}
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="success"
          onClick={() => onCorrectAnswerClick()}
        >
          ПРАВИЛЬНО
        </Button>
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="error"
          onClick={() => onIncorrectAnswerClick()}
        >
          НЕПРАВИЛЬНО
        </Button>
      </Stack>

      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={() => onSaveBankClick()}
      >
        БАНК
      </Button>
    </Stack>
  );
};
