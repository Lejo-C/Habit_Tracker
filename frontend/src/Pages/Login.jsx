import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            if (err.response?.data?.message?.includes('verified')) {
                // If not verified, maybe redirect to OTP (would need to pass email)
                // For simplicity, just showing error. User can go to Verify link manually if we added one, 
                // or we can auto-redirect.
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
            <div className="bg-[#121212] p-8 rounded-2xl border border-[#333] w-full max-w-md">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
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
                        <label className="block text-gray-400 text-sm mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:outline-none focus:border-[#00FF66]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-[#00FF66] text-black font-bold py-3 rounded-xl hover:bg-[#00cc52] transition-colors mt-4">
                        Login
                    </button>
                </form>

                <p className="text-gray-400 text-center mt-6 text-sm">
                    Don't have an account? <Link to="/register" className="text-[#00FF66] hover:underline">Register</Link>
                </p>
                <p className="text-gray-500 text-center mt-2 text-xs">
                    Need to verify? <Link to="/verify-otp" className="text-gray-400 hover:text-white">Enter OTP</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
