export const annotate = (input) => {
  if (input.length === 1 && input[0] === '') return [''];
    
  const rows = input.map(row => row.split(''));
  
  for (let ridx=rows.length; ridx--; ) {
    const row = rows[ridx];
    for (let cidx=row.length; cidx--; ) {
      if (row[cidx] === '*') continue;
      row[cidx] = ~~(row[cidx-1] === '*')
        + ~~(row[cidx+1] === '*')
        + ~~(rows[ridx-1]?.[cidx-1] === '*')
        + ~~(rows[ridx-1]?.[cidx+0] === '*')
        + ~~(rows[ridx-1]?.[cidx+1] === '*')
        + ~~(rows[ridx+1]?.[cidx-1] === '*')
        + ~~(rows[ridx+1]?.[cidx+0] === '*')
        + ~~(rows[ridx+1]?.[cidx+1] === '*')
    }  
  }

  return rows.map(row => row.join('').replaceAll('0', ' '));
};
