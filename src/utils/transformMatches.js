import { formatTitle } from './formatTitle';

export function transformMatches(data) {
  if (!data) {
    throw new Error('No data provided');
  }

  const transformedData = {};

  for (const [bracket, tournamentRounds] of Object.entries(data)) {
    transformedData[bracket] = tournamentRounds.map((round) => {
      return {
        title: formatTitle(round.title),
        seeds: round.matches.map((match, index) => {
          return {
            id: match.id,
            bye_match: match.bye_match,
            teams: match.teams.map((team) => {
              return {
                id: team.id,
                name: team.name,
                image: team.image,
                winner: team.score === Math.max(...match.best_of_score),
                score: team.score.toString(),
              };
            }),
          };
        }),
      };
    });
  }

  return transformedData;
}
