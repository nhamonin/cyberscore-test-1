import { useNavigate } from 'react-router-dom';

export function Tabs({ data, selectedTab, setSelectedTab }) {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    setSelectedTab(null);
    navigate('/upload');
  };

  return (
    <div className="flex flex-wrap justify-center items-center w-full pt-3 pb-10">
      {data.map((_, index) => (
        <button
          key={index}
          onClick={() => {
            setSelectedTab(index);
            navigate('/');
          }}
          className={`py-2 px-1 sm:px-3 mx-1 sm:mx-2 text-center rounded font-bold text-sm sm:text-lg transition duration-200 ${
            index === selectedTab
              ? 'bg-gray-900 text-white'
              : 'border border-gray-400 bg-white text-gray-900 hover:bg-blue-600 hover:text-white'
          }`}
        >
          Tournament #{index + 1}
        </button>
      ))}
      <button
        onClick={handleUploadClick}
        className={`py-2 px-4 m-1 sm:mx-2 text-center rounded font-bold text-sm sm:text-lg transition duration-200 ${
          selectedTab === null
            ? 'bg-gray-900 text-white'
            : 'border border-gray-400 bg-white text-gray-900 hover:bg-blue-600 hover:text-white'
        }`}
      >
        +
      </button>
    </div>
  );
}
