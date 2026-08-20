import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Users, FileText, Server, Ticket, Globe, LogOut, BarChart3, Plus, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';
import { Badge, Card, Button, Input, Textarea, Select, Skeleton } from '../../components/ui/index';

const STATUS_LEAD_COLOR = { new: 'teal', contacted: 'gold', converted: 'green', closed: 'gray' };
const TICKET_COLOR = { open: 'teal', in_progress: 'gold', resolved: 'green', closed: 'gray' };

function AdminSidebar({ active, setActive, onLogout }) {
  const links = [
    { id: 'stats', label: 'Overview', icon: <BarChart3 size={18} /> },
    { id: 'leads', label: 'Leads', icon: <Users size={18} /> },
    { id: 'services', label: 'Services', icon: <Server size={18} /> },
    { id: 'blog', label: 'Blog Posts', icon: <FileText size={18} /> },
    { id: 'tickets', label: 'Support Tickets', icon: <Ticket size={18} /> },
  ];
  return (
    <aside style={{ width: '220px', flexShrink: 0, background: 'rgba(22,49,64,0.5)', border: '1px solid rgba(231,169,75,0.15)', borderRadius: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.375rem', alignSelf: 'start', position: 'sticky', top: '90px' }}>
      <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <p style={{ margin: 0, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#E7A94B', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Admin Panel</p>
      </div>
      {links.map(({ id, label, icon }) => (
        <button key={id} onClick={() => setActive(id)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', background: active === id ? 'rgba(231,169,75,0.12)' : 'transparent', color: active === id ? '#E7A94B' : '#c8c3b7', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: active === id ? 600 : 400, transition: 'all 0.2s' }}>
          {icon} {label}
        </button>
      ))}
      <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', background: 'transparent', color: '#fc8181', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', marginTop: 'auto', transition: 'background 0.2s' }}>
        <LogOut size={18} /> Log out
      </button>
    </aside>
  );
}

function StatsPanel() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-stats'], queryFn: () => api.get('/admin/stats').then(r => r.data) });
  const stats = [
    { label: 'Total Leads', value: data?.leads, color: '#3FC1B0', icon: <Users size={22} /> },
    { label: 'Open Tickets', value: data?.tickets, color: '#E7A94B', icon: <Ticket size={22} /> },
    { label: 'Clients', value: data?.users, color: '#3FC1B0', icon: <Users size={22} /> },
    { label: 'Active Services', value: data?.services, color: '#E7A94B', icon: <Server size={22} /> },
  ];
  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#F3EFE4', marginBottom: '1.5rem' }}>Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.25rem' }}>
        {stats.map(({ label, value, color, icon }) => (
          <Card key={label} style={{ textAlign: 'center' }}>
            <div style={{ color, marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>{icon}</div>
            <div style={{ fontSize: '2rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color, marginBottom: '0.25rem' }}>
              {isLoading ? '—' : value ?? '—'}
            </div>
            <div style={{ color: '#c8c3b7', fontSize: '0.85rem' }}>{label}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function LeadsPanel() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['admin-leads'], queryFn: () => api.get('/admin/leads').then(r => r.data.leads) });

  const mutation = useMutation({
    mutationFn: ({ id, status }) => api.patch(`/admin/leads/${id}`, { status }),
    onSuccess: () => qc.invalidateQueries(['admin-leads']),
  });

  if (isLoading) return <div style={{ display: 'grid', gap: '1rem' }}>{Array(4).fill(0).map((_, i) => <Skeleton key={i} height="80px" />)}</div>;

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#F3EFE4', marginBottom: '1.5rem' }}>Leads ({data?.length || 0})</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {data?.map(lead => (
          <Card key={lead.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.375rem' }}>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#F3EFE4' }}>{lead.name}</span>
                  <Badge color={STATUS_LEAD_COLOR[lead.status] || 'gray'}>{lead.status}</Badge>
                  <Badge color={lead.source === 'quote' ? 'gold' : 'teal'}>{lead.source}</Badge>
                </div>
                <p style={{ margin: '0 0 0.25rem', color: '#c8c3b7', fontSize: '0.85rem' }}>{lead.email} {lead.service_interest && `· ${lead.service_interest}`}</p>
                <p style={{ margin: 0, color: '#c8c3b7', fontSize: '0.8rem', lineHeight: 1.5 }}>{lead.message.substring(0, 140)}{lead.message.length > 140 ? '…' : ''}</p>
              </div>
              <Select id={`lead-status-${lead.id}`} value={lead.status} onChange={e => mutation.mutate({ id: lead.id, status: e.target.value })} style={{ minWidth: '130px' }}>
                {['new', 'contacted', 'converted', 'closed'].map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ServicesPanel() {
  const qc = useQueryClient();
  const [form, setForm] = useState(null); // null = closed, {} = new, {...} = editing
  const [fd, setFd] = useState({ category: 'Infrastructure', name: '', slug: '', description: '', price_tier: '', is_active: true });

  const { data, isLoading } = useQuery({ queryKey: ['admin-services'], queryFn: () => api.get('/admin/services').then(r => r.data.services) });

  const createMut = useMutation({ mutationFn: (d) => api.post('/admin/services', d), onSuccess: () => { qc.invalidateQueries(['admin-services']); setForm(null); } });
  const updateMut = useMutation({ mutationFn: ({ id, ...d }) => api.put(`/admin/services/${id}`, d), onSuccess: () => { qc.invalidateQueries(['admin-services']); setForm(null); } });
  const deleteMut = useMutation({ mutationFn: (id) => api.delete(`/admin/services/${id}`), onSuccess: () => qc.invalidateQueries(['admin-services']) });

  const openNew = () => { setFd({ category: 'Infrastructure', name: '', slug: '', description: '', price_tier: '', is_active: true }); setForm('new'); };
  const openEdit = (s) => { setFd(s); setForm(s.id); };
  const handleSave = () => form === 'new' ? createMut.mutate(fd) : updateMut.mutate({ id: form, ...fd });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#F3EFE4' }}>Services ({data?.length || 0})</h2>
        <Button variant="primary" size="sm" onClick={openNew}><Plus size={15} /> Add Service</Button>
      </div>

      {form !== null && (
        <Card style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.25rem', fontFamily: 'Space Grotesk, sans-serif', color: '#F3EFE4' }}>{form === 'new' ? 'New Service' : 'Edit Service'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <Select id="svc-cat" label="Category" value={fd.category} onChange={e => setFd(p => ({ ...p, category: e.target.value }))}>
              {['Infrastructure', 'Development', 'Security & Ops', 'Domains & Email'].map(c => <option key={c}>{c}</option>)}
            </Select>
            <Input id="svc-name" label="Name *" value={fd.name} onChange={e => setFd(p => ({ ...p, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }))} />
            <Input id="svc-slug" label="Slug *" value={fd.slug} onChange={e => setFd(p => ({ ...p, slug: e.target.value }))} />
            <Input id="svc-price" label="Price Tier" value={fd.price_tier} onChange={e => setFd(p => ({ ...p, price_tier: e.target.value }))} placeholder="From $X/mo" />
          </div>
          <Textarea id="svc-desc" label="Description *" rows={4} value={fd.description} onChange={e => setFd(p => ({ ...p, description: e.target.value }))} style={{ marginBottom: '1rem' }} />
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button variant="primary" size="sm" loading={createMut.isPending || updateMut.isPending} onClick={handleSave}>Save</Button>
            <Button variant="ghost" size="sm" onClick={() => setForm(null)}>Cancel</Button>
          </div>
        </Card>
      )}

      {isLoading ? <div style={{ display: 'grid', gap: '0.75rem' }}>{Array(4).fill(0).map((_, i) => <Skeleton key={i} height="60px" />)}</div> : (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {data?.map(s => (
            <Card key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', padding: '1.25rem' }}>
              <div>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#F3EFE4', marginRight: '0.75rem' }}>{s.name}</span>
                <Badge color="teal">{s.category}</Badge>
                {!s.is_active && <Badge color="gray" style={{ marginLeft: '0.5rem' }}>Inactive</Badge>}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="secondary" size="sm" onClick={() => openEdit(s)}><Pencil size={14} /></Button>
                <Button variant="danger" size="sm" loading={deleteMut.isPending} onClick={() => { if (confirm('Delete this service?')) deleteMut.mutate(s.id); }}><Trash2 size={14} /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogPanel() {
  const qc = useQueryClient();
  const [form, setForm] = useState(null);
  const [fd, setFd] = useState({ title: '', slug: '', content: '', published_at: '' });

  const { data, isLoading } = useQuery({ queryKey: ['admin-blog'], queryFn: () => api.get('/admin/blog').then(r => r.data.posts) });
  const createMut = useMutation({ mutationFn: (d) => api.post('/admin/blog', d), onSuccess: () => { qc.invalidateQueries(['admin-blog']); setForm(null); } });
  const deleteMut = useMutation({ mutationFn: (id) => api.delete(`/admin/blog/${id}`), onSuccess: () => qc.invalidateQueries(['admin-blog']) });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#F3EFE4' }}>Blog Posts ({data?.length || 0})</h2>
        <Button variant="primary" size="sm" onClick={() => { setFd({ title: '', slug: '', content: '', published_at: '' }); setForm('new'); }}><Plus size={15} /> New Post</Button>
      </div>

      {form !== null && (
        <Card style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.25rem', fontFamily: 'Space Grotesk, sans-serif', color: '#F3EFE4' }}>New Blog Post</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input id="blog-title" label="Title *" value={fd.title} onChange={e => setFd(p => ({ ...p, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }))} />
            <Input id="blog-slug" label="Slug *" value={fd.slug} onChange={e => setFd(p => ({ ...p, slug: e.target.value }))} />
            <Textarea id="blog-content" label="Content *" rows={8} value={fd.content} onChange={e => setFd(p => ({ ...p, content: e.target.value }))} />
            <Input id="blog-pub" label="Publish Date (leave blank for draft)" type="datetime-local" value={fd.published_at} onChange={e => setFd(p => ({ ...p, published_at: e.target.value }))} />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button variant="primary" size="sm" loading={createMut.isPending} onClick={() => createMut.mutate(fd)}>Publish</Button>
              <Button variant="ghost" size="sm" onClick={() => setForm(null)}>Cancel</Button>
            </div>
          </div>
        </Card>
      )}

      {isLoading ? <div style={{ display: 'grid', gap: '0.75rem' }}>{Array(3).fill(0).map((_, i) => <Skeleton key={i} height="60px" />)}</div> : (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {data?.map(p => (
            <Card key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', padding: '1.25rem' }}>
              <div>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#F3EFE4', marginRight: '0.75rem' }}>{p.title}</span>
                <Badge color={p.published_at ? 'green' : 'gray'}>{p.published_at ? 'Published' : 'Draft'}</Badge>
              </div>
              <Button variant="danger" size="sm" onClick={() => { if (confirm('Delete this post?')) deleteMut.mutate(p.id); }}><Trash2 size={14} /></Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function TicketsPanel() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['admin-tickets'], queryFn: () => api.get('/admin/tickets').then(r => r.data.tickets) });
  const mutation = useMutation({ mutationFn: ({ id, status }) => api.patch(`/admin/tickets/${id}`, { status }), onSuccess: () => qc.invalidateQueries(['admin-tickets']) });

  return (
    <div>
      <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#F3EFE4', marginBottom: '1.5rem' }}>Support Tickets ({data?.length || 0})</h2>
      {isLoading ? <div style={{ display: 'grid', gap: '1rem' }}>{Array(3).fill(0).map((_, i) => <Skeleton key={i} height="80px" />)}</div> : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {data?.map(t => (
            <Card key={t.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#F3EFE4' }}>#{t.id} — {t.subject}</span>
                    <Badge color={TICKET_COLOR[t.status] || 'gray'}>{t.status}</Badge>
                    <Badge color={t.priority === 'high' ? 'red' : 'gold'}>{t.priority}</Badge>
                  </div>
                  <p style={{ margin: 0, color: '#c8c3b7', fontSize: '0.8rem' }}>{t.client_name} · {t.client_email}</p>
                </div>
                <Select id={`ticket-status-${t.id}`} value={t.status} onChange={e => mutation.mutate({ id: t.id, status: e.target.value })} style={{ minWidth: '150px' }}>
                  {['open', 'in_progress', 'resolved', 'closed'].map(s => <option key={s} value={s}>{s}</option>)}
                </Select>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [active, setActive] = useState('stats');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  const PANELS = { stats: <StatsPanel />, leads: <LeadsPanel />, services: <ServicesPanel />, blog: <BlogPanel />, tickets: <TicketsPanel /> };

  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh' }}>
      <div className="container-site" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          <AdminSidebar active={active} setActive={setActive} onLogout={handleLogout} />
          <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ flex: 1, minWidth: 0 }}>
            {PANELS[active]}
          </motion.div>
        </div>
      </div>
      <style>{`@media (max-width: 767px) { aside { display: none !important; } }`}</style>
    </main>
  );
}
