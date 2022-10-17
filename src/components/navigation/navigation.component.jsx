import React from "react";
import { Link, Outlet } from "react-router-dom";
import './navigation.styles.scss'
import {ReactComponent as Logo } from '../../assets/logo.svg'

const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <Link className='logo-container' to='/'>
          <Logo className='logo' />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/">
            HOME
          </Link>
          <Link className="nav-link" to="/face">
            FACE
          </Link>
          <Link className="nav-link" to="/cs">
            CS
          </Link>
          {/* {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )} */}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation