import { useState } from 'react';
import './App.css';
import { checkIsGameOver, getRandomGamedata, pourLiquid } from './utils';
import VialDisplay from './VialDisplay';
import { colors, maxVialSize } from './consts';
import { GameState } from './types';
import VictoryConfetti from './VictoryConfetti';

function App() {
  const [selectedVial, setSelectedVial] = useState<number>();
  const [gameState, setGameState] = useState<GameState>(getRandomGamedata(colors, maxVialSize));
  const [isGameOver, setGameOver] = useState<boolean>(false);
  const [history, setHistory] = useState<GameState[]>([]);

  const resetGame = () => {
    setHistory([]);
    setGameState(getRandomGamedata(colors, maxVialSize));
    setGameOver(false);
    setSelectedVial(undefined);
  };

  const updateGameState = (newState: GameState) => {
    setHistory([...history, gameState]);
    setGameState(newState);
    setGameOver(checkIsGameOver(newState));
  };

  const undoMove = () => {
    if (history.length === 0) return;
    setSelectedVial(undefined);
    setGameState(history[history.length - 1]);
    setGameOver(false);
    setHistory(history.slice(0, history.length - 1));
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
      <div className="game-container--buttons">
        <button className="button" onClick={resetGame}>
          {isGameOver ? 'New game' : 'Restart'}
        </button>
        {isGameOver ? null : (
          <button className="button" disabled={history.length === 0} onClick={undoMove}>
            Undo
          </button>
        )}
      </div>
      {isGameOver ? <VictoryConfetti /> : null}
    </div>
  );
}

export default App;
