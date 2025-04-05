import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OneEstate from './OneEstate.jsx';
import '../css/OneEstate.css';

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
    <div className="estates-section">
      <h1 className="estates-title">Available Estates</h1>
      <div className="estates-grid">
        {estates.map((estate) => (
          <OneEstate key={estate.id} estate={estate} />
        ))}
      </div>
    </div>
  );
};

export default Estate;