import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const {token,setToken, navigate,backendUrl} = useContext(ShopContext);
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');


  const onSubmitHandler = async (event)=> {
    event.preventDefault();
    try {
      // Client-side validation
      if (currentState === 'Sign Up' && !name.trim()) {
        toast.error('Name is required');
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error('Please enter a valid email');
        return;
      }
      if (!password || password.length < 8) {
        toast.error('Password must be at least 8 characters');
        return;
      }
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {name,email,password});
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else{
          toast.error(response.data.message)
        }
        
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {email,password});
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          
        } else{
          toast.error(response.data.message)
        }
        
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message);
      
    }

  }

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary)]/10 via-white to-[var(--secondary)]/10 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <h1 className="prata-regular text-3xl font-bold text-[var(--primary)]">{currentState}</h1>
              <div className="w-8 h-1 bg-[var(--primary)] rounded-full"></div>
            </div>
            <p className="text-[var(--muted)]">
              {currentState === 'Login' ? 'Welcome back! Please sign in to your account.' : 'Create your account to get started.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-6">
            {currentState === 'Sign Up' && (
              <div>
                <label className="block text-sm font-semibold text-[var(--text)] mb-2">Full Name</label>
                <input 
                  onChange={(e) => setName(e.target.value)} 
                  value={name} 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-[var(--primary)]/20 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all" 
                  placeholder="Enter your full name" 
                  required 
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-[var(--text)] mb-2">Email Address</label>
              <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                type="email" 
                className="w-full px-4 py-3 rounded-lg border border-[var(--primary)]/20 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all" 
                placeholder="Enter your email" 
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--text)] mb-2">Password</label>
              <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                type="password" 
                className="w-full px-4 py-3 rounded-lg border border-[var(--primary)]/20 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all" 
                placeholder="Enter your password" 
                required 
              />
            </div>

            {/* Action Links */}
            <div className="flex justify-between items-center text-sm">
              <button type="button" className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors">
                Forgot your password?
              </button>
              <button 
                type="button"
                onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
                className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors font-semibold"
              >
                {currentState === 'Login' ? 'Create an account' : 'Already have an account?'}
              </button>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-[var(--primary)] hover:bg-[var(--accent)] text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {currentState === 'Login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--primary)]/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[var(--muted)]">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[var(--primary)]/20 rounded-lg hover:bg-[var(--primary)]/5 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[var(--primary)]/20 rounded-lg hover:bg-[var(--primary)]/5 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
