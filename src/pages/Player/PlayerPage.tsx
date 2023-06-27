import { useSearchParams } from "react-router-dom";

interface PlayerControlsProps {
  gameId: string;
}

const PlayerControl = ({ gameId }: PlayerControlsProps) => {
  return `test: ${gameId}`;
};

export const PlayerPage = () => {
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("gameId");

  if (!gameId) {
    return <>test</>;
  }

  return <PlayerControl gameId={gameId} />;
};
