import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import api from '../api/client';
import { Badge, Skeleton } from '../components/ui/index';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['service', slug],
    queryFn: () => api.get(`/services/${slug}`).then(r => r.data.service),
  });

  if (isLoading) {
    return (
      <main style={{ paddingTop: '120px' }}>
        <div className="container-site" style={{ maxWidth: '760px', paddingBottom: '5rem' }}>
          <Skeleton height="1rem" width="120px" style={{ marginBottom: '2rem' }} />
          <Skeleton height="2.5rem" width="70%" style={{ marginBottom: '1rem' }} />
          <Skeleton height="1rem" style={{ marginBottom: '0.5rem' }} />
          <Skeleton height="1rem" style={{ marginBottom: '0.5rem' }} />
          <Skeleton height="1rem" width="80%" />
        </div>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main style={{ paddingTop: '120px', textAlign: 'center', padding: '8rem 1.5rem' }}>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F3EFE4', marginBottom: '1rem' }}>Service Not Found</h1>
        <Link to="/services" style={{ color: '#3FC1B0' }}>← Back to all services</Link>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: '72px' }}>
      <div className="container-site" style={{ paddingTop: '4rem', paddingBottom: '6rem', maxWidth: '800px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/services" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            color: '#c8c3b7', fontSize: '0.9rem', marginBottom: '2rem',
            transition: 'color 0.2s',
          }}>
            <ArrowLeft size={15} /> Back to services
          </Link>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <Badge color="teal">{data.category}</Badge>
            {data.price_tier && (
              <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#E7A94B', fontSize: '0.9rem' }}>
                {data.price_tier}
              </span>
            )}
          </div>

          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '1.5rem', color: '#F3EFE4' }}>
            {data.name}
          </h1>

          <div style={{
            background: 'rgba(22,49,64,0.5)',
            border: '1px solid rgba(63,193,176,0.15)',
            borderRadius: '1rem',
            padding: '2rem',
            marginBottom: '2.5rem',
          }}>
            <p style={{ color: '#c8c3b7', fontSize: '1.0625rem', lineHeight: 1.8, margin: 0 }}>
              {data.description}
            </p>
          </div>

          {/* Features placeholder */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.375rem', fontWeight: 600, marginBottom: '1.25rem', color: '#F3EFE4' }}>
              What's included
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                '99.9% uptime SLA with transparent status page',
                '24/7 support from our Juba-based team',
                'Free migration assistance',
                'Regular backups and security monitoring',
                'Flexible billing and local payment options',
              ].map(item => (
                <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: '#c8c3b7', fontSize: '0.95rem' }}>
                  <CheckCircle size={18} style={{ color: '#3FC1B0', flexShrink: 0, marginTop: '1px' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/quote" style={{
              padding: '0.875rem 2rem', borderRadius: '0.625rem',
              background: 'linear-gradient(135deg, #E7A94B, #c8892e)',
              color: '#0B1E27', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem',
              boxShadow: '0 0 24px rgba(231,169,75,0.3)',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            }}>
              Get a Quote <ArrowRight size={17} />
            </Link>
            <Link to="/contact" style={{
              padding: '0.875rem 1.5rem', borderRadius: '0.625rem',
              border: '1.5px solid rgba(63,193,176,0.4)',
              color: '#3FC1B0', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem',
            }}>
              Ask a Question
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
