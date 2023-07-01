export const PlayerWaitingView = () => {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/waiting.mp4" type="video/mp4" />
      </video>
    </>
  );
};
