import React from 'react';

const ScoreBoard = ({ score, level }) => {
    return (
        <div className="scoreboard">
            <h2>Score: {score}</h2>
            <h2>Level: {level}</h2>
        </div>
    );
};

export default ScoreBoard;