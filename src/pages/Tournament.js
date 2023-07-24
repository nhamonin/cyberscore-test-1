import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { DoubleElimination } from '../components/DoubleElimination';

export const Tournament = ({ data }) => {
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const { tab } = useParams();
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    const tournamentData = data[tab - 1];

    if (!tournamentData) {
      console.error('Tournament not found');
      navigate(`/tournament/${data.length}`);
    } else {
      setSelectedData(tournamentData);
    }
  }, [tab, data, navigate]);

  if (!selectedData) return null;

  return (
    <DoubleElimination
      data={selectedData}
      hoveredTeam={hoveredTeam}
      setHoveredTeam={setHoveredTeam}
    />
  );
};
