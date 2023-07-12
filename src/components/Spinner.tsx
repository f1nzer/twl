import { Box, CircularProgress } from "@mui/material";

interface IProps {
  size?: number;
}

const Spinner = ({ size = 312 }: IProps) => (
  <Box
    sx={{
      display: "flex",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CircularProgress size={size} />
  </Box>
);

export default Spinner;
