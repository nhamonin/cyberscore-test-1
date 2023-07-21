import { useState } from 'react';

import Tabs from './components/Tabs';
import Bracket from './components/Bracket';

import epl10Data from './data/epl10.json';
import correctData from './data/correct.json';

import { transformMatches } from './utils/transformMatches';

const useDummyCorrectData = false;
const data = [
  { name: 'EPL 10', data: useDummyCorrectData ? correctData : epl10Data },
];

function App() {
  const [selectedTab, setSelectedTab] = useState(data[0].name);
  const selectedData = data.find(({ name }) => name === selectedTab).data;
  let transformedData = useDummyCorrectData
    ? selectedData
    : transformMatches(selectedData);

  console.log({
    useDummyCorrectData,
    upperLength: transformedData.upper.length,
    lowerLength: transformedData.lower.length,
  });

  if (!useDummyCorrectData) {
    console.log(JSON.stringify(transformedData));
  }

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
