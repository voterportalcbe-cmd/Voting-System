import React, { useState } from 'react';

function UserPanel({ user, candidates, votes, setVotes, positions, currentPositionIndex, setCurrentPositionIndex, onLogout }) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const hasVotedForPosition = votes[user.name]?.[positions[currentPositionIndex]];

    const handleVote = (candidateId) => {
        if (!hasVotedForPosition) {
            const newVotes = {
                ...votes,
                [user.name]: {
                    ...votes[user.name],
                    [positions[currentPositionIndex]]: candidateId
                }
            };
            setVotes(newVotes);
            if (currentPositionIndex < positions.length - 1) {
                setCurrentPositionIndex(currentPositionIndex + 1);
            } else {
                setShowConfirmation(true);
            }
        }
    };

    const handleConfirm = () => {
        // Save votes to localStorage before closing
        localStorage.setItem('votes', JSON.stringify(votes));
        setShowConfirmation(false);
        setCurrentPositionIndex(0);
    };

    const handleCancel = () => {
        // Reset votes for current user and update localStorage
        const newVotes = { ...votes };
        delete newVotes[user.name];
        setVotes(newVotes);
        localStorage.setItem('votes', JSON.stringify(newVotes));
        setCurrentPositionIndex(0);
        setShowConfirmation(false);
    };

    const currentCandidates = candidates.filter(c => c.position === positions[currentPositionIndex]);

    return (
        <div className="panel user-panel">
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                <h2 style={{ margin: 0, fontSize: 'clamp(1.2rem, 4vw, 2rem)' }}>
                    User Dashboard - {user.name}
                </h2>
                <button className="button button-danger" onClick={onLogout}>
                    Logout
                </button>
            </div>
            {showConfirmation ? (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Confirm Your Votes</h3>
                        <p>Are you sure you want to submit your votes?</p>
                        <div className="modal-buttons">
                            <button className="button button-success" onClick={handleConfirm}>
                                Confirm
                            </button>
                            <button className="button button-danger" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ) : hasVotedForPosition ? (
                <div className="voted-message" style={{ 
                    padding: '20px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    border: '2px solid #22c55e',
                    textAlign: 'center'
                }}>
                    <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', margin: 0 }}>
                        ✓ You have already voted for {positions[currentPositionIndex]}!
                    </p>
                </div>
            ) : (
                <div>
                    <h3 style={{ 
                        textAlign: 'center',
                        fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)',
                        marginBottom: '20px',
                        color: '#f97316'
                    }}>
                        Vote for {positions[currentPositionIndex]}
                    </h3>
                    <div className="candidate-grid">
                        {currentCandidates.map((candidate) => (
                            <div
                                key={candidate.id}
                                className="candidate-card"
                                onClick={() => handleVote(candidate.id)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleVote(candidate.id);
                                    }
                                }}
                                aria-label={`Vote for ${candidate.name}`}
                            >
                                <img
                                    src={candidate.image || 'https://via.placeholder.com/100'}
                                    alt={`${candidate.name} profile`}
                                    loading="lazy"
                                />
                                <h4>{candidate.name}</h4>
                            </div>
                        ))}
                    </div>
                    {currentCandidates.length === 0 && (
                        <div style={{ 
                            textAlign: 'center',
                            padding: '20px',
                            color: '#ccc',
                            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
                        }}>
                            No candidates available for {positions[currentPositionIndex]}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserPanel;