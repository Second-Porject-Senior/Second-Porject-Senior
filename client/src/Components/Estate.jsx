import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OneEstate from './OneEstate.jsx';

const Estate = () => {
  const [estates, setEstates] = useState([]);

  useEffect(() => {
    const fetchEstates = async () => {
      const response = await axios.get('http://localhost:3000/api/estate/getAll'); 
      setEstates(response.data);
    };

    fetchEstates();
  }, []);

  return (
    <div>
      <h1>Available Estates</h1>
      <div>
        {estates.map((estate) => (
          <OneEstate key={estate.id} estate={estate} />
        ))}
      </div>
    </div>
  );
};

export default Estate;