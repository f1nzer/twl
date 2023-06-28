import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface TimerProps {
  seconds: number;
}

export const Timer = ({ seconds }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);

  useEffect(() => {
    if (!timeLeft) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography
        padding={4}
        borderRadius={40}
        textAlign="center"
        bgcolor="red"
        color="white"
        variant="h3"
      >
        {timeLeft}
      </Typography>
    </Box>
  );
};
