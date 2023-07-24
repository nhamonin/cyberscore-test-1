import { Route, Routes } from 'react-router-dom';

import { Tournament } from '../pages/Tournament';
import { Upload } from '../pages/Upload';

export const ContentRoutes = ({ data, handleUpload }) => {
  return (
    <Routes>
      <Route path="/tournament/:tab" element={<Tournament data={data} />} />
      <Route path="/upload" element={<Upload onUpload={handleUpload} />} />
    </Routes>
  );
};
