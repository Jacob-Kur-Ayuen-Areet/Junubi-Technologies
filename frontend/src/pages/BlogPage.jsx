import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Calendar, User } from 'lucide-react';
import api from '../api/client';
import { Badge, Skeleton, EmptyState } from '../components/ui/index';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['blog'],
    queryFn: () => api.get('/blog').then(r => r.data.posts),
  });

  return (
    <main style={{ paddingTop: '72px' }}>
      <section style={{ padding: '5rem 0 3rem', background: 'rgba(22,49,64,0.2)' }}>
        <div className="container-site" style={{ textAlign: 'center' }}>
          <Badge color="teal" style={{ display: 'inline-block', marginBottom: '1rem' }}>Insights & News</Badge>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, marginBottom: '1rem' }}>
            The Junubi <span className="gradient-text-teal">Blog</span>
          </h1>
          <p style={{ color: '#c8c3b7', maxWidth: '520px', margin: '0 auto', fontSize: '1.0625rem', lineHeight: 1.7 }}>
            Guides, news, and tech insights for South Sudanese businesses navigating the digital world.
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 0 6rem' }}>
        <div className="container-site">
          {isLoading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.75rem' }}>
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="glass-card" style={{ padding: '1.75rem' }}>
                  <Skeleton height="0.75rem" width="100px" style={{ marginBottom: '1rem' }} />
                  <Skeleton height="1.5rem" style={{ marginBottom: '0.5rem' }} />
                  <Skeleton height="0.9rem" style={{ marginBottom: '0.25rem' }} />
                  <Skeleton height="0.9rem" width="70%" />
                </div>
              ))}
            </div>
          ) : !data?.length ? (
            <EmptyState icon="✍️" title="No posts yet" description="Check back soon for guides, news, and tech insights." />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.75rem' }}>
              {data.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="glass-card hover-glow-teal" style={{ padding: '1.75rem', height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', color: '#c8c3b7', fontSize: '0.8rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <Calendar size={13} /> {formatDate(post.published_at)}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <User size={13} /> {post.author_name}
                        </span>
                      </div>
                      <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: '#F3EFE4', flex: 1, lineHeight: 1.4 }}>
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p style={{ color: '#c8c3b7', fontSize: '0.875rem', lineHeight: 1.65, margin: '0 0 1.25rem' }}>
                          {post.excerpt}
                        </p>
                      )}
                      <span style={{ color: '#3FC1B0', fontWeight: 600, fontSize: '0.875rem' }}>Read more →</span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
