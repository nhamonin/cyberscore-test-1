function Content({ data }) {
  return (
    <pre className="p-4 bg-gray-100 rounded mt-4">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export default Content;
