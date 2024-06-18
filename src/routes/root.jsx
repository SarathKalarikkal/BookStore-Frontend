import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useUser } from '../UserContext';
import { useProduct } from '../productContext';

function Root() {
  const { user, setUser,  setLoginUser, setSignUpUser   } = useUser();

  const {cartItems} = useProduct()

  const loaction = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoginUser(null)
    setSignUpUser(null)
    setUser(null);
    localStorage.removeItem('loginUser');
    localStorage.removeItem('signUpUser');
};

const isActive = (path)=>{
  return loaction.pathname === path
}


  return (
    <>
     <nav className="navbar navbar-expand-lg bg-body-tertiary py-4">
  <div className="container">
    <Link to={"/"} className="navbar-brand" >
     BookStore
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to={"/"} className={`nav-link ${isActive('/') ? 'active' : ''}`} aria-current="page" href="#">
            Home
          </Link>
        </li>
               
        <li className="nav-item">
          <Link to={"/books"} className={`nav-link ${isActive('/books') ? 'active' : ''}`} >
            Books
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/authors"} className={`nav-link ${isActive('/authors') ? 'active' : ''}`} >
            Authors
          </Link>
        </li>
        <li className="nav-item">
          <Link  to={"/cart"} className={`nav-link ${isActive('/cart') ? 'active' : ''}`}>
               <i className="bi bi-bag fw-bold fs-4 cart-icon">{
                 (cartItems.length > 0 && (<span>{cartItems.length}</span>))
               }</i>
          </Link>
        </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link to={"/userProfile"} className={`nav-link logged ${isActive('/userProfile') ? 'active' : ''}`}>
                  <i className="bi bi-person-circle user-icon"></i>
                  {user}
                </Link>
              </li>
              <li className="nav-item">
                <button className='logoutBtn' onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to={"/login"} className="nav-link login">
                Login
              </Link>
            </li>
          )}
         
        
      </ul>
    </div>
  </div>
    </nav>

    <Outlet />
   
   <footer>
    <div className="footer-wrapper">
        <div className="container">
           <div className="row">
              <div className="col-md-6 col-lg-3">
                 <div className="footer-address">
                   <h2>BookStore</h2>
                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, suscipit</p>
                   <div className="addr">
                     <i className="bi bi-telephone-fill"></i>
                      <span>+91 98745614</span>
                   </div>
                   <div className="addr">
                     <i className="bi bi-globe2"></i>
                      <span>www.bookstore.com</span>
                   </div>
                 </div>
              </div>
              <div className="col-md-6 col-lg-3">
                  <div className="footer-link">
                    <span>Useful Links</span>
                     <Link to={'/'}>Home</Link>
                     <Link to={'/books'}>Books</Link>
                     <Link to={'/authors'}>Authors</Link>
                  </div>
              </div>
              <div className="col-md-6 col-lg-3">
                  <div className="footer-policy">
                     <span>Terms & Policy</span>
                     <Link>Policy</Link>
                     <Link>Terms & Conditions</Link>
                  </div>
              </div>
              <div className="col-md-6 col-lg-3">
                  <div className="footer-media">
                     
                       <i className='bi bi-facebook'></i>
                       <i className='bi bi-instagram'></i>
                       <i className='bi bi-twitter'></i>
                  
                  </div>
                </div>
           </div>
        </div>
    </div>        
        <div className="copywrite">
           <div className="container">
             <p>All rights reserved</p>
             <p>Designed & Developed by : SK</p>
           </div>
        </div>
   </footer>

    </>
  )
}

export default Root