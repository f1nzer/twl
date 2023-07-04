import { Button, Grid, Stack } from "@mui/material";
import { usePeerContext } from "../../hooks/usePeerContext";
import {
  ADMIN_CONNECTION_LABEL,
  NetworkMessageType,
} from "../../models/networking";
import { GameState, GameStatus, Player } from "../../models/state";
import { RoundView } from "./RoundView";
import { useEffect, useMemo, useState } from "react";
import { RoundService } from "../../services/RoundService";
import { usePlayers } from "./hooks/usePlayers";
import { PlayersView } from "../Game/PlayersView";
import { usePeerConnection } from "../../hooks/usePeerConnection";
import { VoteView } from "./VoteView";
import { LoadQuestionView } from "./LoadQuestionView";
import { PlayerService } from "../../services/PlayerService";

export const GameView = () => {
  const { connections, send: sendTo } = usePeerContext();
  const { isConnected, send } = usePeerConnection(ADMIN_CONNECTION_LABEL);
  const players = usePlayers();
  const [gameState, setGameState] = useState<GameState>({
    bankTotal: 0,
    players: [],
    status: GameStatus.LOBBY,
    roundIndex: 0,
  });

  const activeGameStatus = useMemo(() => {
    return gameState.status;
  }, [gameState]);

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    connections.forEach((connection) => {
      sendTo(
        {
          type: NetworkMessageType.GAME_STATE,
          data: gameState,
        },
        connection.label
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGameStatus, connections, isConnected, sendTo]);

  useEffect(() => {
    if (!isConnected) {
      return;
    }

    send({
      type: NetworkMessageType.GAME_STATE,
      data: gameState,
    });
  }, [gameState, isConnected, send]);

  useEffect(() => {
    setGameState((gameState) => {
      return { ...gameState, players: players };
    });
  }, [players]);

  const onGameStartClick = () => {
    const activePlayersIndexes = [...Array(gameState.players.length).keys()];
    const newState = RoundService.createNewRoundState(
      gameState,
      activePlayersIndexes
    );

    setGameState(newState);
  };

  const onRoundStartClick = (playerToRemove: Player | undefined) => {
    if (!playerToRemove) {
      return;
    }
    const playerToRemoveIndex = gameState.players.indexOf(playerToRemove);
    const activePlayersIndexes = PlayerService.getActivePlayers(gameState)
      .map((_player, index) => index)
      .filter(x => x !== playerToRemoveIndex);

    const newState = RoundService.createNewRoundState(
      gameState,
      activePlayersIndexes
    );

    setGameState(newState);
  };

  const onUpdateState = (state: GameState) => {
    if (
      state.round &&
      gameState.status === GameStatus.ROUND &&
      state.status === GameStatus.VOTE
    ) {
      state.bankTotal += state.round.bankTotal;
    }

    setGameState(state);
  };

  const isReadyToStartGame = () => {
    return gameState.players.length <= 1;
  }

  if (gameState.status === GameStatus.LOBBY) {
    return (
      <>
        <Grid>
          <PlayersView players={gameState.players} />
          <Stack direction="row" spacing={2}>
            <Button
              size="large"
              variant="contained"
              color="success"
              disabled={isReadyToStartGame()}
              onClick={() => onGameStartClick()}
            >
              НАЧАТЬ ИГРУ
            </Button>
            <LoadQuestionView />
          </Stack>
        </Grid>
      </>
    );
  }

  if (gameState.status === GameStatus.VOTE) {
    return <VoteView state={gameState} onRoundStartClick={onRoundStartClick} />;
  }

  if (gameState.status == GameStatus.ROUND) {
    return <RoundView state={gameState} onUpdateState={onUpdateState} />;
  }

  return "UNKNOWN STATE";
};
