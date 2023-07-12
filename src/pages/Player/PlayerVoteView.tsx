import { useState } from "react";
import { Player } from "../../models/state";
import { PlayersView } from "../Game/PlayersView";
import { Alert, Box, Button, Snackbar, Stack } from "@mui/material";

interface PlayerViewProps {
  players: Player[];
  onVote: (player: Player) => void;
}

export const PlayerVoteView = ({ players, onVote }: PlayerViewProps) => {
  const [playerToRemove, setPlayerToRemove] = useState<Player>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const onVoteClick = () => {
    //TODO get selected player to remove
    if (playerToRemove) {
      onVote(playerToRemove);
      setSnackbarOpen(true);
      setPlayerToRemove(undefined);
    }
  };

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Stack direction="column" spacing={2}>
      <PlayersView
        players={players}
        selectedPlayer={playerToRemove}
        onClick={(player) =>
          setPlayerToRemove((prevPlayer) =>
            prevPlayer?.connectionLabel !== player.connectionLabel
              ? player
              : undefined
          )
        }
      />
      <Box textAlign={"center"}>
        <Button
          sx={{ marginBottom: 4 }}
          disabled={!playerToRemove}
          size="large"
          variant="contained"
          onClick={() => onVoteClick()}
        >
          ПРОГОЛОСОВАТЬ
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
        >
          Голос отправлен!
        </Alert>
      </Snackbar>
    </Stack>
  );
};
