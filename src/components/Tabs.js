function Tabs({ data, selectedTab, setSelectedTab }) {
  return (
    <div className="flex space-x-4">
      {data.map(({ name }) => (
        <button
          key={name}
          onClick={() => setSelectedTab(name)}
          className={`p-2 rounded ${
            name === selectedTab
              ? 'bg-blue-500 text-white'
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
