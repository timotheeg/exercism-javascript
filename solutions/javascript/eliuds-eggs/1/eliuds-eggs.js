export const eggCount = (displayValue) => {
  let numEggs = 0;
  let curPos = 1;

  do {
    if (displayValue & curPos) numEggs++;
    curPos <<= 1;
  } while (curPos && curPos <= displayValue);

  return numEggs;
};
