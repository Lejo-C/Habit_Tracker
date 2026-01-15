import React from 'react';

const Card = ({ children, className = "" }) => (
    <div className={`bg-[#121212] border border-[#222] rounded-2xl p-6 hover:border-[#00FF66] transition-colors duration-300 ${className}`}>
        {children}
    </div>
);

const ProgressBar = ({ progress }) => (
    <div className="h-2 w-full bg-[#222] rounded-full overflow-hidden mt-2">
        <div
            className="h-full bg-gradient-to-r from-[#00FF66] to-[#1DB954] shadow-[0_0_10px_rgba(0,255,102,0.5)]"
            style={{ width: `${progress}%` }}
        ></div>
    </div>
);

const HabitItem = ({ title, streak, type }) => (
    <div className="flex items-center justify-between bg-[#0e0e0e] p-4 rounded-xl border border-[#1a1a1a] mb-3 group hover:border-[#00FF66] transition-all cursor-pointer">
        <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${streak > 5 ? 'bg-[#00FF66] shadow-[0_0_8px_#00FF66]' : 'bg-gray-600'}`}></div>
            <div>
                <h3 className="font-semibold text-white group-hover:text-[#00FF66] transition-colors">{title}</h3>
                <p className="text-xs text-gray-500">{type} • {streak} day streak</p>
            </div>
        </div>
        <div className="text-gray-400 group-hover:text-white">
            <button className="w-8 h-8 rounded-full border border-gray-700 hover:bg-[#00FF66] hover:text-black hover:border-[#00FF66] flex items-center justify-center transition-all">
                ✓
            </button>
        </div>
    </div>
);

const LeaderboardItem = ({ rank, name, score, isTop }) => (
    <div className={`flex items-center justify-between p-3 rounded-lg mb-2 ${isTop ? 'bg-[#1a1a1a] border border-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.1)]' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3">
            <span className={`font-bold w-6 text-center ${rank === 1 ? 'text-[#00FF66]' : 'text-gray-400'}`}>#{rank}</span>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                <span className="text-sm font-medium">{name}</span>
            </div>
        </div>
        <span className="text-[#00FF66] text-sm font-bold">{score} XP</span>
    </div>
);

const Dashboard = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Neo! 👋</h1>
                    <p className="text-gray-400">You're on a <span className="text-[#00FF66]">12 day streak</span>. Keep it up!</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Bounty Balance</p>
                    <div className="text-3xl font-bold text-[#00FF66] flex items-center justify-end gap-2 drop-shadow-[0_0_5px_rgba(0,255,102,0.3)]">
                        2,450 <span className="text-xl">🪙</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4">
                        <Card className="flex flex-col justify-between">
                            <span className="text-gray-400 text-sm">Today's Focus</span>
                            <div className="mt-2">
                                <span className="text-3xl font-bold text-white">4/7</span>
                                <ProgressBar progress={57} />
                            </div>
                        </Card>
                        <Card className="flex flex-col justify-between">
                            <span className="text-gray-400 text-sm">Total XP</span>
                            <div className="mt-2">
                                <span className="text-3xl font-bold text-white">12.5k</span>
                                <p className="text-xs text-[#00FF66] mt-1">+1.2k this week</p>
                            </div>
                        </Card>
                        <Card className="flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#00FF66] rounded-full blur-[50px] opacity-20"></div>
                            <span className="text-gray-400 text-sm">Next Reward</span>
                            <div className="mt-2">
                                <span className="text-xl font-bold text-white">Cyber Truck</span>
                                <p className="text-xs text-gray-500 mt-1">200 coins away</p>
                            </div>
                        </Card>
                    </div>

                    {/* Today's Habits */}
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">Today's Protocol</h2>
                        <div className="space-y-1">
                            <HabitItem title="Morning Meditation" streak={12} type="15 min" />
                            <HabitItem title="Learn React" streak={4} type="Done/Undone" />
                            <HabitItem title="Gym Session" streak={21} type="Checklist" />
                            <HabitItem title="Drink Water" streak={45} type="Checklist" />
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    {/* Weekly Leaderboard */}
                    <Card>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            🏆 Leaderboard
                            <span className="text-xs bg-[#1a1a1a] text-[#00FF66] px-2 py-1 rounded border border-[#333]">Weekly</span>
                        </h3>
                        <div className="mt-4">
                            <LeaderboardItem rank={1} name="Alice" score={4200} isTop={true} />
                            <LeaderboardItem rank={2} name="Bob" score={3850} isTop={true} />
                            <LeaderboardItem rank={3} name="Charlie" score={3100} isTop={true} />
                            <LeaderboardItem rank={4} name="You" score={2450} isTop={false} />
                        </div>
                    </Card>

                    {/* Mini Character */}
                    <div className="bg-[#121212] rounded-2xl p-6 border border-[#222] relative overflow-hidden flex flex-col items-center text-center">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00FF66]/10 to-transparent"></div>

                        {/* Simple CSS Mascot Representation */}
                        <div className="w-24 h-24 relative mb-4 animate-bounce">
                            <div className="w-full h-full bg-[#00FF66] rounded-full blur-[20px] opacity-20 absolute top-0 left-0"></div>
                            <div className="w-16 h-16 bg-[#00FF66] rounded-full mx-auto relative z-10 flex items-center justify-center shadow-[0_0_20px_#00FF66]">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <div className="w-20 h-2 bg-black/50 rounded-full mx-auto mt-4 blur-sm"></div>
                        </div>

                        <p className="text-white font-bold relative z-10">"Great job on the streak!"</p>
                        <p className="text-xs text-gray-400 mt-1 relative z-10">Level 5 Companion</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
