import React, { useState, useEffect } from 'react';
import { users } from './users';
import LoginPanel from './components/LoginPanel';
import UserPanel from './components/UserPanel';
import AdminPanel from './components/AdminPanel';
import './App.css';
import { db } from './firebase';
import { ref, onValue, set } from 'firebase/database';

function App() {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    // Load admin-added data that will be shown to all users
    const [candidates, setCandidates] = useState([]);
    const [positions, setPositions] = useState([]);
    const [votes, setVotes] = useState({});

    // Listen to Firebase data changes
    useEffect(() => {
        const candidatesRef = ref(db, 'candidates');
        const positionsRef = ref(db, 'positions');
        const votesRef = ref(db, 'votes');

        onValue(candidatesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setCandidates(data);
        });

        onValue(positionsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setPositions(data);
        });

        onValue(votesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setVotes(data);
        });
    }, []);
    const [loginError, setLoginError] = useState('');
    const [currentPositionIndex, setCurrentPositionIndex] = useState(0);

    // Save data to localStorage whenever it changes
    // Update Firebase when data changes
    useEffect(() => {
        if (candidates.length > 0) {
            set(ref(db, 'candidates'), candidates);
        }
    }, [candidates]);

    useEffect(() => {
        if (positions.length > 0) {
            set(ref(db, 'positions'), positions);
        }
    }, [positions]);

    useEffect(() => {
        if (Object.keys(votes).length > 0) {
            set(ref(db, 'votes'), votes);
        }
    }, [votes]);

    const handleLogin = (username, password) => {
        if (username === 'admin' && password === 'admin123') {
            setIsAdmin(true);
            setUser({ name: 'Admin' });
            setLoginError('');
        } else if (users[username] && users[username].password === password) {
            setUser(users[username]);
            setIsAdmin(false);
            setLoginError('');
        } else {
            setLoginError('Invalid username or password');
        }
    };

    const handleLogout = () => {
        setUser(null);
        setIsAdmin(false);
        setCurrentPositionIndex(0);
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Online Voting System</h1>
            {!user ? (
                <LoginPanel onLogin={handleLogin} loginError={loginError} />
            ) : isAdmin ? (
                <AdminPanel
                    candidates={candidates}
                    setCandidates={setCandidates}
                    votes={votes}
                    positions={positions}
                    setPositions={setPositions}
                    onLogout={handleLogout}
                />
            ) : (
                <UserPanel
                    user={user}
                    candidates={candidates}
                    votes={votes}
                    setVotes={setVotes}
                    positions={positions}
                    currentPositionIndex={currentPositionIndex}
                    setCurrentPositionIndex={setCurrentPositionIndex}
                    onLogout={handleLogout}
                />
            )}
        </div>
    );
}

export default App;