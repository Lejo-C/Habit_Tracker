import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyOtp = () => {
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || '');
    const [otp, setOtp] = useState('');
    const { verifyOtp } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await verifyOtp(email, otp);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Verification failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
            <div className="bg-[#121212] p-8 rounded-2xl border border-[#333] w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-2 text-center">Verify Email</h2>
                <p className="text-gray-400 text-center mb-6 text-sm">Enter the code sent to {email}</p>

                {error && <div className="bg-red-500/20 text-red-500 p-3 rounded-lg mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:outline-none focus:border-[#00FF66]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">OTP Code</label>
                        <input
                            type="text"
                            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:outline-none focus:border-[#00FF66] tracking-widest text-center text-xl font-mono"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength="6"
                            placeholder="000000"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-[#00FF66] text-black font-bold py-3 rounded-xl hover:bg-[#00cc52] transition-colors mt-4">
                        Verify Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
