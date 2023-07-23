import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLocation } from 'react-router-dom';

import { transformMatches } from '../utils/transformMatches';

const maxSize = {
  value: 5242880,
  string: '5MB',
};

export function Upload({ onUpload, setSelectedTab }) {
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/upload') {
      setSelectedTab(null);
    }
  }, [location, setSelectedTab]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxSize: maxSize.value,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          try {
            const jsonData = JSON.parse(reader.result);
            const transformedData = transformMatches(jsonData);
            onUpload(file.name, transformedData);
            setError(null);
          } catch (error) {
            console.error('Invalid JSON:', error);
            setError(
              "Failed to process uploaded data. Please ensure it's a valid JSON and the file size is less than 5MB."
            );
          }
        };

        reader.readAsText(file);
      });
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center p-10 border-4 rounded-lg transition-all duration-300 ease-in-out cursor-pointer 
        ${
          isDragActive
            ? 'border-green-500 bg-green-100 text-green-700'
            : 'border-gray-500 text-gray-800'
        } h-[calc(100vh-160px)]`}
    >
      <input {...getInputProps()} />
      <p className="text-lg">
        Drag 'n' drop or click to select your tournament's <b>JSON file</b> for
        a <b>Double Elimination</b> bracket. Please ensure that the file is a
        valid JSON and does not exceed <b>{maxSize.string}</b>.
      </p>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
