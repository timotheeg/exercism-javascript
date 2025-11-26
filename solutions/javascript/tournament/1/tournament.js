const DEFINITION = [
  { header: 'Team', padFunc: 'padEnd', len: 30 },
  { header: 'MP', padFunc: 'padStart', len: 2 },
  { header: 'W', padFunc: 'padStart', len: 2 },
  { header: 'D', padFunc: 'padStart', len: 2 },
  { header: 'L', padFunc: 'padStart', len: 2 },
  { header: 'P', padFunc: 'padStart', len: 2 },
];

function getRow(data) {
  return data
    .map((val, index) => {
      const {padFunc, len} = DEFINITION[index];
      return `${val}`[padFunc](len, ' ');    
    })
    .join(' | ');
}

export const tournamentTally = (data) => {
  const teams = new Map();

  function getTeam(name) {
    let team = teams.get(name);

    if (!team) {
      team = {
        name,
        MP: 0,
        W: 0,
        D: 0,
        L: 0,
      };
      teams.set(name, team);
    }
    
    return team;
  }

  data.split('\n').forEach(match => {
    if (/^\s*$/.test(match)) return; // empty line
    
    const [name1, name2, result] = match.split(';');

    const team1 = getTeam(name1);
    const team2 = getTeam(name2);

    team1.MP++;
    team2.MP++;

    switch(result) {
      case 'win': {
        team1.W++;
        team2.L++;
        break;
      }
      case 'loss': {
        team2.W++;
        team1.L++;
        break;
      }
      case 'draw': {
        team1.D++;
        team2.D++;
        break;
      }
    };
  });

  // compute points for each team
  teams.forEach(team => { team.P = team.W * 3 + team.D });

  const teamsList = [...teams.values()];

  teamsList.sort((t1, t2) => {
    if (t1.P === t2.P) {
      // on draw sort alphabeticaly
      return t1.name < t2.name ? -1 : 1;
    }

    // otherwise sort by score desc
    return t2.P - t1.P;
  });

  const headers = DEFINITION.map(def => def.header);
  const rows = [
    getRow(headers),
    ...teamsList.map(t => getRow([t.name, t.MP, t.W, t.D, t.L, t.P]))
  ];

  return rows.join('\n');
};
