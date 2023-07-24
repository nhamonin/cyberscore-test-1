import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { Tabs } from './components/Tabs';
import { Error } from './components/Error';
import { ContentRoutes } from './components/ContentRoutes';
import { useTournamentData } from './hooks/useTournamentData';

function RouterWrapper() {
  const { data, error, handleUpload } = useTournamentData();

  return (
    <div className="container mx-auto py-8">
      <Tabs data={data} />
      <Error message={error} />
      <ContentRoutes data={data} handleUpload={handleUpload} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tournament/1" />} />
        <Route path="*" element={<RouterWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
