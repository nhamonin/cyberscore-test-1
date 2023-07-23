import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLocation } from 'react-router-dom';

import { transformMatches } from '../utils/transformMatches';

const maxSize = 5 * 1024 * 1024; // 5MB

export function UploadPage({ onUpload, setSelectedTab, data }) {
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/upload') {
      setSelectedTab(null);
    }
  }, [location, setSelectedTab]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.json',
    maxSize,
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
              "Failed to parse uploaded data. Please ensure it's a valid JSON."
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
        }`}
    >
      <input {...getInputProps()} />
      <p className="text-lg">
        Drag 'n' drop some files here, or click to select files
      </p>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
