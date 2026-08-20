import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import api from '../api/client';
import { Skeleton } from '../components/ui/index';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => api.get(`/blog/${slug}`).then(r => r.data.post),
  });

  if (isLoading) {
    return (
      <main style={{ paddingTop: '120px' }}>
        <div className="container-site" style={{ maxWidth: '760px', paddingBottom: '5rem' }}>
          <Skeleton height="0.875rem" width="140px" style={{ marginBottom: '2rem' }} />
          <Skeleton height="2.5rem" width="85%" style={{ marginBottom: '0.75rem' }} />
          <Skeleton height="2.5rem" width="60%" style={{ marginBottom: '2rem' }} />
          {Array(8).fill(0).map((_, i) => <Skeleton key={i} height="0.9rem" style={{ marginBottom: '0.5rem' }} />)}
        </div>
      </main>
    );
  }

  if (isError || !post) {
    return (
      <main style={{ paddingTop: '120px', textAlign: 'center', padding: '8rem 1.5rem' }}>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F3EFE4', marginBottom: '1rem' }}>Post Not Found</h1>
        <Link to="/blog" style={{ color: '#3FC1B0' }}>← Back to blog</Link>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: '72px' }}>
      <div className="container-site" style={{ maxWidth: '760px', paddingTop: '4rem', paddingBottom: '6rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#c8c3b7', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
            <ArrowLeft size={15} /> Back to blog
          </Link>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem', color: '#c8c3b7', fontSize: '0.875rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={14} /> {formatDate(post.published_at)}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={14} /> {post.author_name}
            </span>
          </div>

          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, marginBottom: '2.5rem', lineHeight: 1.25, color: '#F3EFE4' }}>
            {post.title}
          </h1>

          <div style={{
            background: 'rgba(22,49,64,0.4)',
            border: '1px solid rgba(63,193,176,0.12)',
            borderRadius: '1rem',
            padding: '2.5rem',
          }}>
            {post.content.split('\n\n').map((para, i) => {
              if (para.startsWith('**') && para.endsWith('**')) {
                return <h2 key={i} style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#F3EFE4', fontSize: '1.25rem', margin: '1.75rem 0 0.75rem' }}>{para.replace(/\*\*/g, '')}</h2>;
              }
              if (para.startsWith('- ')) {
                const items = para.split('\n').filter(l => l.startsWith('- '));
                return <ul key={i} style={{ paddingLeft: '1.25rem', margin: '0.75rem 0' }}>{items.map((item, j) => <li key={j} style={{ color: '#c8c3b7', lineHeight: 1.7, marginBottom: '0.375rem' }}>{item.slice(2)}</li>)}</ul>;
              }
              return <p key={i} style={{ color: '#c8c3b7', lineHeight: 1.8, margin: '0.875rem 0', fontSize: '0.9875rem' }}>{para.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
            })}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
