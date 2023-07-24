import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import epl10Data from '../data/epl10.json';
import baliMajorData from '../data/bali_major.json';
import berlinMajorData from '../data/berlin_major.json';

import { transformMatches } from '../utils/transformMatches';

const initialData = [epl10Data, baliMajorData, berlinMajorData]
  .map((jsonData, index) => {
    try {
      return transformMatches(jsonData);
    } catch (error) {
      console.error(
        `Failed to process initial JSON data at index ${index}:`,
        error
      );
      return null;
    }
  })
  .filter(Boolean);

export function useTournamentData() {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpload = (_, jsonData) => {
    try {
      setData((prevData) => [...prevData, jsonData]);
      navigate(`/tournament/${data.length + 1}`);
    } catch (error) {
      setError(
        "Failed to process uploaded data. Please ensure it's a valid JSON and the file size is less than 5MB."
      );
    }
  };

  return { data, error, handleUpload };
}
