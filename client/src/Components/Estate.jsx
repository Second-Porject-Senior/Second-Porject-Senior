import React, { useState, useEffect } from 'react';
import EstateDetails from './EstateDetails.jsx';
import axios from 'axios';

const Estate = () => {
  const [estates, setEstates] = useState([]);

  useEffect(() => {
    const fetchEstates = async () => {
      const response = await axios.get('http://localhost:3000/api/estates'); // Replace with your API endpoint
      setEstates(response.data);
    };

    fetchEstates();
  }, []);

  return (
    <div>
      <h1>Available Estates</h1>
      <div>
        {estates.map((estate) => (
          <EstateDetails key={estate.id} estate={estate} />
        ))}
      </div>
    </div>
  );
};

export default Estate;