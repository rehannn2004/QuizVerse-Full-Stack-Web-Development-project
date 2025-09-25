import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLeaderboard } from '../../services/leaderboardService';
import '../../styles/leaderboard.css';

const Leaderboard = () => {
  const { subject } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard(subject);
        setLeaderboard(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [subject]);

  if (loading) {
    return <div className="loading">Loading leaderboard...</div>;
  }

  return (
    <div className="leaderboard-container">
      <h2>{subject} Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <div className="no-results">No results found for this subject</div>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>USN</th>
              <th>Highest Score</th>
              <th>Attempts</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.userId}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.usn}</td>
                <td>{entry.score}</td>
                <td>{entry.attempts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;