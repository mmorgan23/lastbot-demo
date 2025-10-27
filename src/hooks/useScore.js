import { useState, useEffect } from 'react';

const useScore = () => {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);

    const increaseScore = (points) => {
        setScore(prevScore => prevScore + points);
    };

    const nextLevel = () => {
        setLevel(prevLevel => prevLevel + 1);
    };

    useEffect(() => {
        // Logic to handle score and level updates can be added here
    }, [score, level]);

    return { score, level, increaseScore, nextLevel };
};

export default useScore;