export const GAME_CONFIG = {
    levels: [
        { id: 1, difficulty: 'easy', enemies: 5, powerUps: 2 },
        { id: 2, difficulty: 'medium', enemies: 10, powerUps: 3 },
        { id: 3, difficulty: 'hard', enemies: 15, powerUps: 5 },
    ],
    scoring: {
        enemyDefeated: 100,
        powerUpCollected: 50,
        levelCompletion: 500,
    },
    player: {
        initialHealth: 100,
        speed: 5,
        jumpHeight: 10,
    },
    gameSettings: {
        gravity: 9.8,
        maxLevel: 3,
        respawnTime: 3000,
    },
};