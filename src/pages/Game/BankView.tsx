import { Box, Stack } from "@mui/material";
import { GameState } from "../../models/state";
import { BankItemView } from "./BankItemView";

interface BankViewProps {
  state: GameState;
}

export const BankView = ({ state }: BankViewProps) => {
  const round = state.round;
  if (!round) {
    return;
  }

  const priceValues = [...round.priceValues].reverse();

  return (
    <>
      <Stack spacing={6} direction="column" alignItems="center" justifyContent="center">
        <Stack spacing={2}>
          {priceValues.map((value, index) => (
            <BankItemView
              key={`${value}_${index}`}
              value={value}
              isActive={
                round.currentPriceIndex == priceValues.length - 1 - index
              }
            />
          ))}
        </Stack>
        <Box>
          <BankItemView isSummary value={`БАНК: ${round.bankTotal}`} />
        </Box>
      </Stack>
    </>
  );
};
