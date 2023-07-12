import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface TimerProps {
  seconds: number;
}

const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b;

export const Timer = ({ seconds }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);

  useEffect(() => {
    if (!timeLeft) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => Math.max(0, timeLeft - 0.1));
    }, 100);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const boxWidth = lerp(25, 100, timeLeft / seconds);
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography
        padding={4}
        borderRadius={40}
        width={`${boxWidth}%`}
        textAlign="center"
        bgcolor="red"
        color="white"
        variant="h3"
      >
        {Math.ceil(timeLeft)}
      </Typography>
    </Box>
  );
};
