import { useState } from 'react';

import Tabs from './components/Tabs';
import Content from './components/Content';

import baliMajorData from './data/bali_major.json';
import berlinMajorData from './data/berlin_major.json';
import epl10Data from './data/epl10.json';

const data = [
  { name: 'Bali Major', data: baliMajorData },
  { name: 'Berlin Major', data: berlinMajorData },
  { name: 'EPL 10', data: epl10Data },
];

function App() {
  const [selectedTab, setSelectedTab] = useState(data[0].name);
  const selectedData = data.find(({ name }) => name === selectedTab).data;

  return (
    <div className="container mx-auto py-8">
      <Tabs
        data={data}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Content data={selectedData} />
    </div>
  );
}

export default App;
