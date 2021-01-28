import { useState } from 'react';
import './App.css';
import Vial from './Vial';
import { getRandomGamedata } from './utils';

export type VialState = string[];
type GameState = VialState[];

const colors = [
  '#ff4d4d',
  '#3db33d',
  '#5656ff',
  '#eee167',
  '#fd59e7',
  '#eea667',
  '#84b2ff',
  '#6e0000',
  '#4a0973',
  '#235b00',
  '#944900',
  '#7e9400',
];
const maxVialSize = 4;
const vialData: GameState = getRandomGamedata(colors, maxVialSize).concat([[], []]);

const pourLiquid = (gameState: string[][], sourceIndex: number, targetIndex: number): GameState => {
  const sourceVial = [...gameState[sourceIndex]];
  const targetVial = [...gameState[targetIndex]];
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
  newGameState[sourceIndex] = sourceVial;
  newGameState[targetIndex] = targetVial;
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

  let indexedState = gameState.map((vial, index) => ({
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
    <div className="game-container">
      {rows.map((row, rowIndex) => (
        <div className="game-container--row" key={rowIndex}>
          {row.map((vialData) => (
            <Vial
              key={vialData.index}
              vialState={vialData.vial}
              onClick={() => selectVial(vialData.index)}
              selected={selectedVial === vialData.index}
              size={maxVialSize}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
