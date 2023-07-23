import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import Tabs from './components/Tabs';
import { DoubleElimination } from './components/DoubleElimination';
import { UploadPage } from './components/UploadPage';

import epl10Data from './data/epl10.json';
import baliMajorData from './data/bali_major.json';
import berlinMajorData from './data/berlin_major.json';

import { transformMatches } from './utils/transformMatches';

const initialData = [epl10Data, baliMajorData, berlinMajorData].map(
  transformMatches
);

function Main() {
  const [data, setData] = useState(initialData);
  const [selectedTab, setSelectedTab] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpload = (_, jsonData) => {
    try {
      setData((prevData) => [...prevData, jsonData]);
      setSelectedTab(data.length);
      navigate('/');
    } catch (error) {
      setError(
        "Failed to process uploaded data. Please ensure it's a valid JSON."
      );
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Tabs
        data={data}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {error && <div className="text-red-600">{error}</div>}
      <Routes>
        <Route
          path="/"
          element={
            <DoubleElimination
              data={data.find((_, index) => index === selectedTab) || {}}
            />
          }
        />
        <Route
          path="/upload"
          element={
            <UploadPage
              onUpload={handleUpload}
              setSelectedTab={setSelectedTab}
            />
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
