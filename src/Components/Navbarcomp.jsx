import React from 'react';
import { Link } from 'react-router-dom';

const Navbarcomp = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Dashboard</Link>
          

        <div className="mx-auto">
            <h4 className="text-center bs-success-bg-subtle text-body-secondary">SCHOOL MANAGEMENT SYSTEM</h4>
          </div>
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search..."
              aria-label="Search"
            />
            <button className="btn btn-outline-success me-2" type="button">
              Search
            </button>
            <button className="btn btn-outline-danger" type="button">
              Logout
            </button>
            </div>
          </div>
      </nav>
    </div>
  );
};

export default Navbarcomp;
