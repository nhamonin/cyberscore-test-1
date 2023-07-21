import { MATCH_STATES } from '@g-loot/react-tournament-brackets';

const statusMatchMapping = {
  ended_series: MATCH_STATES.SCORE_DONE,
  walk_over: MATCH_STATES.WALK_OVER,
};

const statusParticipantsMapping = {
  ended_series: MATCH_STATES.PLAYED,
};

export function transformMatches(data) {
  const transformedData = {};

  for (const [bracket, tournamentRounds] of Object.entries(data)) {
    if (bracket === 'upper') {
      const dummyMatches = createDummyMatchesForAdvanceTeams(tournamentRounds);
      tournamentRounds[0].matches = [
        ...tournamentRounds[0].matches,
        ...dummyMatches,
      ];
    }

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

          let nextLooserMatchId = null;

          if (bracket === 'upper') {
            if (tournamentRound.title === 'upper__final') {
              // Special case: If this is the upper bracket final, the loser goes to the lower bracket final
              const lowerFinalMatch = data.lower.find(
                (round) => round.title === 'lower__final'
              ).matches[0];
              nextLooserMatchId = lowerFinalMatch ? lowerFinalMatch.id : null;
            } else {
              // Regular case: The loser goes to the same-indexed match in the lower bracket
              nextLooserMatchId = data.lower[roundIndex]?.matches[matchIndex]
                ? data.lower[roundIndex].matches[matchIndex].id
                : null;
            }
          }

          if (tournamentRound.title === 'upper__grand_final') {
            nextMatchId = null;
            nextLooserMatchId = null;
          }

          return {
            id: match.id,
            nextMatchId,
            nextLooserMatchId,
            status: statusMatchMapping[match.status],
            tournamentRoundText: tournamentRound.title,
            participants: match.teams.map((team) => ({
              id: team.id,
              status: statusParticipantsMapping[match.status],
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

function getMaxScore(best_of_score) {
  return Math.max(...best_of_score);
}

function isWinningScore(team, match) {
  return team.score === getMaxScore(match.best_of_score);
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
    (upperRound) => upperRound.title === 'upper__grand_final'
  ).matches[0];
}

function createDummyMatchesForAdvanceTeams(tournamentRounds) {
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
