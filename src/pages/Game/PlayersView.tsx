import { AvatarGenerator } from "random-avatar-generator";
import { Player } from "../../models/state";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

const generator = new AvatarGenerator();

interface PlayerViewProps {
  player: Player;
  selected?: boolean;
  onClick?: () => void;
}

const withOnClick = (
  Component: React.FC<PlayerViewProps>,
  onClick?: () => void
) => {
  return (props: PlayerViewProps) => {
    if (onClick) {
      return (
        <CardActionArea onClick={onClick}>
          <Component {...props} />
        </CardActionArea>
      );
    }

    return <Component {...props} />;
  };
};

const PlayerViewContentRaw = ({ player }: PlayerViewProps) => {
  return (
    <>
      <CardMedia
        component="img"
        height={150}
        width={150}
        image={generator.generateRandomAvatar(player.name)}
        style={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          {player.name}
        </Typography>
      </CardContent>
    </>
  );
};

const PlayerViewContent = (props: PlayerViewProps) => {
  const { onClick } = props;
  if (!onClick) {
    return <PlayerViewContentRaw {...props} />;
  }

  return withOnClick(PlayerViewContentRaw, onClick)(props);
};

export const PlayerView = (props: PlayerViewProps) => {
  return (
    <Card
      sx={{
        border: props.selected ? "2px solid blue" : null,
      }}
      elevation={props.selected ? 5 : 1}
    >
      <PlayerViewContent {...props} />
    </Card>
  );
};

interface PlayersViewProps {
  players: Player[];
  selectedPlayer?: Player;
  onClick?: (player: Player) => void;
}

export const PlayersView = ({
  players,
  selectedPlayer,
  onClick,
}: PlayersViewProps) => {
  return (
    <Box>
      <Stack
        justifyContent="center"
        margin={2}
        spacing={4}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {players.length ? (
          players.map((player, index) => {
            const onClickHandler = onClick ? () => onClick(player) : undefined;
            return (
              <PlayerView
                key={`player_${index}`}
                player={player}
                selected={
                  player.connectionLabel === selectedPlayer?.connectionLabel
                }
                onClick={onClickHandler}
              />
            );
          })
        ) : (
          <span style={{ fontSize: "56px", fontWeight: "bold" }}>
            Пока нет ни одного еблана
          </span>
        )}
      </Stack>
    </Box>
  );
};
