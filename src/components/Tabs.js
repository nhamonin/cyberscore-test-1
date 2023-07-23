import { Link, useNavigate } from 'react-router-dom';

function Tabs({ data, selectedTab, setSelectedTab }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-center items-center mb-10">
      {data.map((_, index) => (
        <button
          key={index}
          onClick={() => {
            setSelectedTab(index);
            navigate('/');
          }}
          className={`py-2 px-3 mx-2 text-center rounded font-bold text-lg shadow-md ${
            index === selectedTab
              ? 'bg-gray-900 text-white'
              : 'bg-gray-300 text-gray-900'
          }`}
        >
          Tournament #{index + 1}
        </button>
      ))}
      <Link
        to="/upload"
        className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white transition duration-200 bg-gray-900 rounded-full shadow-md hover:bg-gray-700"
      >
        +
      </Link>
    </div>
  );
}

export default Tabs;
