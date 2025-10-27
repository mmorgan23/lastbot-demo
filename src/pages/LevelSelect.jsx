import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const LevelSelect = () => {
    const navigate = useNavigate();

    const handleLevelSelect = (level) => {
        navigate(`/game/${level}`);
    };

    return (
        <div className="level-select">
            <h1>Select a Level</h1>
            <div className="level-buttons">
                <button onClick={() => handleLevelSelect(1)}>Level 1</button>
                <button onClick={() => handleLevelSelect(2)}>Level 2</button>
                <button onClick={() => handleLevelSelect(3)}>Level 3</button>
                <button onClick={() => handleLevelSelect(4)}>Level 4</button>
            </div>
        </div>
    );
};

export default LevelSelect;