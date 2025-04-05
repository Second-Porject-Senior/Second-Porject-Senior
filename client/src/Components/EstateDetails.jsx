import React from 'react';

const EstateDetails = ({estate}) => {
  return (
    <div>
      <h2>{estate.title}</h2>
      <p>{estate.description}</p>
      <p>Price: ${estate.price}</p>
      <p>Location: {estate.location}</p>
      <img src={estate.image_url} alt={estate.title}/>
    </div>
  );
};

export default EstateDetails;