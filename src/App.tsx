import { useState } from 'react';
import './App.css';
import { getRandomGamedata, pourLiquid } from './utils';
import VialDisplay from './VialDisplay';
import { colors, maxVialSize } from './consts';
import { GameState } from './types';

const vialData: GameState = getRandomGamedata(colors, maxVialSize).concat([[], []]);

function App() {
  const [selectedVial, setSelectedVial] = useState<number>();
  const [gameState, setGameState] = useState<GameState>(vialData);
  const [history, setHistory] = useState<GameState[]>([]);

  const updateGameState = (newState: GameState) => {
    setHistory([...history, gameState]);
    setGameState(newState);
  };

  const undoMove = () => {
    if (history.length === 0) return;
    setSelectedVial(undefined);
    setGameState(history[history.length - 1]);
    setHistory(history.slice(0, history.length - 1));
    console.log({
      gameState,
      history,
    });
  };

  const selectVial = (selectedVialIndex: number): void => {
    if (selectedVial === undefined) {
      setSelectedVial(selectedVialIndex);
      return;
    } else if (selectedVialIndex === selectedVial) {
      setSelectedVial(undefined);
      return;
    } else {
      const newState = pourLiquid(gameState, selectedVial, selectedVialIndex);
      updateGameState(newState);
      setSelectedVial(undefined);
    }
  };

  return (
    <div className="game-container">
      <VialDisplay gameState={gameState} onVialClick={selectVial} selectedVial={selectedVial} />
      <button className="undo-button" disabled={history.length === 0} onClick={undoMove}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Undo
      </button>
    </div>
  );
}

export default App;
