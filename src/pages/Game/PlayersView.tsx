import { AvatarGenerator } from "random-avatar-generator";
import { Player } from "../../models/state";
import { Avatar, Box, Stack, Typography } from "@mui/material";

const generator = new AvatarGenerator();

interface PlayerViewProps {
  player: Player;
}

export const PlayerView = ({ player }: PlayerViewProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Stack>
        <Avatar
          variant="rounded"
          sx={{ width: 150, height: 150, paddingBottom: 1 }}
          src={generator.generateRandomAvatar(player.name)}
        />
        <Typography style={{ textAlign: "center" }}>{player.name}</Typography>
      </Stack>
    </Box>
  );
};

interface PlayersViewProps {
  players: Player[];
}

export const PlayersView = ({ players }: PlayersViewProps) => {
  return (
    <Box>
      <Stack spacing={2} direction={"row"}>
        {players.map((player, index) => (
          <PlayerView key={`player_${index}`} player={player} />
        ))}
      </Stack>
    </Box>
  );
};
