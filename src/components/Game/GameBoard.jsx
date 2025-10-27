import React, { useEffect, useState } from 'react';
import useGame from '../../hooks/useGame';
import '../../styles/global.css';

const PLAYER_START_X = 400;
const PLAYER_START_Y = 440;
const CLONE_MIN_X = 50;

const INITIAL_CLONES = [
    { x: 1150, y: 440, id: 1 },
    { x: 800, y: 435, id: 2 },
    { x: 1000, y: 450, id: 3 },
    { x: 1150, y: 438, id: 4 },
    { x: 800, y: 439, id: 5 }
];

const BULLET_SPEED = 20;
const MAX_MOVES = 5;
const MOVE_AMOUNT = 20;

const GameBoard = () => {
    const { startGame } = useGame();
    const [level, setLevel] = useState(1);
    const [playerPos, setPlayerPos] = useState({ x: PLAYER_START_X, y: PLAYER_START_Y });
    const [gameStarted, setGameStarted] = useState(false);
    const [paused, setPaused] = useState(false);
    const [clones, setClones] = useState([]);
    const [bullets, setBullets] = useState([]);
    const [passedClones, setPassedClones] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [verticalMoves, setVerticalMoves] = useState(0);
    const [score, setScore] = useState(0);

    const generateClones = (level) => {
        const clones = [];
        const minY = PLAYER_START_Y - MAX_MOVES * MOVE_AMOUNT;
        const maxY = PLAYER_START_Y + MAX_MOVES * MOVE_AMOUNT;
        for (let i = 0; i < level + 2; i++) {
            clones.push({
                x: 1150 - i * 60,
                y: minY + Math.floor(Math.random() * (maxY - minY)),
                id: Date.now() + i
            });
        }
        return clones;
    };

    const handleGameStart = () => {
        startGame();
        setPlayerPos({ x: PLAYER_START_X, y: PLAYER_START_Y });
        setClones(generateClones(level));
        setGameStarted(true);
        setPaused(false);
        setGameWon(false);
        setGameOver(false);
        setPassedClones(0);
        setBullets([]);
        setScore(0);
    };

    const handleRestart = () => {
        setPassedClones(0);
        setGameOver(false);
        setGameWon(false);
        setLevel(1);
        setPlayerPos({ x: PLAYER_START_X, y: PLAYER_START_Y });
        setClones(generateClones(1));
        setBullets([]);
        setGameStarted(true);
        setPaused(false);
        setScore(0);
    };

    // Player movement
    useEffect(() => {
        if (!gameStarted || paused || gameOver || gameWon) return;
        const handleKeyDown = (e) => {
            if (e.repeat) return;
            setPlayerPos((pos) => {
                if (e.key === 'ArrowLeft') return { ...pos, x: Math.max(pos.x - MOVE_AMOUNT, -75) };
                if (e.key === 'ArrowRight') return { ...pos, x: Math.min(pos.x + MOVE_AMOUNT, 1000) };
                if (e.key === 'ArrowUp' && verticalMoves > -MAX_MOVES) {
                    setVerticalMoves(moves => moves - 1);
                    return { ...pos, y: pos.y - MOVE_AMOUNT };
                }
                if (e.key === 'ArrowDown' && verticalMoves < MAX_MOVES) {
                    setVerticalMoves(moves => moves + 1);
                    return { ...pos, y: pos.y + MOVE_AMOUNT };
                }
                return pos;
            });

            if (e.code === 'Space') {
                setBullets((prev) => [
                    ...prev,
                    {
                        x: playerPos.x + 225 / 2 - 8,
                        y: playerPos.y + 225 / 2 - 16,
                        id: Date.now()
                    }
                ]);
                e.preventDefault();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameStarted, paused, playerPos, verticalMoves, gameOver, gameWon]);

    // Bullet movement
    useEffect(() => {
        if (!gameStarted || paused || gameOver || gameWon) return;
        const interval = setInterval(() => {
            setBullets((prev) =>
                prev
                    .map(bullet => ({ ...bullet, x: bullet.x + BULLET_SPEED }))
                    .filter(bullet => bullet.x < 1200)
            );
        }, 50);
        return () => clearInterval(interval);
    }, [gameStarted, paused, gameOver, gameWon]);

    // Clone movement
    useEffect(() => {
        if (!gameStarted || paused || gameOver || gameWon) return;
        const interval = setInterval(() => {
            setClones(prevClones => {
                const newClones = [];
                let newlyPassed = 0;
                prevClones.forEach(clone => {
                    const newX = clone.x - 7;
                    if (newX < CLONE_MIN_X) {
                        newlyPassed += 1;
                    } else {
                        newClones.push({ ...clone, x: newX });
                    }
                });
                if (newlyPassed > 0) {
                    setPassedClones(count => count + newlyPassed);
                }
                return newClones;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [gameStarted, paused, gameOver, gameWon]);

    // Clone hit and level up logic
    useEffect(() => {
        if (!gameStarted || paused || gameOver || gameWon) return;
        let scoreIncrement = 0;
        setClones((prevClones) =>
            prevClones.filter(clone => {
                const hit = bullets.some(
                    bullet =>
                        bullet.x > clone.x &&
                        bullet.x < clone.x + 200 &&
                        bullet.y > clone.y &&
                        bullet.y < clone.y + 200
                );
                if (hit) scoreIncrement += 1;
                return !hit;
            })
        );
        if (scoreIncrement > 0) {
            setScore(prev => prev + scoreIncrement);
        }
        // Level up if all clones are gone
        if (clones.length === 0 && gameStarted && !gameWon) {
            setLevel(lvl => lvl + 1);
            setClones(generateClones(level + 1));
        }
    }, [bullets, gameStarted, paused, gameOver, gameWon]);

    // Game over logic
    useEffect(() => {
        if (passedClones >= 3 && !gameOver) {
            setGameOver(true);
            setGameStarted(false);
        }
    }, [passedClones, gameOver]);

    // Win logic
    useEffect(() => {
        if (score >= 16 && gameStarted && !gameOver && !gameWon) {
            setGameStarted(false);
            setGameWon(true);
            alert('Congratulations! You won the level!');
        }
    }, [score, gameStarted, gameOver, gameWon]);

    const handlePause = () => {
        setPaused((prev) => !prev);
    };

    const gameAreaRef = React.useRef(null);

    const handleFullScreen = () => {
        if (gameAreaRef.current) {
            if (gameAreaRef.current.requestFullscreen) {
                gameAreaRef.current.requestFullscreen();
            } else if (gameAreaRef.current.webkitRequestFullscreen) {
                gameAreaRef.current.webkitRequestFullscreen();
            } else if (gameAreaRef.current.mozRequestFullScreen) {
                gameAreaRef.current.mozRequestFullScreen();
            } else if (gameAreaRef.current.msRequestFullscreen) {
                gameAreaRef.current.msRequestFullscreen();
            }
        }
    };

    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(
                document.fullscreenElement === gameAreaRef.current ||
                document.webkitFullscreenElement === gameAreaRef.current ||
                document.mozFullScreenElement === gameAreaRef.current ||
                document.msFullscreenElement === gameAreaRef.current
            );
        };
        document.addEventListener('fullscreenchange', handleFullScreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
        document.addEventListener('mozfullscreenchange', handleFullScreenChange);
        document.addEventListener('MSFullscreenChange', handleFullScreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
        };
    }, []);

    return (
        <div className="game-board" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
                ref={gameAreaRef}
                className="game-area"
                style={{
                    position: 'relative',
                    width: 1200,
                    height: 700,
                    backgroundImage: "url('/assets/backgrounds/nyc.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '4px solid #333',
                    borderRadius: '16px',
                    margin: '0 auto',
                    boxShadow: '0 0 40px rgba(0,0,0,0.5)'
                }}
            >
                {/* Instructions overlay */}
                {!gameStarted && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '20%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(34,34,34,0.95)',
                            color: 'limegreen',
                            borderRadius: '16px',
                            padding: '32px 48px',
                            fontSize: '1.4rem',
                            textAlign: 'center',
                            zIndex: 20,
                            boxShadow: '0 4px 32px rgba(0,255,0,0.12)'
                        }}
                    >
                        <div><strong>Welcome to LAST BOT!</strong></div>
                        <div style={{ marginTop: 12 }}>← Left Arrow | → Right Arrow: Move Left & Right.</div>
                        <div>↑ Up Arrow | ↓ Down Arrow: Move Up & Down</div>
                        <div>_ Space Bar: Shoot</div><br />
                        <div>Game Objective: Move your bot and shoot to stop clones from reaching the left side.</div>
                    </div>
                )}
                {/* Centered Play Button */}
                {!gameStarted && (
                    <button
                        onClick={handleGameStart}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            backgroundColor: 'limegreen',
                            color: '#fff',
                            border: 'none',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 4px 16px rgba(0,255,0,0.2)',
                            zIndex: 30
                        }}
                    >
                        ▶
                    </button>
                )}
                {/* Bullets, player, clones, etc. */}
                {bullets.map(bullet => (
                    <div
                        key={bullet.id}
                        style={{
                            position: 'absolute',
                            left: bullet.x,
                            top: isFullScreen ? bullet.y * 1.85 : bullet.y,
                            width: 16,
                            height: 32,
                            backgroundColor: 'limegreen',
                            borderRadius: '8px'
                        }}
                    />
                ))}
                <div
                    className="player"
                    style={{
                        position: 'absolute',
                        left: playerPos.x,
                        top: isFullScreen ? playerPos.y * 1.85 : playerPos.y,
                        width: 225,
                        height: 225,
                        backgroundImage: "url('/assets/characters/last-bot.png')",
                        backgroundSize: 'cover'
                    }}
                />
                {clones.map(clone => (
                    <div
                        key={clone.id}
                        className="clone"
                        style={{
                            position: 'absolute',
                            left: clone.x,
                            top: isFullScreen ? clone.y * 1.9 : clone.y,
                            width: 200,
                            height: 200,
                            backgroundImage: "url('/assets/characters/enemy-clone.png')",
                            backgroundSize: 'cover'
                        }}
                    />
                ))}
                {gameStarted && !paused && <div style={{ position: 'absolute', top: 10, left: 10, color: 'green' }}>Game Started!</div>}
                {gameStarted && paused && <div style={{ position: 'absolute', top: 10, left: 10, color: 'orange' }}>Game Paused</div>}

                {gameOver && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '40%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'rgba(0,0,0,0.8)',
                            color: 'red',
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            padding: '48px 64px',
                            borderRadius: '24px',
                            zIndex: 100,
                            textAlign: 'center',
                            animation: 'flash 1s steps(2, start) infinite'
                        }}
                    >
                        GAME OVER
                        <div style={{ fontSize: '1.5rem', color: 'white', marginTop: 24 }}>
                            3 clones have passed you and reached the city!<br />
                            Stop them before they get through next time.
                        </div>
                        <button
                            onClick={handleRestart}
                            style={{
                                marginTop: 32,
                                fontSize: '1.5rem',
                                padding: '12px 32px',
                                borderRadius: '12px',
                                background: 'limegreen',
                                color: '#222',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Restart
                        </button>
                    </div>
                )}
            </div>
            {/* Pause and Full Screen Buttons Side by Side */}
            <div style={{ display: 'flex', gap: 24, marginTop: 24 }}>
                {gameStarted && (
                    <button
                        onClick={handlePause}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: '12px',
                            backgroundColor: paused ? 'limegreen' : 'orange',
                            color: '#fff',
                            border: 'none',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 4px 16px rgba(0,255,0,0.2)',
                            padding: 0
                        }}
                    >
                        {paused ? '▶' : '⏸'}
                    </button>
                )}
                <button
                    onClick={handleFullScreen}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: '12px',
                        backgroundColor: '#222',
                        color: 'limegreen',
                        border: '2px solid limegreen',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(0,255,0,0.1)',
                        padding: 0
                    }}
                >
                    Full<br />Screen
                </button>
            </div>
            <div style={{ marginTop: 16, color: 'limegreen', fontWeight: 'bold', fontSize: '1.2rem' }}>
                Score: {level}
            </div>
            <div className="score-display" style={{ marginTop: 8 }}>Score: {score}</div>
        </div>
    );
};

export default GameBoard;