import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Badge, Button, Input } from '../components/ui/index';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [apiError, setApiError] = useState('');
  const { login, register: registerUser, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const schema = mode === 'login' ? loginSchema : registerSchema;
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setApiError('');
    try {
      let user;
      if (mode === 'login') {
        user = await login(data.email, data.password);
      } else {
        user = await registerUser(data.name, data.email, data.password);
      }
      navigate(user.role === 'admin' ? '/admin' : from, { replace: true });
    } catch (err) {
      setApiError(err.response?.data?.error || 'Authentication failed. Please try again.');
    }
  };

  const switchMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login');
    setApiError('');
    reset();
  };

  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: '440px' }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '0.5rem' }}>
            <Globe size={28} style={{ color: '#3FC1B0' }} />
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#F3EFE4' }}>
              Junubi<span style={{ color: '#E7A94B' }}>Tech</span>
            </span>
          </Link>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.375rem', color: '#F3EFE4' }}>
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p style={{ color: '#c8c3b7', fontSize: '0.9rem' }}>
            {mode === 'login' ? 'Sign in to your client portal' : 'Join the Junubi Tech platform'}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          style={{
            background: 'rgba(22,49,64,0.6)',
            border: '1px solid rgba(63,193,176,0.15)',
            borderRadius: '1rem',
            padding: '2.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.125rem',
          }}
        >
          {mode === 'register' && (
            <Input id="auth-name" label="Full Name *" placeholder="Your name" error={errors.name?.message} {...register('name')} />
          )}
          <Input id="auth-email" label="Email Address *" type="email" placeholder="you@example.com" error={errors.email?.message} autoComplete="email" {...register('email')} />
          <Input id="auth-password" label="Password *" type="password" placeholder={mode === 'register' ? 'At least 8 characters' : 'Your password'} error={errors.password?.message} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} {...register('password')} />

          {apiError && (
            <div style={{ background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#fc8181', fontSize: '0.875rem' }}>
              {apiError}
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" loading={isSubmitting || loading} style={{ marginTop: '0.5rem' }}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>

          {/* Demo credentials hint */}
          {mode === 'login' && (
            <p style={{ fontSize: '0.78rem', color: '#c8c3b7', textAlign: 'center', margin: 0, fontFamily: 'JetBrains Mono, monospace' }}>
              Demo: admin@junubitech.com / password123
            </p>
          )}
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#c8c3b7', fontSize: '0.9rem' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={switchMode} style={{ background: 'none', border: 'none', color: '#3FC1B0', cursor: 'pointer', fontWeight: 600, padding: 0, fontSize: '0.9rem' }}>
            {mode === 'login' ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </main>
  );
}
