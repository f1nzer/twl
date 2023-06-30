import { Box, Button, Grid } from "@mui/material";
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
import { usePeerConnection } from "../../hooks/usePeer";

export const GameView = () => {
  const { connections, send: sendTo } = usePeerContext();
  const { isConnected, send } = usePeerConnection(ADMIN_CONNECTION_LABEL);
  const { players } = usePlayers();
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
  }, [activeGameStatus]);

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

  const onRoundStartClick = () => {
    //TODO filter by removed player
    const activePlayersIndexes = [...Array(gameState.players.length).keys()];
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

  const activePlayers: Player[] = gameState.players.filter((_player, index) =>
    gameState.round?.activePlayersIndexes.includes(index)
  );

  if (gameState.status === GameStatus.LOBBY) {
    return (
      <>
        <Grid>
          <PlayersView players={gameState.players} />
          <Box textAlign={"center"}>
            <Button
              size="large"
              variant="contained"
              color="success"
              disabled={gameState.players.length <= 1}
              onClick={() => onGameStartClick()}
            >
              НАЧАТЬ ИГРУ
            </Button>
          </Box>
        </Grid>
      </>
    );
  }

  if (gameState.status === GameStatus.VOTE) {
    return (
      <>
        <Grid>
          <PlayersView players={activePlayers} />
          <Box textAlign={"center"}>
            <Button
              sx={{ width: 200 }}
              size="large"
              variant="contained"
              color="success"
              onClick={() => onRoundStartClick()}
            >
              НАЧАТЬ РАУНД
            </Button>
          </Box>
        </Grid>
      </>
    );
  }

  if (gameState.status == GameStatus.ROUND) {
    return <RoundView state={gameState} onUpdateState={onUpdateState} />;
  }

  return "UNKNOWN STATE";
};
