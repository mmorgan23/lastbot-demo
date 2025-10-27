export const detectCollision = (rect1, rect2) => {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
};

export const handleCollision = (player, enemies) => {
    enemies.forEach((enemy) => {
        if (detectCollision(player, enemy)) {
            // Handle collision logic here (e.g., reduce health, remove enemy)
            player.health -= enemy.damage;
            enemy.isActive = false; // Example of removing the enemy
        }
    });
};