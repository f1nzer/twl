import { Button, Grid, Stack } from "@mui/material";
import { GameState } from "../../models/state";
import { QuestionStorage } from "../../services/question-storage";
import { PeerState } from "../../services/peer-service";
interface ManageRoundViewProps {
  state: GameState;
}

const correctAnswer = (state: GameState) => {
    //TODO can be loaded from local storage
    if(!state.round) {
        return;
    }
    const round = state.round;

    if(round.currentPriceIndex >= (round.priceValues.length - 1)) {
        round.bankTotal += round.priceValues[round.currentPriceIndex];
        round.currentPriceIndex = 0;
    } else {
        round.currentPriceIndex = ++round.currentPriceIndex;
    }

    round.activePlayerIndex = (round.activePlayerIndex + 1) % round.activePlayersIndexes.length;
    round.activeQuestionText = QuestionStorage.getNext();
    
    PeerState.send(state);
};

const wrongAnswer = (state: GameState) => {
    if(!state.round) {
        return;
    }
    const round = state.round;
    round.currentPriceIndex = 0;
    round.activePlayerIndex = (round.activePlayerIndex + 1) % round.activePlayersIndexes.length;
    round.activeQuestionText = QuestionStorage.getNext();

    PeerState.send(state);
}

const saveBank = (state: GameState) => {

    if(!state.round) {
        return;
    }
    const round = state.round;
    
    round.bankTotal += round.priceValues[round.currentPriceIndex];
    round.currentPriceIndex = 0;

    PeerState.send(state);
}

export const ManageRoundView = ({ state }: ManageRoundViewProps) => {
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
                <Button size="large" variant="contained" color="success" onClick={() => correctAnswer(state)}>ПРАВИЛЬНО</Button>
                <Button size="large" variant="contained" color="error" onClick={() => wrongAnswer(state)}>НЕПРАВИЛЬНО</Button>
                <Button size="large" variant="contained" onClick={() => saveBank(state)}>БАНК</Button>
            </Stack>
        </Grid>
  </Grid>
  );
};
