import { useState } from 'react';

import Tabs from './components/Tabs';
import Bracket from './components/Bracket';

import epl10Data from './data/epl10.json';
import baliMajorData from './data/bali_major.json';
import berlinMajorData from './data/berlin_major.json';

import { transformMatches } from './utils/transformMatches';

const data = [
  { name: 'EPL 10', data: epl10Data },
  { name: 'Bali Major', data: baliMajorData },
  { name: 'Berlin Major', data: berlinMajorData },
];

function App() {
  const [selectedTab, setSelectedTab] = useState(data[0].name);
  const selectedData = data.find(({ name }) => name === selectedTab).data;
  const transformedData = transformMatches(selectedData);

  console.log(JSON.stringify(transformedData));

  return (
    <>
      <div className="container mx-auto py-8">
        <Tabs
          data={data}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      <Bracket data={transformedData} />
    </>
  );
}

export default App;
