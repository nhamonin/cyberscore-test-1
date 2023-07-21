import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
} from '@g-loot/react-tournament-brackets';

function Bracket({ data }) {
  const isDoubleElimination = data?.upper?.length && data?.lower?.length;

  return isDoubleElimination ? (
    <DoubleEliminationBracket matches={data} matchComponent={Match} />
  ) : (
    <SingleEliminationBracket matches={data} matchComponent={Match} />
  );
}

export default Bracket;
