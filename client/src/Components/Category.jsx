import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Category() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/category/getall');
      setCategories(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleViewAllClick = () => {
    navigate("/properties");
  };

  const handleCategoryClick = (id) => {
    navigate(`/Category/${id}`);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Our Exclusive Sales Listings</h1>
      <button onClick={handleViewAllClick} className="btn btn-primary btn-lg mb-4">
        View all properties
      </button>

      <section>
        <div className="row g-4">
          {categories.map((category) => (
            <div className="col-md-4" key={category.id || category._id}>
              <div className="card h-100 text-center">
                {category.img && (
                  <img
                    src={category.img}
                    className="card-img-top"
                    alt={category.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 
                    onClick={() => handleCategoryClick(category.id || category._id)} 
                    className="card-title"
                    style={{ cursor: 'pointer' }}
                  >
                    {category.name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Category;



