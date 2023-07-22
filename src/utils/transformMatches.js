import { MATCH_STATES } from '@g-loot/react-tournament-brackets';
import { createDummyMatchesForAdvanceTeams } from './createDummyMatchesForAdvanceTeams';

const statusMatchMapping = {
  ended_series: MATCH_STATES.SCORE_DONE,
  walk_over: MATCH_STATES.WALK_OVER,
};

const statusParticipantsMapping = {
  ended_series: MATCH_STATES.PLAYED,
};

const BRACKET_UPPER = 'upper';
const BRACKET_LOWER = 'lower';
const UPPER_FINAL = 'upper__final';
const LOWER_FINAL = 'lower__final';
const UPPER_GRAND_FINAL = 'upper__grand_final';

export function transformMatches(data) {
  if (!data) {
    throw new Error('No data provided');
  }

  const transformedData = {};

  for (const [bracket, tournamentRounds] of Object.entries(data)) {
    addDummyMatchesIfNeeded(bracket, tournamentRounds);

    transformedData[bracket] = tournamentRounds.flatMap(
      (tournamentRound, roundIndex) =>
        tournamentRound.matches.map((match, matchIndex) => {
          const { nextMatchId, nextLooserMatchId } = getNextMatchIds(
            bracket,
            tournamentRounds,
            roundIndex,
            matchIndex,
            data
          );

          return mapMatchToTransformedObject(
            match,
            tournamentRound,
            nextMatchId,
            nextLooserMatchId
          );
        })
    );
  }

  return transformedData;
}

function mapMatchToTransformedObject(
  match,
  tournamentRound,
  nextMatchId,
  nextLooserMatchId
) {
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
}

function addDummyMatchesIfNeeded(bracket, tournamentRounds) {
  if (bracket === BRACKET_UPPER) {
    const dummyMatches = createDummyMatchesForAdvanceTeams(tournamentRounds);
    tournamentRounds[0].matches = [
      ...tournamentRounds[0].matches,
      ...dummyMatches,
    ];
  }
}

function getNextMatchIds(
  bracket,
  tournamentRounds,
  roundIndex,
  matchIndex,
  data
) {
  const winningTeamId = findWinningTeamId(
    tournamentRounds[roundIndex].matches[matchIndex]
  );
  let nextMatchInSameRound = findNextMatchInSameRound(
    tournamentRounds[roundIndex],
    winningTeamId,
    matchIndex
  );
  let nextMatchInNextRound = findNextMatchInNextRound(
    tournamentRounds,
    roundIndex,
    winningTeamId
  );

  if (
    bracket === BRACKET_LOWER &&
    tournamentRounds[roundIndex].title === LOWER_FINAL
  ) {
    const upperGrandFinalMatch = findUpperGrandFinalMatch(data);
    if (upperGrandFinalMatch) {
      nextMatchInNextRound = upperGrandFinalMatch;
    }
  }

  let nextMatchId = nextMatchInSameRound?.id || nextMatchInNextRound?.id;

  let nextLooserMatchId = getNextLooserMatchId(
    bracket,
    roundIndex,
    matchIndex,
    tournamentRounds,
    data
  );

  if (tournamentRounds[roundIndex].title === UPPER_GRAND_FINAL) {
    nextMatchId = null;
    nextLooserMatchId = null;
  }

  return { nextMatchId, nextLooserMatchId };
}

function getNextLooserMatchId(
  bracket,
  roundIndex,
  matchIndex,
  tournamentRounds,
  data
) {
  if (bracket === BRACKET_UPPER) {
    if (tournamentRounds[roundIndex].title === UPPER_FINAL) {
      const lowerFinalMatch = findLowerFinalMatch(data);
      return lowerFinalMatch?.id || null;
    } else {
      return (
        findSameIndexedMatchInLowerBracket(roundIndex, matchIndex, data)?.id ||
        null
      );
    }
  }
  return null;
}

function findSameIndexedMatchInLowerBracket(roundIndex, matchIndex, data) {
  return data.lower[roundIndex]?.matches[matchIndex] || null;
}

function findLowerFinalMatch(data) {
  return (
    data.lower.find((round) => round.title === LOWER_FINAL)?.matches[0] || null
  );
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
  for (let i = roundIndex + 1; i < tournamentRounds.length; i++) {
    const nextMatch = tournamentRounds[i].matches.find((match) =>
      match.teams.some((nextTeam) => winningTeamId === nextTeam.id)
    );
    if (nextMatch) {
      return nextMatch;
    }
  }
  return null;
}

function findUpperGrandFinalMatch(data) {
  return data[BRACKET_UPPER].find(
    (upperRound) => upperRound.title === UPPER_GRAND_FINAL
  ).matches[0];
}
