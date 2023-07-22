import { MATCH_STATES } from '@g-loot/react-tournament-brackets';

export function createDummyMatchesForAdvanceTeams(tournamentRounds) {
  const firstRoundTeamIds = new Set();
  tournamentRounds[0].matches.forEach((match) => {
    match.teams.forEach((team) => firstRoundTeamIds.add(team.id));
  });

  const secondRoundTeamIds = new Set();
  tournamentRounds[1].matches.forEach((match) => {
    match.teams.forEach((team) => secondRoundTeamIds.add(team.id));
  });

  const advancingTeams = [...secondRoundTeamIds].filter(
    (id) => !firstRoundTeamIds.has(id)
  );

  let id = Math.max(...Array.from(secondRoundTeamIds)) + 1;
  return advancingTeams.map((teamId) => {
    const team = tournamentRounds[1].matches
      .find((match) => match.teams.some((team) => team.id === teamId))
      .teams.find((team) => team.id === teamId);
    return {
      id: id++,
      status: MATCH_STATES.WALK_OVER,
      team_radiant_id: teamId,
      team_dire_id: -1,
      best_of_score: [1, 0],
      teams: [
        {
          ...team,
          score: 1,
        },
        {
          name: 'Bye',
          tag: '',
          id: -1,
          image: '',
          score: 0,
        },
      ],
    };
  });
}
