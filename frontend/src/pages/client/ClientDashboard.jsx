import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Server, FileText, Ticket, LogOut, Plus, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';
import { Badge, Card, Button, Textarea, Input, Select, Skeleton, EmptyState } from '../../components/ui/index';

const STATUS_COLOR = { active: 'green', suspended: 'red', expired: 'red', pending: 'gold' };
const INV_COLOR = { paid: 'green', pending: 'gold', overdue: 'red', cancelled: 'gray' };
const TICKET_COLOR = { open: 'teal', in_progress: 'gold', resolved: 'green', closed: 'gray' };

function Sidebar({ active, setActive, userName, onLogout }) {
  const links = [
    { id: 'services', label: 'My Services', icon: <Server size={18} /> },
    { id: 'invoices', label: 'Invoices', icon: <FileText size={18} /> },
    { id: 'tickets', label: 'Support Tickets', icon: <Ticket size={18} /> },
  ];
  return (
    <aside style={{
      width: '240px', flexShrink: 0,
      background: 'rgba(22,49,64,0.5)',
      border: '1px solid rgba(63,193,176,0.12)',
      borderRadius: '1rem',
      padding: '1.5rem',
      display: 'flex', flexDirection: 'column', gap: '0.375rem',
      alignSelf: 'start', position: 'sticky', top: '90px',
    }}>
      <div style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(63,193,176,0.3), rgba(231,169,75,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: 700, color: '#E7A94B', fontFamily: 'Space Grotesk, sans-serif' }}>
          {userName?.charAt(0)}
        </div>
        <p style={{ margin: 0, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#F3EFE4', fontSize: '0.95rem' }}>{userName}</p>
        <p style={{ margin: 0, color: '#c8c3b7', fontSize: '0.8rem' }}>Client Portal</p>
      </div>
      {links.map(({ id, label, icon }) => (
        <button key={id} onClick={() => setActive(id)}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: 'none',
            cursor: 'pointer', width: '100%', textAlign: 'left',
            background: active === id ? 'rgba(63,193,176,0.15)' : 'transparent',
            color: active === id ? '#3FC1B0' : '#c8c3b7',
            fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: active === id ? 600 : 400,
            transition: 'all 0.2s',
          }}>
          {icon} {label}
        </button>
      ))}
      <button onClick={onLogout}
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', background: 'transparent', color: '#fc8181', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', marginTop: 'auto', transition: 'background 0.2s' }}>
        <LogOut size={18} /> Log out
      </button>
    </aside>
  );
}

function ServicesPanel() {
  const { data, isLoading } = useQuery({ queryKey: ['client-services'], queryFn: () => api.get('/client/services').then(r => r.data.services) });
  if (isLoading) return <div style={{ display: 'grid', gap: '1rem' }}>{Array(3).fill(0).map((_, i) => <Skeleton key={i} height="80px" />)}</div>;
  if (!data?.length) return <EmptyState icon={<Server size={40} />} title="No active services" description="You have no active services. Get started by requesting a quote." action={<Button variant="primary" onClick={() => window.location.href = '/quote'}>Get a Quote</Button>} />;
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {data.map(s => (
        <Card key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#F3EFE4' }}>{s.service_name}</span>
              <Badge color={STATUS_COLOR[s.status] || 'gray'}>{s.status}</Badge>
            </div>
            {s.domain_name && <p style={{ margin: 0, color: '#c8c3b7', fontSize: '0.875rem', fontFamily: 'JetBrains Mono, monospace' }}>{s.domain_name}</p>}
            <p style={{ margin: '0.25rem 0 0', color: '#c8c3b7', fontSize: '0.8rem' }}>Renews: {s.renewal_date ? new Date(s.renewal_date).toLocaleDateString('en-GB') : 'N/A'}</p>
          </div>
          <Badge color="teal">{s.category}</Badge>
        </Card>
      ))}
    </div>
  );
}

function InvoicesPanel() {
  const { data, isLoading } = useQuery({ queryKey: ['client-invoices'], queryFn: () => api.get('/client/invoices').then(r => r.data.invoices) });
  if (isLoading) return <div style={{ display: 'grid', gap: '1rem' }}>{Array(3).fill(0).map((_, i) => <Skeleton key={i} height="70px" />)}</div>;
  if (!data?.length) return <EmptyState icon="📄" title="No invoices yet" description="Your invoices will appear here once services are active." />;
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {data.map(inv => (
        <Card key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#F3EFE4', fontSize: '1.1rem' }}>${Number(inv.amount).toFixed(2)} {inv.currency}</span>
              <Badge color={INV_COLOR[inv.status] || 'gray'}>{inv.status}</Badge>
            </div>
            <p style={{ margin: 0, color: '#c8c3b7', fontSize: '0.8rem' }}>Due: {new Date(inv.due_date).toLocaleDateString('en-GB')}</p>
          </div>
          {inv.paid_at && <p style={{ margin: 0, color: '#68d391', fontSize: '0.8rem' }}>Paid {new Date(inv.paid_at).toLocaleDateString('en-GB')}</p>}
        </Card>
      ))}
    </div>
  );
}

function TicketsPanel() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ subject: '', message: '', priority: 'medium' });
  const [success, setSuccess] = useState(false);

  const { data, isLoading } = useQuery({ queryKey: ['client-tickets'], queryFn: () => api.get('/client/tickets').then(r => r.data.tickets) });

  const mutation = useMutation({
    mutationFn: (d) => api.post('/client/tickets', d),
    onSuccess: () => { qc.invalidateQueries(['client-tickets']); setShowForm(false); setSuccess(true); setFormData({ subject: '', message: '', priority: 'medium' }); setTimeout(() => setSuccess(false), 3000); },
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, fontFamily: 'Space Grotesk, sans-serif', color: '#F3EFE4' }}>Support Tickets</h3>
        <Button variant="primary" size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus size={15} /> New Ticket
        </Button>
      </div>

      {success && <div style={{ background: 'rgba(72,187,120,0.1)', border: '1px solid rgba(72,187,120,0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#68d391', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} /> Ticket submitted successfully.</div>}

      {showForm && (
        <Card style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', margin: '0 0 1.25rem', color: '#F3EFE4' }}>Open a New Ticket</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input id="ticket-subject" label="Subject *" value={formData.subject} onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))} placeholder="Brief description of your issue" />
            <Select id="ticket-priority" label="Priority" value={formData.priority} onChange={e => setFormData(p => ({ ...p, priority: e.target.value }))}>
              <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
            </Select>
            <Textarea id="ticket-message" label="Details *" value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} rows={4} placeholder="Describe the issue in detail..." />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button variant="primary" size="sm" loading={mutation.isPending} onClick={() => mutation.mutate(formData)}>Submit Ticket</Button>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </div>
        </Card>
      )}

      {isLoading ? <div style={{ display: 'grid', gap: '1rem' }}>{Array(2).fill(0).map((_, i) => <Skeleton key={i} height="80px" />)}</div>
        : !data?.length ? <EmptyState icon={<Ticket size={40} />} title="No tickets yet" description="Open a support ticket if you need help with any of your services." />
        : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {data.map(t => (
              <Card key={t.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#F3EFE4' }}>#{t.id} — {t.subject}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Badge color={TICKET_COLOR[t.status] || 'gray'}>{t.status}</Badge>
                    <Badge color={t.priority === 'high' ? 'red' : t.priority === 'medium' ? 'gold' : 'gray'}>{t.priority}</Badge>
                  </div>
                </div>
                <p style={{ margin: 0, color: '#c8c3b7', fontSize: '0.875rem' }}>{new Date(t.created_at).toLocaleDateString('en-GB')}</p>
              </Card>
            ))}
          </div>
        )
      }
    </div>
  );
}

export default function ClientDashboard() {
  const [active, setActive] = useState('services');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  const PANELS = { services: <ServicesPanel />, invoices: <InvoicesPanel />, tickets: <TicketsPanel /> };

  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div className="container-site" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.75rem', color: '#F3EFE4', marginBottom: '2rem' }}>
          Welcome back, <span className="gradient-text-gold">{user?.name?.split(' ')[0]}</span>
        </h1>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          <Sidebar active={active} setActive={setActive} userName={user?.name} onLogout={handleLogout} />
          <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ flex: 1, minWidth: 0 }}>
            {PANELS[active]}
          </motion.div>
        </div>
      </div>
      <style>{`@media (max-width: 767px) { aside { display: none !important; } }`}</style>
    </main>
  );
}
