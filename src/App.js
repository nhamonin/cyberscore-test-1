import { BrowserRouter as Router } from 'react-router-dom';

import { Tabs } from './components/Tabs';
import { Error } from './components/Error';
import { ContentRoutes } from './components/ContentRoutes';
import { useTournamentData } from './hooks/useTournamentData';

function RouterWrapper() {
  const { data, selectedTab, setSelectedTab, error, handleUpload } =
    useTournamentData();

  return (
    <div className="container mx-auto py-8">
      <Tabs
        data={data}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Error message={error} />
      <ContentRoutes
        data={data}
        selectedTab={selectedTab}
        handleUpload={handleUpload}
        setSelectedTab={setSelectedTab}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <RouterWrapper />
    </Router>
  );
}

export default App;
