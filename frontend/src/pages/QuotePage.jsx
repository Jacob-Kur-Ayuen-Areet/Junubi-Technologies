import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';
import api from '../api/client';
import { Badge, Button, Input, Textarea, Select } from '../components/ui/index';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  service_interest: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Please describe your requirements (at least 10 characters)'),
});

const SERVICES = [
  'Domain Registration', 'Web Hosting', 'VPS Hosting', 'Dedicated Servers',
  'Cloud Services', 'Business Email Hosting', 'Website Development',
  'Web Application Development', 'Mobile App Backend Hosting', 'SSL Certificates',
  'DevOps Services', 'Application Deployment', 'Server Management', 'Cybersecurity Services',
];

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setApiError('');
    try {
      await api.post('/quotes', data);
      setSubmitted(true);
    } catch (err) {
      setApiError(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <main style={{ paddingTop: '72px' }}>
      <section style={{ padding: '5rem 0 7rem' }}>
        <div className="container-site" style={{ maxWidth: '680px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <Badge color="gold" style={{ display: 'inline-block', marginBottom: '1rem' }}>Request a Quote</Badge>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, marginBottom: '1rem' }}>
                Get a custom <span className="gradient-text-gold">proposal</span>
              </h1>
              <p style={{ color: '#c8c3b7', fontSize: '1.0625rem', lineHeight: 1.7 }}>
                Tell us what you need and we'll prepare a detailed proposal within 1 business day. No commitment required.
              </p>
            </div>

            {submitted ? (
              <div style={{
                background: 'rgba(72,187,120,0.1)',
                border: '1px solid rgba(72,187,120,0.3)',
                borderRadius: '1rem',
                padding: '3.5rem',
                textAlign: 'center',
              }}>
                <CheckCircle size={56} style={{ color: '#68d391', marginBottom: '1.25rem' }} />
                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#F3EFE4', marginBottom: '0.875rem', fontSize: '1.5rem' }}>
                  Quote request received!
                </h2>
                <p style={{ color: '#c8c3b7', lineHeight: 1.7, maxWidth: '400px', margin: '0 auto' }}>
                  Our team will review your requirements and send a detailed proposal to your email within 1 business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                style={{
                  background: 'rgba(22,49,64,0.5)',
                  border: '1px solid rgba(231,169,75,0.15)',
                  borderRadius: '1rem',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <Input id="quote-name" label="Full Name *" placeholder="Your name" error={errors.name?.message} {...register('name')} />
                  <Input id="quote-email" label="Email Address *" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
                </div>

                <Select id="quote-service" label="Service Required *" error={errors.service_interest?.message} {...register('service_interest')}>
                  <option value="">— Select a service</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </Select>

                <Textarea
                  id="quote-message"
                  label="Project Requirements *"
                  placeholder="Describe what you need — include details like number of users, expected traffic, features required, timeline, budget range, etc."
                  rows={7}
                  error={errors.message?.message}
                  {...register('message')}
                />

                {apiError && (
                  <div style={{ background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#fc8181', fontSize: '0.875rem' }}>
                    {apiError}
                  </div>
                )}

                <Button type="submit" variant="primary" size="lg" loading={isSubmitting}>
                  Submit Quote Request
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
      <style>{`@media (max-width: 600px) { form > div { grid-template-columns: 1fr !important; } }`}</style>
    </main>
  );
}
