import waitingVideo from "/waiting.mp4";

export const PlayerWaitingView = () => {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={waitingVideo} type="video/mp4" />
      </video>
    </>
  );
};
