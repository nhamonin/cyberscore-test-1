function Tabs({ data, selectedTab, setSelectedTab }) {
  return (
    <div className="flex space-x-4 content-center flex-wrap justify-center">
      {data.map(({ name }) => (
        <button
          key={name}
          onClick={() => setSelectedTab(name)}
          className={`p-2 rounded ${
            name === selectedTab
              ? 'bg-gray-900 text-white text-3xl p-3'
              : 'bg-white text-black'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
