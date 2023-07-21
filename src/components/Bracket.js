import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
} from '@g-loot/react-tournament-brackets';

function Bracket({ data }) {
  return data?.upper?.length && data?.lower?.length ? (
    <DoubleEliminationBracket matches={data} matchComponent={Match} />
  ) : (
    <SingleEliminationBracket matches={data} matchComponent={Match} />
  );
}

export default Bracket;
