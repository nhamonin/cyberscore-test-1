import { useLocation, Link } from 'react-router-dom';

export function Tabs({ data }) {
  const location = useLocation();
  const selectedTab = Number(location.pathname.split('/')[2]);

  return (
    <div className="flex flex-wrap justify-center items-center w-full pt-3 pb-10">
      {data.map((_, index) => (
        <Link
          key={index + 1}
          to={`/tournament/${index + 1}`}
          className={`py-2 px-1 sm:px-3 mx-1 sm:mx-2 text-center rounded font-bold text-sm sm:text-lg transition duration-200 ${
            index + 1 === selectedTab
              ? 'bg-gray-900 text-white'
              : 'border border-gray-400 bg-white text-gray-900 hover:bg-blue-600 hover:text-white'
          }`}
        >
          Tournament #{index + 1}
        </Link>
      ))}
      <Link
        to="/upload"
        className={`py-2 px-4 m-1 sm:mx-2 text-center rounded font-bold text-sm sm:text-lg transition duration-200 ${
          location.pathname === '/upload'
            ? 'bg-gray-900 text-white'
            : 'border border-gray-400 bg-white text-gray-900 hover:bg-blue-600 hover:text-white'
        }`}
      >
        +
      </Link>
    </div>
  );
}
