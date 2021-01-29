import Vial from './Vial';
import { GameState } from './types';
import { maxVialSize } from './consts';
import './VialDisplay.css';

type Props = {
  gameState: GameState;
  selectedVial?: number;
  onVialClick: (vialIndex: number) => void;
};

const VialDisplay = ({ gameState, selectedVial, onVialClick }: Props) => {
  const indexedState = gameState.map((vial, index) => ({
    index,
    vial,
  }));
  let rows;
  if (indexedState.length <= 5) {
    rows = [indexedState];
  } else {
    rows = [
      indexedState.slice(0, Math.ceil(indexedState.length / 2)),
      indexedState.slice(Math.ceil(indexedState.length / 2), indexedState.length),
    ];
  }

  return (
    <div className="vial-display">
      {rows.map((row, rowIndex) => (
        <div className="vial-display--row" key={rowIndex}>
          {row.map(({ vial, index }) => (
            <Vial
              key={index}
              vialState={vial}
              onClick={() => onVialClick(index)}
              selected={selectedVial === index}
              size={maxVialSize}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default VialDisplay;
