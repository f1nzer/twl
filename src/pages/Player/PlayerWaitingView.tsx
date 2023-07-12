import { Box } from "@mui/material";
import waitingVideo from "/waiting.mp4";

export const PlayerWaitingView = () => {
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "100%",
          objectFit: "cover",
        }}
      >
        <source src={waitingVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};
