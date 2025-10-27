# LAST BOT Game

LAST BOT is a simple 2D action game that features multiple levels and engaging gameplay mechanics. The game is designed to provide an exciting experience for players as they navigate through various challenges and enemies.

## Features

- **Multiple Levels**: Players can progress through different levels, each with unique challenges and enemies.
- **Character Selection**: Choose from various characters, including the Last Bot, Dr. Con, and Humans, each with distinct abilities.
- **Power-Ups**: Collect power-ups to enhance gameplay and gain advantages over enemies.
- **Score Tracking**: Keep track of scores and compete with others on the leaderboard.
- **Responsive UI**: A user-friendly interface that provides essential game information, including health and score.

## Project Structure

The project is organized into several directories:

- **src**: Contains all the source code for the game.
  - **components**: Reusable components such as the game banner, game board, characters, and UI elements.
  - **pages**: Different pages of the application, including the home page, game page, level selection, and leaderboard.
  - **hooks**: Custom hooks for managing game state, database interactions, and score tracking.
  - **utils**: Utility functions for game logic, collision detection, and database interactions.
  - **config**: Configuration files for game settings and database connection.
  - **styles**: CSS files for styling the application.

- **public**: Contains the main HTML file for the application.

- **package.json**: Configuration file for npm, listing dependencies and scripts.

## Getting Started

To get started with the LAST BOT game, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd last-bot-game
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to play the game!

## Database Management

The game utilizes MySQL for database management. Ensure that you have a MySQL server running and configure the database settings in `src/config/dbConfig.js` to connect the game to your database.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please create a pull request or open an issue.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.