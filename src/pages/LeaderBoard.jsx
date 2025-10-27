import React, { useEffect, useState } from 'react';
import useDatabase from '../hooks/useDatabase';
import ScoreBoard from '../components/UI/ScoreBoard';

const LeaderBoard = () => {
    const [scores, setScores] = useState([]);
    const { fetchScores } = useDatabase();

    useEffect(() => {
        const getScores = async () => {
            const data = await fetchScores();
            setScores(data);
        };
        getScores();
    }, [fetchScores]);

    return (
        <div className="leaderboard">
            <h1>Leader Board</h1>
            <ScoreBoard scores={scores} />
        </div>
    );
};

export default LeaderBoard;