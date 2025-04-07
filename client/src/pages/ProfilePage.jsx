import React, { useState } from 'react';
import { useAuth } from '../Contexts/Authcontext.jsx';
import axios from 'axios';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    role: user?.role || 'customer',
    pfp: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, pfp: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedData = {
        username: formData.username,
        email: formData.email,
        role: user.role === 'admin' ? formData.role : undefined,
      };

      const response = await axios.put(
        `http://localhost:3000/api/users/${user.id}`,
        updatedData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setUser(response.data);
      setError(null);
    } catch (err) {
      setError('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="pt-5"
      style={{
        paddingTop: '120px',
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: '#e0e0e0',
      }}
    >
      <div className="container">
        <div
          className="card shadow-lg p-4"
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            borderRadius: '1rem',
            backgroundColor: '#1e1e1e',
            border: '1px solid #333',
            paddingTop: '2rem', // Adding more space at the top
          }}
        >
          <h2 className="text-center mb-4 fw-bold" style={{ color: '#f0c040' }}>
            Update Profile
          </h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="username"
                className="form-label fw-bold"
                style={{ color: '#f0c040' }} // Making the label text more visible
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control bg-dark text-light border-secondary"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label fw-bold"
                style={{ color: '#f0c040' }} // Making the label text more visible
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control bg-dark text-light border-secondary"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {user.role === 'admin' && (
              <div className="mb-3">
                <label
                  htmlFor="role"
                  className="form-label fw-bold"
                  style={{ color: '#f0c040' }} // Making the label text more visible
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="form-select bg-dark text-light border-secondary"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            <div className="mb-3">
              <label
                htmlFor="pfp"
                className="form-label fw-bold"
                style={{ color: '#f0c040' }} // Making the label text more visible
              >
                Profile Picture
              </label>
              <input
                type="file"
                id="pfp"
                name="pfp"
                className="form-control bg-dark text-light border-secondary"
                onChange={handleFileChange}
              />
            </div>

            <button type="submit" className="btn btn-warning w-100 fw-bold" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
