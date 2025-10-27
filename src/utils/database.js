import mysql from 'mysql';

const dbConfig = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'last_bot_game'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

export const getScores = (callback) => {
  connection.query('SELECT * FROM scores ORDER BY score DESC', (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

export const saveScore = (playerName, score, callback) => {
  const query = 'INSERT INTO scores (player_name, score) VALUES (?, ?)';
  connection.query(query, [playerName, score], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results.insertId);
  });
};

export const closeConnection = () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing the database connection:', err);
    } else {
      console.log('Database connection closed.');
    }
  });
};