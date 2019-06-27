import './logo.css';
import React from 'react';
import { Link } from 'react-router-dom';


import logo from '../../../assets/img/logo.svg';

export default props => (
    <aside className="logo">
        <Link to="/">
            <img src={logo} alt="logo"/>
        </Link>
    </aside>
)