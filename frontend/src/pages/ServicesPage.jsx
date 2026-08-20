import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import { Badge, Card, Skeleton } from '../components/ui/index';

const CATEGORY_COLORS = {
  'Infrastructure': '#3FC1B0',
  'Domains & Email': '#E7A94B',
  'Security & Ops': '#3FC1B0',
  'Development': '#E7A94B',
};

const CATEGORY_BADGE = {
  'Infrastructure': 'teal',
  'Domains & Email': 'gold',
  'Security & Ops': 'teal',
  'Development': 'gold',
};

export default function ServicesPage() {
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(categoryFilter);

  const { data, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => api.get('/services').then(r => r.data.services),
  });

  const categories = ['All', ...new Set((data || []).map(s => s.category))];

  const filtered = (data || []).filter(s => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main style={{ paddingTop: '72px' }}>
      {/* Header */}
      <section style={{ padding: '5rem 0 3rem', background: 'rgba(22,49,64,0.2)' }}>
        <div className="container-site" style={{ textAlign: 'center' }}>
          <Badge color="teal" style={{ display: 'inline-block', marginBottom: '1rem' }}>Our Services</Badge>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, marginBottom: '1rem' }}>
            Everything you need to <span className="gradient-text-gold">go digital</span>
          </h1>
          <p style={{ color: '#c8c3b7', maxWidth: '560px', margin: '0 auto 2.5rem', fontSize: '1.0625rem', lineHeight: 1.7 }}>
            14 services across infrastructure, development, security, and domains — built for South Sudan businesses.
          </p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#c8c3b7', pointerEvents: 'none' }} />
            <input
              type="search"
              placeholder="Search services..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search services"
              style={{
                width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem',
                background: 'rgba(22,49,64,0.6)', border: '1.5px solid rgba(63,193,176,0.2)',
                borderRadius: '0.625rem', color: '#F3EFE4', fontFamily: 'Inter, sans-serif',
                fontSize: '0.9375rem', outline: 'none',
              }}
            />
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <section style={{ padding: '2rem 0 0' }}>
        <div className="container-site">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.4rem 1rem', borderRadius: '999px',
                  border: `1.5px solid ${activeCategory === cat ? '#3FC1B0' : 'rgba(63,193,176,0.2)'}`,
                  background: activeCategory === cat ? 'rgba(63,193,176,0.15)' : 'transparent',
                  color: activeCategory === cat ? '#3FC1B0' : '#c8c3b7',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="glass-card" style={{ padding: '1.75rem' }}>
                  <Skeleton height="1rem" width="60%" style={{ marginBottom: '0.75rem' }} />
                  <Skeleton height="0.875rem" style={{ marginBottom: '0.5rem' }} />
                  <Skeleton height="0.875rem" width="80%" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#c8c3b7' }}>
              <p style={{ fontSize: '1.1rem' }}>No services found matching "{search}"</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', paddingBottom: '5rem' }}>
              {filtered.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link to={`/services/${service.slug}`} style={{ textDecoration: 'none' }}>
                    <Card style={{ height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                        <Badge color={CATEGORY_BADGE[service.category] || 'teal'}>{service.category}</Badge>
                        {service.price_tier && (
                          <span style={{ fontSize: '0.8rem', color: '#E7A94B', fontFamily: 'JetBrains Mono, monospace', fontWeight: 500 }}>
                            {service.price_tier}
                          </span>
                        )}
                      </div>
                      <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: '#F3EFE4' }}>
                        {service.name}
                      </h2>
                      <p style={{ color: '#c8c3b7', fontSize: '0.9rem', lineHeight: 1.65, margin: 0, flex: 1 }}>
                        {service.description.substring(0, 130)}{service.description.length > 130 ? '…' : ''}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#3FC1B0', fontWeight: 600, fontSize: '0.875rem', marginTop: '1.25rem' }}>
                        Learn more <ArrowRight size={14} />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
