import { useState } from 'react';
import './App.css';
import Vial from './Vial';
import { getRandomGamedata } from './utils';

export type VialState = string[];
type GameState = VialState[];

const colors = ['#ff4d4d', '#3db33d', '#5656ff', '#eee167', '#fd59e7', '#eea667'];
const maxVialSize = 4;
const vialData: GameState = getRandomGamedata(colors, maxVialSize).concat([[], []]);

const pourLiquid = (gameState: string[][], sourceIndex: number, targetIndex: number): GameState => {
  const sourceVial = gameState[sourceIndex];
  const targetVial = gameState[targetIndex];
  console.log(sourceVial, targetVial);
  while (true) {
    if (targetVial.length === maxVialSize || sourceVial.length === 0) {
      break;
    }
    const sourceColor = sourceVial[sourceVial.length - 1];
    const targetColor = targetVial[targetVial.length - 1];
    if (sourceColor !== targetColor && targetColor !== undefined) {
      break;
    }
    targetVial.push(sourceVial.pop() as string);
  }
  let newGameState = [...gameState];
  newGameState[sourceIndex] = [...sourceVial];
  newGameState[targetIndex] = [...targetVial];
  return newGameState;
};

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
      {gameState.map((vial, index) => (
        <Vial
          key={index}
          vialState={vial}
          onClick={() => selectVial(index)}
          selected={selectedVial === index}
          size={maxVialSize}
        />
      ))}
    </div>
  );
}

export default App;
