import React from 'react';
import { motion } from 'framer-motion';
import { Badge, Card } from '../components/ui/index';
import NetworkMap from '../components/sections/NetworkMap';

const TEAM = [
  { name: 'James Lado', role: 'Co-Founder & CEO', bio: 'Systems engineer with 12 years of experience in East African telecoms.' },
  { name: 'Ayen Deng', role: 'Co-Founder & CTO', bio: 'Full-stack developer and open-source contributor. Passionate about local tech capacity building.' },
  { name: 'Emmanuel Taban', role: 'Head of Operations', bio: 'Keeps the infrastructure running and the clients happy from our Juba offices.' },
];

const VALUES = [
  { icon: '🌍', title: 'Local First', desc: 'We hire locally, invest locally, and price our services with South Sudanese businesses in mind.' },
  { icon: '🔒', title: 'Trust & Reliability', desc: 'Your business depends on us being up. We take that responsibility seriously — 99.9% SLA, always.' },
  { icon: '🤝', title: 'Partnership', desc: 'We see ourselves as long-term partners, not vendors. Your growth is our growth.' },
  { icon: '📚', title: 'Community', desc: 'We invest in training programs, workshops, and partnerships with local universities.' },
];

export default function AboutPage() {
  return (
    <main style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <section style={{ padding: '6rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 80% 50%, rgba(63,193,176,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div className="container-site" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Badge color="teal" style={{ display: 'inline-block', marginBottom: '1rem' }}>Our Story</Badge>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, marginBottom: '1.5rem', color: '#F3EFE4' }}>
              Building digital infrastructure <span className="gradient-text-gold">for South Sudan</span>
            </h1>
            <p style={{ color: '#c8c3b7', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              <strong style={{ color: '#F3EFE4' }}>"Junubi"</strong> means "of the South" in Arabic — and that meaning is at the heart of everything we do. South Sudan is one of the youngest nations on Earth, full of energy and ambition. But the digital infrastructure to support that potential has lagged behind.
            </p>
            <p style={{ color: '#c8c3b7', fontSize: '1.05rem', lineHeight: 1.8 }}>
              We started Junubi Technologies to change that — by building genuine local capacity, hiring locally, and pricing our services with South Sudanese businesses in mind.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <NetworkMap style={{ width: '100%', maxWidth: '380px' }} />
          </motion.div>
        </div>
        <style>{`@media (max-width: 767px) { section > div[class*="container"] { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Mission */}
      <section style={{ padding: '4rem 0', background: 'rgba(22,49,64,0.3)' }}>
        <div className="container-site" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <Badge color="gold" style={{ display: 'inline-block', marginBottom: '1rem' }}>Our Mission</Badge>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, marginBottom: '1.5rem' }}>
            Connectivity is infrastructure
          </h2>
          <p style={{ color: '#c8c3b7', fontSize: '1.0625rem', lineHeight: 1.8 }}>
            We believe that digital connectivity is as essential as roads and power. Every business we host, every domain we register, and every developer we train brings South Sudan one step closer to full participation in the global digital economy.
          </p>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container-site">
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textAlign: 'center', marginBottom: '3rem' }}>
            What we stand for
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {VALUES.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
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

      {/* Team */}
      <section style={{ padding: '5rem 0 6rem', background: 'rgba(22,49,64,0.2)' }}>
        <div className="container-site">
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textAlign: 'center', marginBottom: '3rem' }}>
            Meet the team
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {TEAM.map(({ name, role, bio }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(63,193,176,0.3), rgba(231,169,75,0.2))',
                    border: '2px solid rgba(63,193,176,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    fontSize: '1.75rem',
                  }}>
                    {name.charAt(0)}
                  </div>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.25rem', color: '#F3EFE4' }}>{name}</h3>
                  <p style={{ color: '#E7A94B', fontSize: '0.85rem', marginBottom: '0.875rem', fontWeight: 500 }}>{role}</p>
                  <p style={{ color: '#c8c3b7', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{bio}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
