import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3>Kuya D' Specialties</h3>
            <p>5960 Block 6 Martinez Highway Brgy. Addition Hills</p>
            <p>Phone: 0928 995 1778</p>
            <p>Email: info@abccompany.com</p>
          </div>
          <div className="col-md-4">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><Link to="/devs">Developers</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3>Connect with Us</h3>
            <ul className="social-icons">
              <li><a href="https://www.facebook.com/Mandaluyongseawolffireandrescuevolunteer"><i className="fab fa-facebook-f"></i></a></li>
                     </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
