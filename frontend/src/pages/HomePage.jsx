import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Server, Globe, Shield, Code } from 'lucide-react';
import NetworkMap from '../components/sections/NetworkMap';
import { Card, Badge } from '../components/ui/index';
import { useQuery } from '@tanstack/react-query';
import api from '../api/client';

const CATEGORY_ICONS = {
  'Infrastructure': <Server size={22} style={{ color: '#3FC1B0' }} />,
  'Domains & Email': <Globe size={22} style={{ color: '#E7A94B' }} />,
  'Security & Ops': <Shield size={22} style={{ color: '#3FC1B0' }} />,
  'Development': <Code size={22} style={{ color: '#E7A94B' }} />,
};

const WHY_US = [
  {
    icon: '📍',
    title: 'Based in South Sudan',
    desc: 'Local support, local context. We understand the connectivity challenges unique to South Sudan.',
  },
  {
    icon: '⚡',
    title: '99.9% Uptime SLA',
    desc: 'Enterprise-grade infrastructure with guaranteed uptime and 24/7 monitoring.',
  },
  {
    icon: '💬',
    title: 'Support in Your Language',
    desc: 'Our team speaks English, Arabic, and Juba Arabic — always available to help.',
  },
  {
    icon: '💰',
    title: 'Flexible Pricing',
    desc: 'Competitive USD pricing with flexible local payment options for South Sudanese businesses.',
  },
];

const CATEGORIES = [
  { key: 'Infrastructure', icon: <Server size={28} />, color: '#3FC1B0', desc: 'Web Hosting, VPS, Dedicated Servers, Cloud' },
  { key: 'Development', icon: <Code size={28} />, color: '#E7A94B', desc: 'Websites, Web Apps, Mobile Backends' },
  { key: 'Security & Ops', icon: <Shield size={28} />, color: '#3FC1B0', desc: 'SSL, DevOps, Cybersecurity, Server Management' },
  { key: 'Domains & Email', icon: <Globe size={28} />, color: '#E7A94B', desc: 'Domain Registration, Business Email' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ['services'],
    queryFn: () => api.get('/services').then(r => r.data.services),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '72px',
      }}>
        {/* Background gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 70% 50%, rgba(63,193,176,0.08) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(231,169,75,0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div className="container-site" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          paddingTop: '4rem',
          paddingBottom: '4rem',
        }}>
          {/* Left: copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={fadeUp}>
              <Badge color="teal" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
                🇸🇸 Based in Juba, South Sudan
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeUp} style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              color: '#F3EFE4',
            }}>
              Digital Infrastructure <br />
              <span className="gradient-text-gold">Built for South Sudan</span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontSize: '1.125rem',
              color: '#c8c3b7',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '480px',
            }}>
              Domain registration, web hosting, VPS, cloud services, website development, and cybersecurity — all from a team that understands your local business context.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/services" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.875rem 2rem', borderRadius: '0.625rem',
                background: 'linear-gradient(135deg, #E7A94B, #c8892e)',
                color: '#0B1E27', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '1rem', boxShadow: '0 0 30px rgba(231,169,75,0.3)',
                transition: 'all 0.25s',
              }}>
                Explore Services <ArrowRight size={18} />
              </Link>
              <Link to="/quote" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.875rem 2rem', borderRadius: '0.625rem',
                border: '1.5px solid rgba(63,193,176,0.4)',
                color: '#3FC1B0', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem',
              }}>
                Get a Quote
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem', flexWrap: 'wrap' }}>
              {[
                { value: '200+', label: 'Clients served' },
                { value: '99.9%', label: 'Uptime SLA' },
                { value: '24/7', label: 'Local support' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', color: '#E7A94B' }}>{value}</div>
                  <div style={{ fontSize: '0.85rem', color: '#c8c3b7' }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: NetworkMap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className="hidden-on-mobile"
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: '460px' }}>
              {/* Glow behind map */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                width: '300px', height: '300px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(63,193,176,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <NetworkMap style={{ width: '100%', height: 'auto' }} />
            </div>
          </motion.div>
        </div>

        <style>{`@media (max-width: 767px) { .hidden-on-mobile { display: none !important; } }`}</style>
        <style>{`
          @media (max-width: 767px) {
            section > div[class*="container"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ── Service Categories ─────────────────────────────────────── */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <Badge color="teal" style={{ marginBottom: '1rem', display: 'inline-block' }}>What We Offer</Badge>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, marginBottom: '1rem' }}>
              Everything your business needs <span className="gradient-text-teal">online</span>
            </h2>
            <p style={{ color: '#c8c3b7', maxWidth: '560px', margin: '0 auto', fontSize: '1.0625rem', lineHeight: 1.7 }}>
              From your first domain to complex cloud infrastructure — we cover the full stack.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {CATEGORIES.map(({ key, icon, color, desc }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/services?category=${encodeURIComponent(key)}`} style={{ textDecoration: 'none' }}>
                  <Card style={{ height: '100%', cursor: 'pointer' }}>
                    <div style={{
                      width: '52px', height: '52px', borderRadius: '14px',
                      background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                      border: `1px solid ${color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color, marginBottom: '1.25rem',
                    }}>
                      {icon}
                    </div>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#F3EFE4' }}>{key}</h3>
                    <p style={{ color: '#c8c3b7', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: '#3FC1B0', fontWeight: 600, fontSize: '0.9375rem',
              fontFamily: 'Inter, sans-serif',
            }}>
              View all 14 services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Junubi ─────────────────────────────────────────────── */}
      <section style={{ padding: '6rem 0', background: 'rgba(22,49,64,0.25)' }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <Badge color="gold" style={{ marginBottom: '1rem', display: 'inline-block' }}>Why Choose Us</Badge>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>
              The <span className="gradient-text-gold">local advantage</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {WHY_US.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.5rem', color: '#F3EFE4' }}>{title}</h3>
                  <p style={{ color: '#c8c3b7', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section style={{ padding: '7rem 0' }}>
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, rgba(22,49,64,0.8) 0%, rgba(29,61,79,0.6) 100%)',
              border: '1px solid rgba(231,169,75,0.2)',
              borderRadius: '1.5rem',
              padding: 'clamp(2.5rem, 5vw, 5rem)',
              textAlign: 'center',
              boxShadow: '0 0 60px rgba(231,169,75,0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative NetworkMap background */}
            <NetworkMap style={{
              position: 'absolute', right: '-5%', top: '-10%',
              width: '45%', opacity: 0.07, pointerEvents: 'none',
            }} />

            <Badge color="gold" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Ready to Start?</Badge>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, marginBottom: '1rem' }}>
              Get your business online <br /> <span className="gradient-text-gold">today</span>
            </h2>
            <p style={{ color: '#c8c3b7', maxWidth: '480px', margin: '0 auto 2.5rem', fontSize: '1.0625rem', lineHeight: 1.7 }}>
              Tell us what you need and we'll put together a custom proposal. No commitment required.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/quote" style={{
                padding: '0.875rem 2.5rem', borderRadius: '0.625rem',
                background: 'linear-gradient(135deg, #E7A94B, #c8892e)',
                color: '#0B1E27', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem',
                boxShadow: '0 0 30px rgba(231,169,75,0.35)',
              }}>
                Request a Quote
              </Link>
              <Link to="/contact" style={{
                padding: '0.875rem 2rem', borderRadius: '0.625rem',
                border: '1.5px solid rgba(63,193,176,0.4)',
                color: '#3FC1B0', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem',
              }}>
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
