export const eggCount = (displayValue) => {
  let numEggs = 0;

  while (displayValue) {
    if(displayValue & 1) numEggs++;
    displayValue >>= 1;
  }
  
  return numEggs
 };