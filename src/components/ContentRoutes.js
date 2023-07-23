import { Route, Routes } from 'react-router-dom';
import { Tournament } from '../pages/Tournament';
import { Upload } from '../pages/Upload';

export const ContentRoutes = ({
  data,
  selectedTab,
  handleUpload,
  setSelectedTab,
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Tournament data={data} selectedTab={selectedTab} />}
      />
      <Route
        path="/upload"
        element={
          <Upload onUpload={handleUpload} setSelectedTab={setSelectedTab} />
        }
      />
    </Routes>
  );
};
