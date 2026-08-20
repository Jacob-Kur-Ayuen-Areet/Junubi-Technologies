import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Mail, Phone, CheckCircle } from 'lucide-react';
import api from '../api/client';
import { Badge, Button, Input, Textarea, Select } from '../components/ui/index';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  service_interest: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const SERVICES = [
  'Domain Registration', 'Web Hosting', 'VPS Hosting', 'Dedicated Servers',
  'Cloud Services', 'Business Email Hosting', 'Website Development',
  'Web Application Development', 'Mobile App Backend Hosting', 'SSL Certificates',
  'DevOps Services', 'Application Deployment', 'Server Management', 'Cybersecurity Services',
  'General Inquiry',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setApiError('');
    try {
      await api.post('/contact', data);
      setSubmitted(true);
    } catch (err) {
      setApiError(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <main style={{ paddingTop: '72px' }}>
      <section style={{ padding: '5rem 0 6rem' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <Badge color="teal" style={{ display: 'inline-block', marginBottom: '1rem' }}>Get in Touch</Badge>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, marginBottom: '1rem' }}>
              We'd love to <span className="gradient-text-gold">hear from you</span>
            </h1>
            <p style={{ color: '#c8c3b7', maxWidth: '500px', margin: '0 auto', fontSize: '1.0625rem', lineHeight: 1.7 }}>
              Whether you have a question, need a quote, or just want to say hello — our team in Juba is ready to help.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'start' }}>
            {/* Contact info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                {[
                  { icon: <MapPin size={20} />, label: 'Address', value: 'Juba, Central Equatoria, South Sudan' },
                  { icon: <Mail size={20} />, label: 'Email', value: 'hello@junubitech.com' },
                  { icon: <Phone size={20} />, label: 'Phone', value: '+211 900 000 000' },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0,
                      background: 'rgba(63,193,176,0.12)', border: '1px solid rgba(63,193,176,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#3FC1B0',
                    }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#c8c3b7', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{label}</div>
                      <div style={{ color: '#F3EFE4', fontSize: '0.95rem' }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                background: 'rgba(22,49,64,0.5)',
                border: '1px solid rgba(63,193,176,0.15)',
                borderRadius: '1rem',
                padding: '1.5rem',
              }}>
                <p style={{ color: '#c8c3b7', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                  <strong style={{ color: '#E7A94B' }}>Office hours:</strong> Monday – Friday, 8:00 AM – 5:00 PM (EAT). For urgent hosting issues, our support team is available 24/7.
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              {submitted ? (
                <div style={{
                  background: 'rgba(72,187,120,0.1)',
                  border: '1px solid rgba(72,187,120,0.3)',
                  borderRadius: '1rem',
                  padding: '3rem',
                  textAlign: 'center',
                }}>
                  <CheckCircle size={48} style={{ color: '#68d391', marginBottom: '1rem' }} />
                  <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#F3EFE4', marginBottom: '0.75rem' }}>
                    Message sent!
                  </h2>
                  <p style={{ color: '#c8c3b7', lineHeight: 1.7 }}>
                    Thank you for reaching out. Our team will get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate style={{
                  background: 'rgba(22,49,64,0.5)',
                  border: '1px solid rgba(63,193,176,0.15)',
                  borderRadius: '1rem',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}>
                  <Input id="contact-name" label="Full Name *" placeholder="Your name" error={errors.name?.message} {...register('name')} />
                  <Input id="contact-email" label="Email Address *" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
                  <Select id="contact-service" label="Service Interest" {...register('service_interest')}>
                    <option value="">— Select a service (optional)</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                  <Textarea id="contact-message" label="Message *" placeholder="How can we help you?" rows={5} error={errors.message?.message} {...register('message')} />

                  {apiError && (
                    <div style={{ background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#fc8181', fontSize: '0.875rem' }}>
                      {apiError}
                    </div>
                  )}

                  <Button type="submit" variant="primary" size="lg" loading={isSubmitting} style={{ marginTop: '0.5rem' }}>
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      <style>{`@media (max-width: 767px) { section > div[class*="container"] > div { grid-template-columns: 1fr !important; } }`}</style>
    </main>
  );
}
