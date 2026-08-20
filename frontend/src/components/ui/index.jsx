import React from 'react';

export function Button({ children, variant = 'primary', size = 'md', disabled, loading, type = 'button', onClick, style = {}, ...props }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, cursor: disabled || loading ? 'not-allowed' : 'pointer',
    border: 'none', borderRadius: '0.625rem', transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
    textDecoration: 'none', opacity: disabled || loading ? 0.6 : 1, whiteSpace: 'nowrap',
  };
  const sizes = {
    sm: { padding: '0.4rem 0.875rem', fontSize: '0.85rem' },
    md: { padding: '0.625rem 1.25rem', fontSize: '0.9375rem' },
    lg: { padding: '0.875rem 2rem', fontSize: '1.0625rem' },
  };
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #E7A94B 0%, #c8892e 100%)',
      color: '#0B1E27',
      boxShadow: '0 0 24px rgba(231,169,75,0.3)',
    },
    secondary: {
      background: 'transparent',
      border: '1.5px solid rgba(63,193,176,0.5)',
      color: '#3FC1B0',
    },
    ghost: {
      background: 'transparent',
      color: '#c8c3b7',
    },
    danger: {
      background: 'linear-gradient(135deg, #e53e3e, #c53030)',
      color: '#fff',
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      {...props}
    >
      {loading && (
        <span style={{
          width: '16px', height: '16px', borderRadius: '50%',
          border: '2px solid currentColor', borderTopColor: 'transparent',
          animation: 'spin 0.7s linear infinite', display: 'inline-block',
        }} />
      )}
      {children}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}

export function Badge({ children, color = 'teal' }) {
  const colors = {
    teal: { background: 'rgba(63,193,176,0.15)', color: '#3FC1B0', border: '1px solid rgba(63,193,176,0.3)' },
    gold: { background: 'rgba(231,169,75,0.15)', color: '#E7A94B', border: '1px solid rgba(231,169,75,0.3)' },
    red:  { background: 'rgba(229,62,62,0.15)', color: '#fc8181', border: '1px solid rgba(229,62,62,0.3)' },
    gray: { background: 'rgba(200,195,183,0.1)', color: '#c8c3b7', border: '1px solid rgba(200,195,183,0.2)' },
    green:{ background: 'rgba(72,187,120,0.15)', color: '#68d391', border: '1px solid rgba(72,187,120,0.3)' },
  };
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.2rem 0.625rem',
      borderRadius: '999px',
      fontSize: '0.75rem',
      fontWeight: 600,
      fontFamily: 'Inter, sans-serif',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      ...colors[color],
    }}>
      {children}
    </span>
  );
}

export function Card({ children, style = {}, className = '', ...props }) {
  return (
    <div className={`glass-card hover-glow-teal ${className}`} style={{ padding: '1.75rem', ...style }} {...props}>
      {children}
    </div>
  );
}

export function Input({ label, id, error, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      {label && (
        <label htmlFor={id} style={{ fontSize: '0.875rem', fontWeight: 500, color: '#c8c3b7', fontFamily: 'Inter, sans-serif' }}>
          {label}
        </label>
      )}
      <input
        id={id}
        style={{
          background: 'rgba(22,49,64,0.6)',
          border: error ? '1.5px solid #fc8181' : '1.5px solid rgba(63,193,176,0.2)',
          borderRadius: '0.5rem',
          padding: '0.625rem 0.875rem',
          color: '#F3EFE4',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9375rem',
          outline: 'none',
          transition: 'border-color 0.2s',
          width: '100%',
        }}
        onFocus={e => { if (!error) e.target.style.borderColor = '#3FC1B0'; }}
        onBlur={e => { if (!error) e.target.style.borderColor = 'rgba(63,193,176,0.2)'; }}
        {...props}
      />
      {error && <p style={{ color: '#fc8181', fontSize: '0.8rem', margin: 0, fontFamily: 'Inter, sans-serif' }}>{error}</p>}
    </div>
  );
}

export function Textarea({ label, id, error, rows = 5, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      {label && (
        <label htmlFor={id} style={{ fontSize: '0.875rem', fontWeight: 500, color: '#c8c3b7', fontFamily: 'Inter, sans-serif' }}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        style={{
          background: 'rgba(22,49,64,0.6)',
          border: error ? '1.5px solid #fc8181' : '1.5px solid rgba(63,193,176,0.2)',
          borderRadius: '0.5rem',
          padding: '0.625rem 0.875rem',
          color: '#F3EFE4',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9375rem',
          outline: 'none',
          resize: 'vertical',
          transition: 'border-color 0.2s',
          width: '100%',
        }}
        onFocus={e => { if (!error) e.target.style.borderColor = '#3FC1B0'; }}
        onBlur={e => { if (!error) e.target.style.borderColor = 'rgba(63,193,176,0.2)'; }}
        {...props}
      />
      {error && <p style={{ color: '#fc8181', fontSize: '0.8rem', margin: 0, fontFamily: 'Inter, sans-serif' }}>{error}</p>}
    </div>
  );
}

export function Select({ label, id, error, children, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      {label && (
        <label htmlFor={id} style={{ fontSize: '0.875rem', fontWeight: 500, color: '#c8c3b7', fontFamily: 'Inter, sans-serif' }}>
          {label}
        </label>
      )}
      <select
        id={id}
        style={{
          background: 'rgba(22,49,64,0.6)',
          border: error ? '1.5px solid #fc8181' : '1.5px solid rgba(63,193,176,0.2)',
          borderRadius: '0.5rem',
          padding: '0.625rem 0.875rem',
          color: '#F3EFE4',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9375rem',
          outline: 'none',
          width: '100%',
          cursor: 'pointer',
        }}
        {...props}
      >
        {children}
      </select>
      {error && <p style={{ color: '#fc8181', fontSize: '0.8rem', margin: 0, fontFamily: 'Inter, sans-serif' }}>{error}</p>}
    </div>
  );
}

export function Skeleton({ width = '100%', height = '1.25rem', style = {} }) {
  return (
    <div style={{
      width, height,
      borderRadius: '0.5rem',
      background: 'linear-gradient(90deg, rgba(22,49,64,0.6) 25%, rgba(29,61,79,0.8) 50%, rgba(22,49,64,0.6) 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      ...style,
    }}>
      <style>{`@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`}</style>
    </div>
  );
}

export function EmptyState({ icon, title, description, action }) {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#c8c3b7' }}>
      {icon && <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>}
      <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#F3EFE4', marginBottom: '0.5rem' }}>{title}</h3>
      {description && <p style={{ maxWidth: '360px', margin: '0 auto 1.5rem' }}>{description}</p>}
      {action}
    </div>
  );
}
