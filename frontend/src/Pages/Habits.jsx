import React, { useState } from 'react';

const HabitCard = ({ title, type, reward, schedule }) => (
    <div className="bg-[#121212] border border-[#222] rounded-xl p-5 hover:border-[#00FF66] transition-all cursor-pointer group">
        <div className="flex justify-between items-start mb-4">
            <div className="bg-[#1a1a1a] px-3 py-1 rounded-full text-xs text-[#00FF66] border border-[#333] uppercase tracking-wide font-bold">
                {type}
            </div>
            <div className="text-gray-500 group-hover:text-white transition-colors">
                ⋮
            </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <div className="flex justify-between items-end mt-4">
            <div className="text-sm text-gray-400">
                <p>Schedule: {schedule}</p>
            </div>
            <div className="flex items-center gap-1 text-[#00FF66] font-bold bg-[#00FF66]/10 px-2 py-1 rounded-lg">
                <span>+{reward}</span>
                <span className="text-xs">XP</span>
            </div>
        </div>
    </div>
);

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0D0D0D] border border-[#333] w-full max-w-md rounded-2xl p-6 shadow-[0_0_50px_rgba(0,255,102,0.1)] relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
                <h2 className="text-2xl font-bold text-white mb-6">Create New Habit</h2>

                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Habit Name</label>
                        <input type="text" className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:outline-none focus:border-[#00FF66]" placeholder="e.g. Read 30 mins" />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Type</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button type="button" className="bg-[#00FF66] text-black p-2 rounded-lg text-sm font-bold">Checklist</button>
                            <button type="button" className="bg-[#1a1a1a] text-gray-400 border border-[#333] p-2 rounded-lg text-sm hover:text-white">Done/Undone</button>
                            <button type="button" className="bg-[#1a1a1a] text-gray-400 border border-[#333] p-2 rounded-lg text-sm hover:text-white">Duration</button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Schedule</label>
                        <div className="flex justify-between">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <button key={i} type="button" className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${i < 5 ? 'bg-[#1a1a1a] text-white border border-[#333]' : 'bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]'}`}>
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="button" onClick={onClose} className="w-full bg-[#00FF66] text-black font-bold py-3 rounded-xl hover:bg-[#00cc52] hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] transition-all">
                            Create Habit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Habits = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Habit Management</h1>
                    <p className="text-gray-400 mt-1">Design your daily protocol.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#00FF66] text-black font-bold px-6 py-3 rounded-xl hover:bg-[#00cc52] shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all flex items-center gap-2"
                >
                    <span>+</span> New Habit
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <HabitCard title="Morning Routine" type="Checklist" reward={50} schedule="Daily" />
                <HabitCard title="Coding Practice" type="Duration" reward={100} schedule="Mon, Wed, Fri" />
                <HabitCard title="No Sugar" type="Done/Undone" reward={30} schedule="Daily" />
                <HabitCard title="Reading" type="Duration" reward={40} schedule="Daily" />
                <HabitCard title="Weekly Review" type="Checklist" reward={150} schedule="Sun" />
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Habits;
