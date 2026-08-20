import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: 'background 0.3s, backdrop-filter 0.3s, box-shadow 0.3s',
        background: scrolled ? 'rgba(11,30,39,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.3)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(63,193,176,0.1)' : 'none',
      }}
    >
      <nav className="container-site" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <Globe size={28} style={{ color: '#3FC1B0' }} />
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: '#F3EFE4' }}>
            Junubi<span style={{ color: '#E7A94B' }}>Tech</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}
            className="hidden-mobile">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.9375rem',
                  color: isActive ? '#E7A94B' : '#c8c3b7',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                })}
                onMouseEnter={e => e.target.style.color = '#F3EFE4'}
                onMouseLeave={e => { /* let NavLink handle */ }}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA + Auth */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }} className="hidden-mobile">
          {user ? (
            <>
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(63,193,176,0.4)',
                  color: '#3FC1B0',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  background: 'transparent',
                  border: '1px solid rgba(200,195,183,0.3)',
                  color: '#c8c3b7',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(63,193,176,0.4)',
                  color: '#3FC1B0',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Log in
              </Link>
              <Link
                to="/quote"
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '0.5rem',
                  background: 'linear-gradient(135deg, #E7A94B, #c8892e)',
                  color: '#0B1E27',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  fontFamily: 'Space Grotesk, sans-serif',
                  boxShadow: '0 0 20px rgba(231,169,75,0.3)',
                }}
              >
                Get a Quote
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#F3EFE4',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          className="show-mobile"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(11,30,39,0.98)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(63,193,176,0.15)',
              padding: '1rem 1.5rem 1.5rem',
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setOpen(false)}
                    style={({ isActive }) => ({
                      display: 'block',
                      padding: '0.75rem 0',
                      color: isActive ? '#E7A94B' : '#F3EFE4',
                      fontWeight: 500,
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                    })}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              <li style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {user ? (
                  <>
                    <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setOpen(false)}
                      style={{ padding: '0.625rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(63,193,176,0.4)', color: '#3FC1B0', fontWeight: 500 }}>
                      {user.role === 'admin' ? 'Admin' : 'Dashboard'}
                    </Link>
                    <button onClick={() => { handleLogout(); setOpen(false); }}
                      style={{ padding: '0.625rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(200,195,183,0.3)', color: '#c8c3b7', background: 'transparent', cursor: 'pointer' }}>
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)}
                      style={{ padding: '0.625rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(63,193,176,0.4)', color: '#3FC1B0', fontWeight: 500 }}>
                      Log in
                    </Link>
                    <Link to="/quote" onClick={() => setOpen(false)}
                      style={{ padding: '0.625rem 1.25rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #E7A94B, #c8892e)', color: '#0B1E27', fontWeight: 700 }}>
                      Get a Quote
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }
      `}</style>
    </header>
  );
}
