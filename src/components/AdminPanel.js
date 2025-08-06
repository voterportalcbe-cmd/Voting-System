import React, { useState } from 'react';

function AdminPanel({ candidates, setCandidates, votes, positions, setPositions, onLogout }) {
    // Removed reset website functionality

    // Clear only voting history
    const [clearVotesConfirm, setClearVotesConfirm] = useState(false);
    const handleClearVotes = () => {
        localStorage.clear();
        window.location.reload();
    };
    const [currentSection, setCurrentSection] = useState('home');
    const [newCandidateName, setNewCandidateName] = useState('');
    const [newCandidateImage, setNewCandidateImage] = useState(null);
    const [newCandidatePosition, setNewCandidatePosition] = useState(positions[0]);
    const [imageError, setImageError] = useState('');
    const [allPositions, setAllPositions] = useState(() => {
        const saved = localStorage.getItem('positions');
        return saved ? JSON.parse(saved) : positions;
    });
    const [newPosition, setNewPosition] = useState('');
    const [positionError, setPositionError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'image/png') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewCandidateImage(reader.result);
                setImageError('');
            };
            reader.readAsDataURL(file);
        } else {
            setImageError('Please upload a PNG file.');
            setNewCandidateImage(null);
        }
    };

    const addCandidate = () => {
        if (newCandidateName && newCandidateImage && newCandidatePosition) {
            const newCandidate = {
                id: Date.now().toString(),
                name: newCandidateName,
                image: newCandidateImage,
                position: newCandidatePosition
            };
            setCandidates([...candidates, newCandidate]);
            setNewCandidateName('');
            setNewCandidateImage(null);
            setNewCandidatePosition(allPositions[0]);
            setImageError('');
            setCurrentSection('home');
        } else {
            setImageError('Candidate name, PNG image, and position are required.');
        }
    };

    // Add a new position/role
    const handleAddPosition = () => {
        const pos = newPosition.trim();
        if (!pos) {
            setPositionError('Position name required');
            return;
        }
        if (allPositions.includes(pos)) {
            setPositionError('Position already exists');
            return;
        }
        const updated = [...allPositions, pos];
        setAllPositions(updated);
        setPositions(updated); // Update parent's positions
        setNewPosition('');
        setPositionError('');
    };

    const removeCandidate = (id) => {
        setCandidates(candidates.filter((candidate) => candidate.id !== id));
    };

    const getTopCandidates = (position) => {
        const positionCandidates = candidates.filter(c => c.position === position);
        const voteCounts = positionCandidates.map((candidate) => ({
            ...candidate,
            votes: Object.values(votes).filter(vote => vote[position] === candidate.id).length
        }));
        return voteCounts.sort((a, b) => b.votes - a.votes).slice(0, 3);
    };

    const getVoteDetails = (position) => {
        const details = [];
        for (const [user, userVotes] of Object.entries(votes)) {
            const candidateId = userVotes[position];
            if (candidateId) {
                const candidate = candidates.find(c => c.id === candidateId);
                details.push(`${user} voted for ${candidate ? candidate.name : 'Unknown'} in ${position}`);
            }
        }
        return details.join('\n');
    };

    return (
        <div className="panel admin-panel">
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '25px',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                <h2 style={{ margin: 0, fontSize: 'clamp(1.2rem, 4vw, 2rem)' }}>
                    Admin Dashboard
                </h2>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button className="button button-danger" onClick={onLogout}>
                        Logout
                    </button>
                    <button className="button button-warning" style={{ background: '#fbbf24', color: '#222' }} onClick={() => setClearVotesConfirm(true)}>
                        Clear Voting History
                    </button>
                </div>
            </div>
            {clearVotesConfirm && (
                <div className="modal" style={{ zIndex: 2000 }}>
                    <div className="modal-content">
                        <h3>Confirm Clear Voting History</h3>
                        <p>This will erase all voting records but keep candidates and users. Are you sure?</p>
                        <div className="modal-buttons">
                            <button className="button button-danger" onClick={handleClearVotes}>Yes, Clear</button>
                            <button className="button" onClick={() => setClearVotesConfirm(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="nav-menu">
                <button
                    className={`nav-button ${currentSection === 'home' ? 'active' : ''}`}
                    onClick={() => setCurrentSection('home')}
                >
                    Home
                </button>
                <button
                    className={`nav-button ${currentSection === 'add' ? 'active' : ''}`}
                    onClick={() => setCurrentSection('add')}
                >
                    Add Candidate
                </button>
                <button
                    className={`nav-button ${currentSection === 'remove' ? 'active' : ''}`}
                    onClick={() => setCurrentSection('remove')}
                >
                    Remove Candidate
                </button>
                <button
                    className={`nav-button ${currentSection === 'results' ? 'active' : ''}`}
                    onClick={() => setCurrentSection('results')}
                >
                    Results
                </button>
            </div>
            {currentSection === 'home' && (
                <div className="admin-section">
                    <h3>Welcome, Admin</h3>
                    <div className="home-stats">
                        <div className="stat-card">
                            <h4>Total Candidates</h4>
                            <p>{candidates.length}</p>
                        </div>
                        <div className="stat-card">
                            <h4>Total Votes</h4>
                            <p>{Object.values(votes).reduce((sum, v) => sum + Object.keys(v).length, 0)}</p>
                        </div>
                    </div>
                </div>
            )}
            {currentSection === 'add' && (
                <div className="admin-section">
                    <h3>Add Candidate</h3>
                    <div className="add-candidate-form">
                        <input
                            type="text"
                            placeholder="Candidate Name"
                            value={newCandidateName}
                            onChange={(e) => setNewCandidateName(e.target.value)}
                        />
                        <select
                            value={newCandidatePosition}
                            onChange={(e) => setNewCandidatePosition(e.target.value)}
                        >
                            {allPositions.map((position) => (
                                <option key={position} value={position}>{position}</option>
                            ))}
                        </select>
                        <input
                            type="file"
                            accept="image/png"
                            onChange={handleImageChange}
                        />
                        <button className="button button-success" onClick={addCandidate}>Add</button>
                    </div>
                    {imageError && <p className="error">{imageError}</p>}
                    <div style={{ marginTop: '20px' }}>
                        <h4>Add New Position/Role</h4>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <input
                                type="text"
                                placeholder="New Position (e.g. Treasurer)"
                                value={newPosition}
                                onChange={e => setNewPosition(e.target.value)}
                                style={{ minWidth: 180 }}
                            />
                            <button className="button button-primary" style={{ width: 'auto' }} onClick={handleAddPosition}>Add Position</button>
                        </div>
                        {positionError && <p className="error">{positionError}</p>}
                    </div>
                </div>
            )}
            {currentSection === 'remove' && (
                <div className="admin-section">
                    <h3>Remove Candidate</h3>
                    {positions.map((position) => (
                        <div key={position} style={{ marginBottom: '20px' }}>
                            <h4>{position}</h4>
                            <div className="candidate-list">
                                {candidates.filter(c => c.position === position).map((candidate) => (
                                    <div key={candidate.id} className="candidate-item">
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            flex: 1,
                                            minWidth: 0
                                        }}>
                                            <img 
                                                src={candidate.image} 
                                                alt={`${candidate.name} profile`}
                                                loading="lazy"
                                            />
                                            <span style={{ 
                                                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                                                wordWrap: 'break-word',
                                                overflowWrap: 'break-word'
                                            }}>
                                                {candidate.name}
                                            </span>
                                        </div>
                                        <button
                                            className="button button-danger"
                                            onClick={() => removeCandidate(candidate.id)}
                                            style={{ 
                                                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                                                padding: '8px 12px'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                {candidates.filter(c => c.position === position).length === 0 && (
                                    <div style={{ 
                                        textAlign: 'center',
                                        padding: '20px',
                                        color: '#ccc',
                                        fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
                                    }}>
                                        No candidates for {position}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {currentSection === 'results' && (
                <div className="admin-section">
                    <h3>Results</h3>
                    {positions.map((position) => (
                        <div key={position} style={{ marginBottom: '30px' }}>
                            <h4>{position}</h4>
                            <div className="results-box">
                                <h5>Top Candidates</h5>
                                {getTopCandidates(position).length > 0 ? (
                                    getTopCandidates(position).map((candidate, index) => (
                                        <p key={candidate.id} style={{ 
                                            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                                            margin: '8px 0',
                                            padding: '8px',
                                            backgroundColor: index === 0 ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                                            borderRadius: '4px'
                                        }}>
                                            {index + 1}. {candidate.name} - {candidate.votes} vote{candidate.votes !== 1 ? 's' : ''}
                                        </p>
                                    ))
                                ) : (
                                    <p style={{ 
                                        color: '#ccc',
                                        fontStyle: 'italic',
                                        fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
                                    }}>
                                        No votes yet for {position}
                                    </p>
                                )}
                            </div>
                            <div className="results-box" style={{ marginTop: '15px' }}>
                                <h5>Vote Details</h5>
                                <pre style={{ 
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word',
                                    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                                    lineHeight: '1.4'
                                }}>
                                    {getVoteDetails(position) || `No detailed votes recorded for ${position}`}
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminPanel;