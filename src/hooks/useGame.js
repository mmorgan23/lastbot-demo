import { useState, useEffect } from 'react';

const useGame = () => {
    const [gameState, setGameState] = useState({
        level: 1,
        score: 0,
        playerHealth: 100,
        enemies: [],
        powerUps: [],
    });

    const startGame = () => {
        setGameState({
            level: 1,
            score: 0,
            playerHealth: 100,
            enemies: [],
            powerUps: [],
        });
        // Additional logic to initialize the game
    };

    const updateScore = (points) => {
        setGameState((prevState) => ({
            ...prevState,
            score: prevState.score + points,
        }));
    };

    const takeDamage = (amount) => {
        setGameState((prevState) => ({
            ...prevState,
            playerHealth: Math.max(prevState.playerHealth - amount, 0),
        }));
    };

    const addEnemy = (enemy) => {
        setGameState((prevState) => ({
            ...prevState,
            enemies: [...prevState.enemies, enemy],
        }));
    };

    const collectPowerUp = (powerUp) => {
        setGameState((prevState) => ({
            ...prevState,
            powerUps: [...prevState.powerUps, powerUp],
        }));
    };

    useEffect(() => {
        // Logic to handle game updates, such as enemy movement or level progression
    }, [gameState]);

    return {
        gameState,
        startGame,
        updateScore,
        takeDamage,
        addEnemy,
        collectPowerUp,
    };
};

export default useGame;