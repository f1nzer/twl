import { Box, Button, Stack, TextField } from "@mui/material";
import { useRef } from "react";

interface PlayerNameFormProps {
  onSubmit: (name: string) => void;
}

export const PlayerNameForm = ({ onSubmit }: PlayerNameFormProps) => {
  const nameInput = useRef<HTMLInputElement>(null);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameInput.current?.value;
    if (name) {
      onSubmit(name);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <form onSubmit={onFormSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField id="name" autoFocus label="Имя" inputRef={nameInput} />
          <Button type="submit" variant="contained">
            Войти
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
