import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const SERVICES_LINKS = [
  { to: '/services/web-hosting', label: 'Web Hosting' },
  { to: '/services/vps-hosting', label: 'VPS Hosting' },
  { to: '/services/domain-registration', label: 'Domain Registration' },
  { to: '/services/website-development', label: 'Website Development' },
  { to: '/services/ssl-certificates', label: 'SSL Certificates' },
  { to: '/services/cybersecurity-services', label: 'Cybersecurity' },
];

const COMPANY_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
  { to: '/quote', label: 'Get a Quote' },
  { to: '/login', label: 'Client Portal' },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(11,30,39,0.95)',
      borderTop: '1px solid rgba(63,193,176,0.12)',
      marginTop: '5rem',
    }}>
      <div className="container-site" style={{ padding: '4rem 1.5rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand column */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', textDecoration: 'none' }}>
              <Globe size={24} style={{ color: '#3FC1B0' }} />
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: '#F3EFE4' }}>
                Junubi<span style={{ color: '#E7A94B' }}>Tech</span>
              </span>
            </Link>
            <p style={{ color: '#c8c3b7', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '260px' }}>
              Digital infrastructure for South Sudan — hosting, development, and cybersecurity from Juba to the world.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { label: 'X / Twitter', short: 'X', href: '#' },
                { label: 'LinkedIn', short: 'in', href: '#' },
                { label: 'GitHub', short: 'gh', href: '#' },
              ].map(({ label, short, href }) => (
                <a key={label} href={href} aria-label={label}
                  style={{
                    width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '8px', border: '1px solid rgba(63,193,176,0.25)',
                    color: '#3FC1B0', transition: 'all 0.2s',
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.75rem',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(63,193,176,0.15)'; e.currentTarget.style.borderColor = '#3FC1B0'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(63,193,176,0.25)'; }}
                >
                  {short}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#E7A94B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              Services
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {SERVICES_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} style={{ color: '#c8c3b7', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#F3EFE4'}
                    onMouseLeave={e => e.target.style.color = '#c8c3b7'}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#E7A94B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {COMPANY_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} style={{ color: '#c8c3b7', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#F3EFE4'}
                    onMouseLeave={e => e.target.style.color = '#c8c3b7'}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#E7A94B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              Contact
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { icon: <MapPin size={15} />, text: 'Juba, South Sudan' },
                { icon: <Mail size={15} />, text: 'hello@junubitech.com' },
                { icon: <Phone size={15} />, text: '+211 900 000 000' },
              ].map(({ icon, text }) => (
                <li key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', color: '#c8c3b7', fontSize: '0.9rem' }}>
                  <span style={{ color: '#3FC1B0', marginTop: '1px', flexShrink: 0 }}>{icon}</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: '#c8c3b7', fontSize: '0.85rem', margin: 0 }}>
            © {new Date().getFullYear()} Junubi Technologies Ltd. All rights reserved.
          </p>
          <p style={{ color: '#c8c3b7', fontSize: '0.85rem', margin: 0 }}>
            Built in 🇸🇸 South Sudan
          </p>
        </div>
      </div>
    </footer>
  );
}
