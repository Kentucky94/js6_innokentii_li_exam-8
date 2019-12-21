import React from 'react';
import {NavLink} from "react-router-dom";

import './Header.css';

const Header = () => {
  return (
    <div className='Header'>
      <h2>Quotes Central</h2>
      <nav>
        <NavLink className='navLink' exact activeClassName='active' to='/'>
          Quotes
        </NavLink>
        <NavLink className='navLink' activeClassName='active' to='/add-quote'>
          Submit New Quote
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;