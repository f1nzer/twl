import { Button, Grid, Stack } from "@mui/material";
import { GameState, GameStatus } from "../../models/state";
import { QuestionStorage } from "../../services/question-storage";
import { usePeer } from "../../hooks/usePeer";
import { ADMIN_CONNECTION_LABEL } from "../../models/networking";

interface ManageRoundViewProps {
  state: GameState;
}

const correctAnswer = (state: GameState) => {
  //TODO can be loaded from local storage
  const round = state.round;
  if (!round) {
    return;
  }

  state.status = GameStatus.ROUND;

  const lastPriceValueIndex = round.priceValues.length - 1;
  if (round.currentPriceIndex >= lastPriceValueIndex) {
    round.bankTotal += round.priceValues[lastPriceValueIndex];
    round.currentPriceIndex = 0;
  } else {
    round.currentPriceIndex += 1;
  }

  round.activePlayerIndex =
    (round.activePlayerIndex + 1) % round.activePlayersIndexes.length;
  round.activeQuestionText = QuestionStorage.getNext();
};

const incorrectAnswer = (state: GameState) => {
  const round = state.round;
  if (!round) {
    return;
  }

  state.status = GameStatus.ROUND;
  round.currentPriceIndex = 0;
  round.activePlayerIndex =
    (round.activePlayerIndex + 1) % round.activePlayersIndexes.length;
  round.activeQuestionText = QuestionStorage.getNext();
};

const saveBank = (state: GameState) => {
  const round = state.round;
  if (!round) {
    return;
  }

  state.status = GameStatus.ROUND;

  if (round.currentPriceIndex === 0) {
    return;
  }

  round.bankTotal += round.priceValues[round.currentPriceIndex - 1];
  round.currentPriceIndex = 0;
};

export const ManageRoundView = ({ state }: ManageRoundViewProps) => {
  const { send } = usePeer();

  const onCorrectAnswerClick = () => {
    correctAnswer(state);
    send(state, ADMIN_CONNECTION_LABEL);
  };

  const onIncorrectAnswerClick = () => {
    incorrectAnswer(state);
    send(state, ADMIN_CONNECTION_LABEL);
  };

  const onSaveBankClick = () => {
    saveBank(state);
    send(state, ADMIN_CONNECTION_LABEL);
  };

  return (
    <Grid container spacing={2} height="100vh">
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Stack direction="row" spacing={4}>
          <Button
            size="large"
            variant="contained"
            color="success"
            onClick={() => onCorrectAnswerClick()}
          >
            ПРАВИЛЬНО
          </Button>
          <Button
            size="large"
            variant="contained"
            color="error"
            onClick={() => onIncorrectAnswerClick()}
          >
            НЕПРАВИЛЬНО
          </Button>
          <Button
            size="large"
            variant="contained"
            onClick={() => onSaveBankClick()}
          >
            БАНК
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};
