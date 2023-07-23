import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export function UploadPage({ onUpload }) {
  const [error, setError] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.json',
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          try {
            const jsonData = JSON.parse(reader.result);
            onUpload(file.name, jsonData);
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
      className={`flex flex-col items-center justify-center p-10 border-4 rounded-lg transition-all duration-300 ease-in-out 
        ${
          isDragActive
            ? 'border-green-500 bg-green-100 text-green-700'
            : 'border-gray-500 text-gray-800'
        }`}
    >
      <input {...getInputProps()} />
      <p className="mb-4 text-lg">
        Drag 'n' drop some files here, or click to select files
      </p>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
