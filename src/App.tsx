import { useState } from 'react';
import './App.css';
import { getRandomGamedata, pourLiquid } from './utils';
import VialDisplay from './VialDisplay';
import { colors, maxVialSize } from './consts';
import { GameState } from './types';

const vialData: GameState = getRandomGamedata(colors, maxVialSize).concat([[], []]);

function App() {
  const [selectedVial, setSelectedVial] = useState<number>();
  const [gameState, setGameState] = useState(vialData);

  const selectVial = (selectedVialIndex: number): void => {
    if (selectedVial === undefined) {
      setSelectedVial(selectedVialIndex);
      return;
    } else if (selectedVialIndex === selectedVial) {
      setSelectedVial(undefined);
      return;
    } else {
      const newState = pourLiquid(gameState, selectedVial, selectedVialIndex);
      setGameState(newState);
      setSelectedVial(undefined);
    }
  };

  return (
    <div className="game-container">
      <VialDisplay gameState={gameState} onVialClick={selectVial} selectedVial={selectedVial} />
    </div>
  );
}

export default App;
