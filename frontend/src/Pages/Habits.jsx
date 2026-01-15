import React, { useState, useEffect } from 'react';
import client from '../api/client';

const HabitCard = ({ id, title, type, reward, schedule, onDelete }) => (
    <div className="bg-[#121212] border border-[#222] rounded-xl p-5 hover:border-[#00FF66] transition-all cursor-pointer group relative">
        <button
            onClick={() => onDelete(id)}
            className="absolute top-2 right-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        >
            ✕
        </button>
        <div className="flex justify-between items-start mb-4">
            <div className="bg-[#1a1a1a] px-3 py-1 rounded-full text-xs text-[#00FF66] border border-[#333] uppercase tracking-wide font-bold">
                {type}
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

const Modal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        title: '',
        type: 'checklist', // checklist, done_undone, duration
        days: []
    });

    if (!isOpen) return null;

    const toggleDay = (dayIndex) => {
        const newDays = formData.days.includes(dayIndex)
            ? formData.days.filter(d => d !== dayIndex)
            : [...formData.days, dayIndex];
        setFormData({ ...formData, days: newDays });
    };

    const handleSubmit = () => {
        onAdd({
            title: formData.title,
            type: formData.type,
            scheduling: { days: formData.days } // Matches backend structure roughly
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0D0D0D] border border-[#333] w-full max-w-md rounded-2xl p-6 shadow-[0_0_50px_rgba(0,255,102,0.1)] relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
                <h2 className="text-2xl font-bold text-white mb-6">Create New Habit</h2>

                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Habit Name</label>
                        <input
                            type="text"
                            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:outline-none focus:border-[#00FF66]"
                            placeholder="e.g. Read 30 mins"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Type</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['checklist', 'done_undone', 'duration'].map(t => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: t })}
                                    className={`p-2 rounded-lg text-sm font-bold capitalize ${formData.type === t ? 'bg-[#00FF66] text-black' : 'bg-[#1a1a1a] text-gray-400 border border-[#333]'}`}
                                >
                                    {t.replace('_', '/')}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Schedule</label>
                        <div className="flex justify-between">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => toggleDay(i)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${formData.days.includes(i) ? 'bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]' : 'bg-[#1a1a1a] text-white border border-[#333]'}`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="button" onClick={handleSubmit} className="w-full bg-[#00FF66] text-black font-bold py-3 rounded-xl hover:bg-[#00cc52] hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] transition-all">
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
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHabits = async () => {
        try {
            const { data } = await client.get('/habits');
            setHabits(data);
        } catch (err) {
            console.error("Failed to fetch habits", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    const addHabit = async (habitData) => {
        try {
            await client.post('/habits', habitData);
            fetchHabits();
        } catch (err) {
            console.error("Failed to add habit", err);
        }
    };

    const deleteHabit = async (id) => {
        if (!window.confirm("Delete this habit?")) return;
        try {
            await client.delete(`/habits/${id}`);
            fetchHabits();
        } catch (err) {
            console.error("Failed to delete habit", err);
        }
    };

    if (loading) return <div className="p-8 text-white">Loading habits...</div>;

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
                {habits.map(habit => (
                    <HabitCard
                        key={habit._id}
                        id={habit._id}
                        title={habit.title}
                        type={habit.type}
                        reward={habit.reward?.xp || 10}
                        schedule={habit.schedule?.days?.length > 0 ? habit.schedule.days.map(d => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][d]).join(', ') : 'Daily'}
                        onDelete={deleteHabit}
                    />
                ))}
                {habits.length === 0 && <p className="col-span-3 text-gray-500 text-center py-10">No habits found. Create your first one!</p>}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addHabit} />
        </div>
    );
};

export default Habits;
