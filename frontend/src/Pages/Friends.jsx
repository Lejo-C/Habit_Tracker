import React, { useEffect, useState } from 'react';
import client from '../api/client';

const FriendCard = ({ name, rank, streak, isOnline, onAdd }) => (
    <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-[#222] hover:border-[#00FF66] transition-colors group">
        <div className="flex items-center gap-4">
            <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center font-bold text-white">
                    {name ? name.charAt(0).toUpperCase() : '?'}
                </div>
                {isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00FF66] border-2 border-[#1a1a1a] rounded-full"></div>}
            </div>
            <div>
                <h4 className="text-white font-bold group-hover:text-[#00FF66] transition-colors">{name}</h4>
                <p className="text-xs text-gray-400">Lvl. {rank}</p>
            </div>
        </div>
        <div className="text-right flex items-center gap-3">
            <div>
                <p className="text-[#00FF66] font-bold">{streak} 🔥</p>
                <p className="text-xs text-gray-500">Streak</p>
            </div>
            {onAdd && (
                <button onClick={onAdd} className="text-xs bg-[#00FF66] text-black px-2 py-1 rounded font-bold hover:bg-white">
                    Add
                </button>
            )}
        </div>
    </div>
);

const Friends = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Check backend connection first - if users endpoint exists? 
        // We are using /leaderboard as a proxy for 'all users' since we don't have a 'search users' route yet.
        client.get('/leaderboard').then(res => setUsers(res.data)).catch(console.error);
    }, []);

    const handleAdd = (id) => {
        client.post(`/users/friends/${id}`).then(() => alert("Friend Added!")).catch(err => alert(err.response?.data?.message || "Error"));
    };

    return (
        <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Feed */}
            <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-white mb-6">Social Feed</h1>
                <div className="bg-[#121212] border border-[#222] rounded-2xl p-8 text-center text-gray-500">
                    Coming Soon: See your friends' activity here!
                </div>
            </div>

            {/* Sidebar Friends List */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Community (Leaderboard)</h2>
                </div>
                <div className="space-y-3">
                    {users.length === 0 && <p className="text-gray-500">No users found.</p>}
                    {users.map((u) => (
                        <FriendCard
                            key={u._id}
                            name={u.username}
                            rank={u.level || 1}
                            streak={u.streak || 0}
                            isOnline={true}
                            onAdd={() => handleAdd(u._id)}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Friends;
