import { useState } from 'react';

import { DoubleElimination } from '../components/DoubleElimination';

export const Tournament = ({ data, selectedTab }) => {
  const [hoveredTeam, setHoveredTeam] = useState(null);

  const selectedData = data.find((_, index) => index === selectedTab) || {};

  return (
    <DoubleElimination
      data={selectedData}
      hoveredTeam={hoveredTeam}
      setHoveredTeam={setHoveredTeam}
    />
  );
};
