import React from 'react';

const HUD = ({ health, score, level }) => {
    return (
        <div className="hud">
            <div className="hud-item">Health: {health}</div>
            <div className="hud-item">Score: {score}</div>
            <div className="hud-item">Level: {level}</div>
        </div>
    );
};

export default HUD;