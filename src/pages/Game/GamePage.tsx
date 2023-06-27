import { useEffect, useState } from "react";
import { PeerState } from "../../services/peer-service";
import { GameState, GameStatus, Player } from "../../models/state";
import { Avatar } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { AvatarGenerator } from "random-avatar-generator";

interface LobbyViewProps {
  state: GameState;
}

interface PlayerViewProps {
  players: Player[]
}

export const LobbyView = ({ state }: LobbyViewProps) => {
  return <PlayersView players={state.players}/>;
};

export const PlayersView = ({players}: PlayerViewProps) => {
  const generator = new AvatarGenerator();
  return (
    <Grid 
    container 
    spacing={3} 
    alignItems="center"
    justifyContent="center">
      {players.map((player, index) => {
        return ( 
          <Grid key={"player_" + index} justifyContent="center" alignItems="center" >
            <Avatar variant="rounded" sx={{ width: 150, height: 150, paddingBottom: 1 }} src={player.avatarUrl ?? generator.generateRandomAvatar(player.name) as string}/>
            <div style={{ textAlign: "center"}}>{player.name}</div>
        </Grid>
        )
      })}
    </Grid>
  )
}

export const GamePage = () => {
  const [gameState, setGameState] = useState<GameState>({
    bankTotal: 0,
    status: GameStatus.LOBBY,
    players: [],
  });

  useEffect(() => {
    PeerState.onData((data) => {
      setGameState(data);
      console.log(data);
    });
  }, []);

  // TODO: display UI for the LOBBY status (with players list)
  // TODO: display UI for the ROUND status (with question, total/current bank, players and timer)
  // TODO: display UI for the VOTE status (players and bank)

  if (gameState.status === GameStatus.LOBBY) {
    return <LobbyView state={gameState} />;
  }

  return <>game page</>;
};
