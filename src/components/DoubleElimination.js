import { useState } from 'react';

import { TournamentBracket } from './TournamentBracket';

export const DoubleElimination = ({ data }) => {
  const [hoveredTeam, setHoveredTeam] = useState(null);

  return (
    <div className="relative overflow-x-auto">
      <TournamentBracket
        rounds={data.upper}
        hoveredTeam={hoveredTeam}
        setHoveredTeam={setHoveredTeam}
      />
      <div
        style={{
          height: '50px',
        }}
      ></div>
      <TournamentBracket
        rounds={data.lower}
        hoveredTeam={hoveredTeam}
        setHoveredTeam={setHoveredTeam}
      />
    </div>
  );
};
