import { Bracket } from 'react-brackets';
import { CustomSeed } from './CustomSeed';

export const TournamentBracket = ({ rounds, hoveredTeam, setHoveredTeam }) => {
  return (
    <Bracket
      rounds={rounds}
      renderSeedComponent={(props) => {
        const isLineConnector =
          rounds[props.roundIndex].seeds.length ===
          rounds[props.roundIndex + 1]?.seeds.length;
        return (
          <CustomSeed
            {...props}
            isLineConnector={isLineConnector}
            hoveredTeam={hoveredTeam}
            setHoveredTeam={setHoveredTeam}
          />
        );
      }}
      roundTitleComponent={(title) => {
        return (
          <div className="flex justify-center">
            <span className="text-white bg-gray-900 rounded-lg py-2 px-4">
              {title}
            </span>
          </div>
        );
      }}
      swipeableProps={{
        enableMouseEvents: true,
        animateHeight: true,
        style: {
          padding: '0 50px 0 0',
        },
      }}
    />
  );
};
