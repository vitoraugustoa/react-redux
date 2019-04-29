import React from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

export default props => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/todos">Tarefas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">about</Link>                         
                    </li>
                </ul>
            </div>
        </nav>
    );
}