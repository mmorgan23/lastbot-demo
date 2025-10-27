export const startGame = () => {
    // Initialize game state
    return {
        level: 1,
        score: 0,
        playerHealth: 100,
        enemiesDefeated: 0,
        powerUpsCollected: 0,
    };
};

export const updateScore = (state, points) => {
    return {
        ...state,
        score: state.score + points,
    };
};

export const playerHit = (state) => {
    return {
        ...state,
        playerHealth: state.playerHealth - 10,
    };
};

export const collectPowerUp = (state) => {
    return {
        ...state,
        powerUpsCollected: state.powerUpsCollected + 1,
    };
};

export const levelUp = (state) => {
    return {
        ...state,
        level: state.level + 1,
    };
};

export const resetGame = () => {
    return startGame();
};