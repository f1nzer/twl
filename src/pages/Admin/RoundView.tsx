import { Button, Stack, Typography } from "@mui/material";
import { GameState } from "../../models/state";
import { PlayerView } from "../Game/PlayersView";
import { Timer } from "../Game/Timer";
import { RoundService } from "../../services/RoundService";

interface RoundViewProps {
  state: GameState;
  onUpdateState: (state: GameState) => void;
}

export const RoundView = ({ state, onUpdateState }: RoundViewProps) => {
  const round = state.round;
  if (!round) {
    return;
  }

  const onCorrectAnswerClick = () => {
    const newState = RoundService.applyCorrectAnswer(state);
    onUpdateState(newState);
  };

  const onIncorrectAnswerClick = () => {
    const newState = RoundService.applyIncorrectAnswer(state);
    onUpdateState(newState);
  };

  const onSaveBankClick = () => {
    const newState = RoundService.saveBank(state);
    onUpdateState(newState);
  };

  const filteredPlayers = state.players.filter((_, index) => {
    return state.round?.activePlayersIndexes.includes(index) ?? true;
  });

  return (
    <Stack direction="column" spacing={4}>
      <Timer seconds={round.roundDuration} />
      <PlayerView player={filteredPlayers[round.activePlayerIndex]} />

      <Typography variant="h3" textAlign="center">
        {round.activeQuestionText}
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
