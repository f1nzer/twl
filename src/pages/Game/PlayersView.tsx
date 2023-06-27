import { AvatarGenerator } from "random-avatar-generator";
import { Player } from "../../models/state";
import { Avatar, Box, Stack, Typography } from "@mui/material";

const generator = new AvatarGenerator();

interface PlayerViewProps {
  player: Player;
  isActive: boolean;
}

export const PlayerView = ({ player, isActive }: PlayerViewProps) => {
  return (
    <Box
      sx={{
        bgcolor: isActive ? "green" : "transparent",
      }}
    >
      <Avatar
        variant="rounded"
        sx={{ width: 150, height: 150, paddingBottom: 1 }}
        src={generator.generateRandomAvatar(player.name)}
      />
      <Typography style={{ textAlign: "center" }}>{player.name}</Typography>
    </Box>
  );
};

interface PlayersViewProps {
  players: Player[];
  activePlayerIndex?: number;
}

export const PlayersView = ({
  players,
  activePlayerIndex,
}: PlayersViewProps) => {
  return (
    <Box>
      <Stack spacing={2} direction={"row"}>
        {players.map((player, index) => (
          <PlayerView
            key={`player_${index}`}
            player={player}
            isActive={index === activePlayerIndex}
          />
        ))}
      </Stack>
    </Box>
  );
};
