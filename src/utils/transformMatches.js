import { MATCH_STATES } from '@g-loot/react-tournament-brackets';

const statusMapping = {
  ended_series: MATCH_STATES.SCORE_DONE,
  walk_over: MATCH_STATES.WALK_OVER,
};

export function transformMatches(data) {
  const transformedData = {};

  for (const [bracket, tournamentRounds] of Object.entries(data)) {
    transformedData[bracket] = tournamentRounds.flatMap(
      (tournamentRound, roundIndex) =>
        tournamentRound.matches.map((match, matchIndex) => {
          const winningTeamId = findWinningTeamId(match);
          let nextMatchInSameRound = findNextMatchInSameRound(
            tournamentRound,
            winningTeamId,
            matchIndex
          );
          let nextMatchInNextRound = findNextMatchInNextRound(
            tournamentRounds,
            roundIndex,
            winningTeamId
          );

          if (bracket === 'lower' && tournamentRound.title === 'lower__final') {
            const upperGrandFinalMatch = findUpperGrandFinalMatch(data);
            if (upperGrandFinalMatch) {
              nextMatchInNextRound = upperGrandFinalMatch;
            }
          }

          let nextMatchId =
            nextMatchInSameRound?.id || nextMatchInNextRound?.id;
          let nextLooserMatchId =
            bracket === 'upper' && data.lower[roundIndex]?.matches[0]
              ? data.lower[roundIndex].matches[0].id
              : undefined;

          // Update for grand final match
          if (tournamentRound.title === 'Final - Match') {
            nextMatchId = undefined;
            nextLooserMatchId = undefined;
          }

          return {
            id: match.id,
            nextMatchId,
            nextLooserMatchId,
            status: statusMapping[match.status],
            tournamentRoundText: tournamentRound.title,
            participants: match.teams.map((team) => ({
              id: team.id,
              status: statusMapping[match.status],
              resultText: team.score.toString(),
              isWinner: isWinningScore(team, match),
              name: team.name,
            })),
          };
        })
    );
  }

  return transformedData;
}

function getMaxScore(match) {
  return Math.max(...match.best_of_score);
}

function isWinningScore(team, match) {
  return team.score === getMaxScore(match);
}

function findWinningTeamId(match) {
  return match.teams.find((team) => isWinningScore(team, match)).id;
}

function findNextMatchInSameRound(tournamentRound, winningTeamId, matchIndex) {
  return tournamentRound.matches.find(
    (nextMatch, nextMatchIndex) =>
      nextMatchIndex > matchIndex &&
      nextMatch.teams.some((nextTeam) => winningTeamId === nextTeam.id)
  );
}

function findNextMatchInNextRound(tournamentRounds, roundIndex, winningTeamId) {
  return tournamentRounds[roundIndex + 1]?.matches.find((nextMatch) =>
    nextMatch.teams.some((nextTeam) => winningTeamId === nextTeam.id)
  );
}

function findUpperGrandFinalMatch(data) {
  return data['upper'].find(
    (upperRound) => upperRound.title === 'Final - Match'
  ).matches[0];
}
