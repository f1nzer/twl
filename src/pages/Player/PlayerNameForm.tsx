import { Button, TextField } from "@mui/material";
import { useState } from "react";

interface PlayerNameFormProps {
  onSubmit: (name: string) => void;
}

export const PlayerNameForm = ({ onSubmit }: PlayerNameFormProps) => {
  const [name, setName] = useState("");

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <TextField id="name" value={name} onChange={e => setName(e.target.value)} />
      <Button type="submit">Войти</Button>
    </form>
  );
}
