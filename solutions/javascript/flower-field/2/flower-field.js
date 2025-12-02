const NEIGHBOURS = [
  [-1, -1],
  [-1,  0],
  [-1,  1],
  [ 0, -1],
  [ 0,  1],
  [ 1, -1],
  [ 1,  0],
  [ 1,  1],
];

export const annotate = (input) => {
  if (input.length === 1 && input[0] === '') return [''];
    
  const rows = input.map(row => row.split(''))
  
  for (let ridx=rows.length; ridx--; ) {
    const row = rows[ridx];
    for (let cidx=row.length; cidx--; ) {
      if (row[cidx] === '*') continue;
      row[cidx] = NEIGHBOURS.reduce((acc, [xoffset, yoffset]) => acc + ~~(rows[ridx+xoffset]?.[cidx+yoffset] === '*'), 0);
    }  
  }

  return rows.map(row => row.join('').replaceAll('0', ' '));
};
