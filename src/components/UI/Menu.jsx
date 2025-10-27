import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    return (
        <div className="menu">
            <h1>LAST BOT</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/level-select">Level Select</Link></li>
                    <li><Link to="/game">Start Game</Link></li>
                    <li><Link to="/leaderboard">Leader Board</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;