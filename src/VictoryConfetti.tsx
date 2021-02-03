import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const VictoryConfetti = () => {
  const { width, height } = useWindowSize();
  return <ReactConfetti width={width} height={height} />;
};

export default VictoryConfetti;
