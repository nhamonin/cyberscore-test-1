import { Seed, SingleLineSeed, SeedItem, SeedTeam } from 'react-brackets';

export const CustomSeed = ({
  seed,
  breakpoint,
  isLineConnector,
  hoveredTeam,
  setHoveredTeam,
}) => {
  const Wrapper = isLineConnector ? SingleLineSeed : Seed;

  return (
    <Wrapper
      style={{
        opacity: seed.bye_match ? 0.5 : 1,
      }}
      className={isLineConnector ? undefined : 'custom-border'}
      mobileBreakpoint={breakpoint}
    >
      <SeedItem style={{ width: '230px' }}>
        {seed.teams.map((team, index) => (
          <div
            key={team.id}
            className={`flex items-center justify-between ${
              index === 0 ? 'border-b border-gray-400' : ''
            }`}
            onMouseEnter={() => setHoveredTeam(team.id)}
            onMouseLeave={() => setHoveredTeam(null)}
            style={{
              backgroundColor: team.id === hoveredTeam ? '#0284c7' : '',
            }}
          >
            <img
              src={team?.image}
              alt={`${team?.name} logo`}
              className="w-8 h-8 object-contain p-1"
            />
            <SeedTeam className="flex-grow-1 flex-basis-0 overflow-hidden text-overflow ellipsis whitespace-nowrap">
              {team.name || ''}
            </SeedTeam>
            <span
              className={`border-l w-7 inline-block font-bold ${
                team.winner ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {team.score || ''}
            </span>
          </div>
        ))}
      </SeedItem>
    </Wrapper>
  );
};
