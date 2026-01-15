import React from 'react';

const CircularProgress = ({ percentage, score }) => {
    const radius = 80;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg
                height={radius * 2}
                width={radius * 2}
                className="transform -rotate-90"
            >
                <circle
                    stroke="#1a1a1a"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="#00FF66"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(0,255,102,0.5)]"
                    fill="transparent"
                />
            </svg>
            <div className="absolute text-center">
                <span className="text-4xl font-bold text-white block">{score}</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Score</span>
            </div>
        </div>
    );
};

const BarChart = () => (
    <div className="flex items-end gap-3 h-48 w-full mt-6">
        {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                    className="w-full bg-[#1a1a1a] rounded-t-lg relative overflow-hidden group-hover:bg-[#1a1a1a]/80 transition-all"
                    style={{ height: '100%' }}
                >
                    <div
                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#00FF66] to-[#1DB954] transition-all duration-500 ease-out opacity-80 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(0,255,102,0.3)]"
                        style={{ height: `${h}%` }}
                    ></div>
                </div>
                <span className="text-xs text-gray-500">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
            </div>
        ))}
    </div>
)

const Analysis = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Productivity Analysis</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Productivity Score */}
                <div className="bg-[#121212] border border-[#222] rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-[#1a1a1a] text-[#00FF66] px-3 py-1 rounded-full text-xs font-bold border border-[#333]">Excellent</span>
                    </div>
                    <CircularProgress percentage={85} score={850} />
                    <p className="mt-6 text-gray-400 text-center text-sm">You are more productive than <span className="text-white font-bold">92%</span> of users this week.</p>
                </div>

                {/* Weekly Completion Chart */}
                <div className="bg-[#121212] border border-[#222] rounded-2xl p-6 lg:col-span-2">
                    <h3 className="text-lg font-bold text-white mb-1">Weekly Completion</h3>
                    <p className="text-xs text-gray-400">Habits completed vs scheduled</p>
                    <BarChart />
                </div>

                {/* Stats Grid */}
                <div className="bg-[#121212] border border-[#222] rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-[#1a1a1a]">
                            <span className="text-gray-400">Total Hours</span>
                            <span className="text-xl font-bold text-white">42.5h</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-[#1a1a1a]">
                            <span className="text-gray-400">Avg. Streak</span>
                            <span className="text-xl font-bold text-[#00FF66]">14 days</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Completion Rate</span>
                            <span className="text-xl font-bold text-white">88%</span>
                        </div>
                    </div>
                </div>

                {/* Focus Area */}
                <div className="bg-[#121212] border border-[#222] rounded-2xl p-6 lg:col-span-2">
                    <h3 className="text-lg font-bold text-white mb-4">Focus Distribution</h3>
                    <div className="space-y-3">
                        {[
                            { label: 'Health & Fitness', pct: 45, color: '#00FF66' },
                            { label: 'Learning', pct: 30, color: '#1DB954' },
                            { label: 'Mindfulness', pct: 25, color: '#00CC52' }
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-300">{item.label}</span>
                                    <span className="text-gray-400">{item.pct}%</span>
                                </div>
                                <div className="h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full"
                                        style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Analysis;
