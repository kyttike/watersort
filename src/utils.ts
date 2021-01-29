import { maxVialSize } from './consts';
import { GameState } from './types';

function shuffle(array: any[]) {
  let resultArray = [...array];
  let currentIndex = resultArray.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = resultArray[currentIndex];
    resultArray[currentIndex] = resultArray[randomIndex];
    resultArray[randomIndex] = temporaryValue;
  }

  return resultArray;
}

export function getRandomGamedata(colors: string[], maxVialSize: number): string[][] {
  const result: string[][] = [];
  const duplicatedColors = colors.flatMap((color) => Array(maxVialSize).fill(color));
  const shuffledColors = shuffle(duplicatedColors);
  for (let i = 0; i < shuffledColors.length; i += maxVialSize) {
    result.push(shuffledColors.slice(i, i + maxVialSize));
  }
  return result;
}

export const pourLiquid = (gameState: string[][], sourceIndex: number, targetIndex: number): GameState => {
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
