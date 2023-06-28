import { Button, Grid, Stack } from "@mui/material";
import { GameState } from "../../models/state";
import { QuestionStorage } from "../../services/question-storage";
import { usePeer } from "../../hooks/usePeer";

interface ManageRoundViewProps {
  state: GameState;
}

const correctAnswer = (state: GameState) => {
  //TODO can be loaded from local storage
  if (!state.round) {
    return;
  }
  const round = state.round;

  if (round.currentPriceIndex >= round.priceValues.length - 1) {
    round.bankTotal += round.priceValues[round.currentPriceIndex];
    round.currentPriceIndex = 0;
  } else {
    round.currentPriceIndex = ++round.currentPriceIndex;
  }

  round.activePlayerIndex =
    (round.activePlayerIndex + 1) % round.activePlayersIndexes.length;
  round.activeQuestionText = QuestionStorage.getNext();
};

const incorrectAnswer = (state: GameState) => {
  if (!state.round) {
    return;
  }
  const round = state.round;
  round.currentPriceIndex = 0;
  round.activePlayerIndex =
    (round.activePlayerIndex + 1) % round.activePlayersIndexes.length;
  round.activeQuestionText = QuestionStorage.getNext();
};

const saveBank = (state: GameState) => {
  if (!state.round) {
    return;
  }
  const round = state.round;

  round.bankTotal += round.priceValues[round.currentPriceIndex];
  round.currentPriceIndex = 0;
};

export const ManageRoundView = ({ state }: ManageRoundViewProps) => {
  const { send } = usePeer();

  const onCorrectAnswerClick = () => {
    correctAnswer(state);
    send(state);
  }

  const onIncorrectAnswerClick = () => {
    incorrectAnswer(state);
    send(state);
  }

  const onSaveBankClick = () => {
    saveBank(state);
    send(state);
  }

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
