import React from 'react';

const FriendCard = ({ name, rank, streak, isOnline }) => (
    <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-[#222] hover:border-[#00FF66] transition-colors group">
        <div className="flex items-center gap-4">
            <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-600"></div>
                {isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00FF66] border-2 border-[#1a1a1a] rounded-full"></div>}
            </div>
            <div>
                <h4 className="text-white font-bold group-hover:text-[#00FF66] transition-colors">{name}</h4>
                <p className="text-xs text-gray-400">Rank #{rank}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-[#00FF66] font-bold">{streak} 🔥</p>
            <p className="text-xs text-gray-500">Streak</p>
        </div>
    </div>
);

const Post = ({ user, time, content, likes }) => (
    <div className="bg-[#121212] border border-[#222] rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gray-700"></div>
            <div>
                <p className="text-white font-bold text-sm">{user}</p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </div>
        <p className="text-gray-300 mb-4">{content}</p>
        <div className="flex gap-4 text-gray-400 text-sm">
            <button className="flex items-center gap-1 hover:text-[#00FF66] transition-colors">
                <span>♥</span> {likes} Likes
            </button>
            <button className="flex items-center gap-1 hover:text-white transition-colors">
                <span>💬</span> Comment
            </button>
        </div>
    </div>
)

const Friends = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Feed */}
            <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-white mb-6">Social Feed</h1>

                {/* Post Input */}
                <div className="bg-[#121212] border border-[#222] rounded-2xl p-4 mb-8 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-700 shrink-0"></div>
                    <div className="flex-grow">
                        <input
                            type="text"
                            placeholder="Share your progress..."
                            className="w-full bg-transparent text-white outline-none placeholder-gray-500 py-2"
                        />
                        <div className="flex justify-end mt-2">
                            <button className="bg-[#00FF66] text-black font-bold px-4 py-1.5 rounded-lg text-sm hover:bg-[#00cc52]">Post</button>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <Post user="Alice" time="2 hours ago" content="Just hit a 30-day meditation streak! 🧘‍♀️ Feeling amazing." likes={24} />
                    <Post user="Bob" time="5 hours ago" content="Finished 5 chapters of my book today. Reading challenge is on! 📚" likes={12} />
                    <Post user="Charlie" time="1 day ago" content="Gym time! Who's with me? 💪" likes={45} />
                </div>
            </div>

            {/* Sidebar Friends List */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Friends</h2>
                    <button className="text-[#00FF66] text-sm hover:underline">Find Friends</button>
                </div>
                <div className="space-y-3">
                    <FriendCard name="Alice" rank={12} streak={30} isOnline={true} />
                    <FriendCard name="Bob" rank={45} streak={5} isOnline={false} />
                    <FriendCard name="Charlie" rank={8} streak={12} isOnline={true} />
                    <FriendCard name="Dave" rank={60} streak={2} isOnline={false} />
                </div>

                <div className="mt-8 p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0D0D0D] border border-[#222] rounded-2xl text-center">
                    <h3 className="text-white font-bold mb-2">Invite Friends</h3>
                    <p className="text-xs text-gray-400 mb-4">Earn 500 coins for every friend who joins!</p>
                    <button className="w-full border border-[#00FF66] text-[#00FF66] py-2 rounded-xl text-sm font-bold hover:bg-[#00FF66] hover:text-black transition-all">
                        Copy Invite Link
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Friends;
