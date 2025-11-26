import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

const LoginPage = () => {
  const { login, register, loading, error } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', fullName: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await register(formData.fullName, formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
    } catch (err) {
      // Error is handled by context, but we catch here to prevent crash
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 mb-4 shadow-lg shadow-blue-200">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Hi Naveen</h2>
          <p className="text-gray-500 mt-2">
            {isRegistering ? 'Create your professional account' : 'Welcome back, please sign in'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-sm flex items-start animate-pulse">
            <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" /> 
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegistering && (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
              <input 
                name="fullName" 
                type="text" 
                required 
                placeholder="e.g. Alex Founder"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                onChange={handleChange} 
              />
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="you@company.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
              onChange={handleChange} 
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
              onChange={handleChange} 
            />
          </div>

          <Button disabled={loading} className="w-full mt-2">
            {loading ? 'Processing...' : (
              <span className="flex items-center justify-center gap-2">
                {isRegistering ? 'Create Account' : 'Sign In'} <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>
        
        {/* Toggle Mode */}
        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            {isRegistering ? 'Already have an account?' : "Don't have an account yet?"}
            <button 
              onClick={() => setIsRegistering(!isRegistering)} 
              className="ml-2 text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
            >
              {isRegistering ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;