import React from 'react'
import { Link } from 'react-router-dom'
import Category from './Category.jsx'
import '../css/Home.css'

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section position-relative vh-100 d-flex align-items-center">
        <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100"></div>
        <div className="container position-relative z-1">
          <div className="hero-content text-white">
            <h1 className="display-3 fw-bold mb-4">Discover Your Dream Home</h1>
            <p className="lead mb-4">Experience luxury living with our handpicked selection of premium properties. Find the perfect space that matches your lifestyle and aspirations.</p>
            <Link to="/estate" className="btn btn-primary btn-lg">View Properties</Link>
          </div>
        </div>
      </div>
      <Category />
    </div>
  )
}

export default Home