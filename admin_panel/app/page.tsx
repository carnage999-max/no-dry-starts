'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/dashboard');
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await apiClient.login(username, password);
      console.log('Login successful, token stored:', {
        hasToken: !!result.access,
        tokenLength: result.access?.length,
        tokenPreview: result.access?.substring(0, 50),
        storedToken: typeof window !== 'undefined' ? localStorage.getItem('token')?.substring(0, 50) : 'N/A',
      });
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-graphite-950)] to-[var(--color-graphite-900)] px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[var(--color-tiger-orange-500)] mb-2">
            NO DRY STARTS®
          </h1>
          <p className="text-[var(--color-white-300)] text-lg">Admin Panel</p>
        </div>

        <div className="bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-[var(--color-white-100)] mb-6">Sign In</h2>
          
          {error && (
            <div className="bg-red-900 bg-opacity-50 border border-red-700 text-red-200 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-[var(--color-graphite-900)] border border-[var(--color-graphite-600)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[var(--color-graphite-900)] border border-[var(--color-graphite-600)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-tiger-orange-500)] hover:bg-[var(--color-tiger-orange-600)] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] focus:ring-offset-2 focus:ring-offset-[var(--color-graphite-800)]"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-[var(--color-white-500)] text-sm mt-6">
          Authorized access only
        </p>
      </div>
    </div>
  );
}
