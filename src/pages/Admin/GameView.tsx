import { Button } from "@mui/material";
import { usePeer } from "../../hooks/usePeer";
import { ADMIN_CONNECTION_LABEL } from "../../models/networking";
import { GameState, GameStatus } from "../../models/state";
import { QuestionStorage } from "../../services/question-storage";
import { RoundView } from "./RoundView";
import { useEffect, useState } from "react";

interface GameViewProps {
    state: GameState;
}

const defaultPiceValues: number[] = [1000, 2000, 3000, 4000, 5000, 10000];

export const GameView = ({ state }: GameViewProps) => {
    const { isConnected, send } = usePeer();
    const [gameState, setGameState] = useState<GameState>(state);

    useEffect(() => {
        console.log('rerender component');
        if (!isConnected) {
            return;
        }

        send(gameState, ADMIN_CONNECTION_LABEL);

        return () => { console.log("disposing...") }
    }, [gameState]);

    const onGameStartClick = () => {
        const activePlayersIndexes = [...Array(state.players.length).keys()];
        const newState = createNewRoundState(activePlayersIndexes);

        setGameState(newState);
    }

    const createNewRoundState = (activePlayerIndexes: number[]): GameState => {
        const newState: GameState = {
            ...gameState,
            status: GameStatus.ROUND,
            roundIndex: gameState.roundIndex + 1,
            round: {
                activePlayerIndex: 0, //TODO start from the MVP player
                activePlayersIndexes: activePlayerIndexes,
                activeQuestionText: QuestionStorage.getNext(),
                priceValues: defaultPiceValues,
                currentPriceIndex: 0,
                bankTotal: 0,
                startTimerDate: Date.now(),
                roundDuration: 10 + activePlayerIndexes.length * 1,
            }
        };

        return newState;
    }

    const onRoundStartClick = () => {

        //TODO filter by removed player
        const activePlayersIndexes = [...Array(state.players.length).keys()];
        const newState = createNewRoundState(activePlayersIndexes);

        setGameState(newState);
    }

    const onUpdateState = (state: GameState) => {
        if (state.round && gameState.status === GameStatus.ROUND && state.status === GameStatus.VOTE) {
            state.bankTotal += state.round.bankTotal;
        }

        setGameState(state);
    }

    if (gameState.status === GameStatus.LOBBY) {
        return (
            <Button
                size="large"
                variant="contained"
                color="success"
                onClick={() => onGameStartClick()}
            >
                НАЧАТЬ ИГРУ
            </Button>
        );
    }

    if (gameState.status === GameStatus.VOTE) {
        return (
            <Button
                size="large"
                variant="contained"
                color="success"
                onClick={() => onRoundStartClick()}
            >
                НАЧАТЬ РАУНД
            </Button>
        );
    }

    if (gameState.status == GameStatus.ROUND) {
        return <RoundView state={gameState} onUpdateState={onUpdateState} />;
    }

    return "UNKNOWN STATE";
};

