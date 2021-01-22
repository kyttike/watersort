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
