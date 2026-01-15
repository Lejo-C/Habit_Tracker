import React, { useState } from 'react';

const Toggle = ({ enabled, onChange }) => (
    <div
        onClick={() => onChange(!enabled)}
        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${enabled ? 'bg-[#00FF66]' : 'bg-[#333]'}`}
    >
        <div className={`w-4 h-4 rounded-full bg-black shadow-md transform transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </div>
);

const SettingSection = ({ title, children }) => (
    <div className="bg-[#121212] border border-[#222] rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-bold text-white mb-4 border-b border-[#1a1a1a] pb-2">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const Profile = () => {
    const [emailNotif, setEmailNotif] = useState(true);
    const [pushNotif, setPushNotif] = useState(false);
    const [singleDevice, setSingleDevice] = useState(true);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Profile & Settings</h1>

            {/* User Header */}
            <div className="flex items-center gap-6 mb-10">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#333] to-[#111] border-2 border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.3)]"></div>
                    <div className="absolute bottom-0 right-0 bg-[#00FF66] text-black text-xs font-bold px-2 py-1 rounded-full border border-black">
                        LVL 12
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Neo Anderson</h2>
                    <p className="text-gray-400">Premium Member • Joined 2024</p>
                    <button className="mt-3 text-sm border border-[#333] bg-[#1a1a1a] text-white px-4 py-2 rounded-lg hover:border-[#00FF66] transition-colors">
                        Edit Profile
                    </button>
                </div>
            </div>

            <SettingSection title="Notifications">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-white font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-400">Receive weekly summaries and alerts.</p>
                    </div>
                    <Toggle enabled={emailNotif} onChange={setEmailNotif} />
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-white font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-400">Get instant reminders on your device.</p>
                    </div>
                    <Toggle enabled={pushNotif} onChange={setPushNotif} />
                </div>
            </SettingSection>

            <SettingSection title="Security">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-white font-medium">Single Device Login</p>
                        <p className="text-sm text-gray-400">Log out from other devices when signing in.</p>
                    </div>
                    <Toggle enabled={singleDevice} onChange={setSingleDevice} />
                </div>
                <div className="flex justify-between items-center pt-2">
                    <div>
                        <p className="text-white font-medium">Session Timeout</p>
                        <p className="text-sm text-gray-400">Auto-lock after period of inactivity.</p>
                    </div>
                    <select className="bg-[#1a1a1a] text-white border border-[#333] rounded-lg px-3 py-2 outline-none focus:border-[#00FF66]">
                        <option>15 minutes</option>
                        <option>1 hour</option>
                        <option>4 hours</option>
                    </select>
                </div>
            </SettingSection>

            <SettingSection title="Integrations">
                <div className="flex items-center gap-4">
                    <button className="flex-1 bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                        <span>G</span> Connect Google
                    </button>
                    <button className="flex-1 bg-[#1a1a1a] text-white border border-[#333] font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#222] transition-colors">
                        <span></span> Connect Apple
                    </button>
                </div>
            </SettingSection>

        </div>
    );
};

export default Profile;
