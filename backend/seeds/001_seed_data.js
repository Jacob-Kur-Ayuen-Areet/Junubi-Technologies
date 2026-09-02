const bcrypt = require('bcryptjs');

// MySQL TIMESTAMP columns require 'YYYY-MM-DD HH:MM:SS' format, not ISO 8601
const toMySQL = (date) => date.toISOString().slice(0, 19).replace('T', ' ');

exports.seed = async function (knex) {
  // Clean in reverse FK order
  await knex('ticket_replies').del();
  await knex('tickets').del();
  await knex('invoices').del();
  await knex('client_services').del();
  await knex('blog_posts').del();
  await knex('leads').del();
  await knex('services').del();
  await knex('users').del();

  // ─── Users ──────────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('password123', 12);

  const [adminId] = await knex('users').insert({
    name: 'Admin User',
    email: 'admin@junubitech.com',
    password_hash: passwordHash,
    role: 'admin',
  });

  const [admin2Id] = await knex('users').insert({
    name: 'James Lado',
    email: 'james@junubitech.com',
    password_hash: passwordHash,
    role: 'admin',
  });

  const [client1Id] = await knex('users').insert({
    name: 'Peter Deng',
    email: 'peter.deng@example.com',
    password_hash: passwordHash,
    role: 'client',
  });

  const [client2Id] = await knex('users').insert({
    name: 'Ayen Akuei',
    email: 'ayen.akuei@example.com',
    password_hash: passwordHash,
    role: 'client',
  });

  const [client3Id] = await knex('users').insert({
    name: 'Emmanuel Lako',
    email: 'emmanuel.lako@example.com',
    password_hash: passwordHash,
    role: 'client',
  });

  // ─── Services ────────────────────────────────────────────────────────────────
  const [domainId] = await knex('services').insert({
    category: 'Domains & Email',
    name: 'Domain Registration',
    slug: 'domain-registration',
    description: 'Register .com, .org, .net, .co.ss and other TLDs for your business or personal brand. Fast DNS propagation and free WHOIS privacy.',
    price_tier: 'From $12/year',
    is_active: true,
  });

  const [hostingId] = await knex('services').insert({
    category: 'Infrastructure',
    name: 'Web Hosting',
    slug: 'web-hosting',
    description: 'Reliable shared and managed web hosting with 99.9% uptime SLA, daily backups, and one-click CMS installs. Optimised for low-bandwidth environments.',
    price_tier: 'From $5/month',
    is_active: true,
  });

  const [vpsId] = await knex('services').insert({
    category: 'Infrastructure',
    name: 'VPS Hosting',
    slug: 'vps-hosting',
    description: 'KVM-based Virtual Private Servers with root access, scalable RAM and storage, and multiple OS options. Ideal for growing businesses.',
    price_tier: 'From $20/month',
    is_active: true,
  });

  await knex('services').insert([
    {
      category: 'Infrastructure',
      name: 'Dedicated Servers',
      slug: 'dedicated-servers',
      description: 'Full bare-metal dedicated server rentals with unmetered bandwidth options. Best for high-traffic applications and database workloads.',
      price_tier: 'From $150/month',
      is_active: true,
    },
    {
      category: 'Infrastructure',
      name: 'Cloud Services',
      slug: 'cloud-services',
      description: 'Scalable cloud infrastructure built on leading providers. Pay-as-you-go compute, storage, and networking resources for any workload.',
      price_tier: 'Custom Quote',
      is_active: true,
    },
    {
      category: 'Domains & Email',
      name: 'Business Email Hosting',
      slug: 'business-email-hosting',
      description: 'Professional @yourdomain email with 25 GB mailboxes, spam filtering, calendar sharing, and mobile sync. Boost your brand credibility.',
      price_tier: 'From $3/user/month',
      is_active: true,
    },
    {
      category: 'Development',
      name: 'Website Development',
      slug: 'website-development',
      description: 'Custom, mobile-first websites built to represent your brand. From landing pages to full corporate sites — designed and developed in-house.',
      price_tier: 'From $500',
      is_active: true,
    },
    {
      category: 'Development',
      name: 'Web Application Development',
      slug: 'web-application-development',
      description: 'Full-stack web applications with modern frameworks (React, Node.js, etc.). Portals, dashboards, e-commerce, booking systems and more.',
      price_tier: 'Custom Quote',
      is_active: true,
    },
    {
      category: 'Infrastructure',
      name: 'Mobile App Backend Hosting',
      slug: 'mobile-app-backend-hosting',
      description: 'Managed backend infrastructure optimised for mobile apps: REST APIs, push notifications, and real-time database syncing.',
      price_tier: 'From $30/month',
      is_active: true,
    },
    {
      category: 'Security & Ops',
      name: 'SSL Certificates',
      slug: 'ssl-certificates',
      description: 'DV, OV, and EV SSL certificates from trusted authorities. Protect your visitors data and boost SEO rankings with HTTPS.',
      price_tier: 'From $10/year',
      is_active: true,
    },
    {
      category: 'Security & Ops',
      name: 'DevOps Services',
      slug: 'devops-services',
      description: 'CI/CD pipeline setup, infrastructure-as-code (Terraform/Ansible), container orchestration, and automated deployment workflows.',
      price_tier: 'Custom Quote',
      is_active: true,
    },
    {
      category: 'Security & Ops',
      name: 'Application Deployment',
      slug: 'application-deployment',
      description: 'We handle deploying your application to production: containerisation, environment configuration, health checks, and rollback procedures.',
      price_tier: 'From $200',
      is_active: true,
    },
    {
      category: 'Security & Ops',
      name: 'Server Management',
      slug: 'server-management',
      description: 'Ongoing management of your servers: OS updates, security patching, monitoring, alerting, and 24/7 incident response.',
      price_tier: 'From $99/month',
      is_active: true,
    },
    {
      category: 'Security & Ops',
      name: 'Cybersecurity Services',
      slug: 'cybersecurity-services',
      description: 'Vulnerability assessments, penetration testing, firewall configuration, DDoS protection, and security audits for your infrastructure.',
      price_tier: 'Custom Quote',
      is_active: true,
    },
  ]);

  // ─── Leads ───────────────────────────────────────────────────────────────────
  await knex('leads').insert([
    {
      name: 'Grace Achol',
      email: 'grace.achol@ngo.org',
      message: 'We are an NGO in Juba looking to set up a website and email for our team of 15 staff. Please send pricing.',
      service_interest: 'Website Development',
      source: 'contact',
      status: 'contacted',
    },
    {
      name: 'Stephen Duku',
      email: 'stephen@wautraders.com',
      message: 'I need a VPS for running a Node.js e-commerce application. Traffic is moderate — about 5,000 visits/month.',
      service_interest: 'VPS Hosting',
      source: 'quote',
      status: 'new',
    },
    {
      name: 'Miriam Lokongo',
      email: 'miriam.l@example.com',
      message: 'Interested in cybersecurity audit for our microfinance company in Malakal.',
      service_interest: 'Cybersecurity Services',
      source: 'quote',
      status: 'new',
    },
  ]);

  // ─── Client Services ──────────────────────────────────────────────────────────
  const today = new Date();
  const nextYear = new Date(today);
  nextYear.setFullYear(today.getFullYear() + 1);

  const [cs1Id] = await knex('client_services').insert({
    user_id: client1Id,
    service_id: hostingId,
    domain_name: 'peterdeng.com',
    status: 'active',
    start_date: today.toISOString().split('T')[0],
    renewal_date: nextYear.toISOString().split('T')[0],
  });

  await knex('client_services').insert({
    user_id: client1Id,
    service_id: domainId,
    domain_name: 'peterdeng.com',
    status: 'active',
    start_date: today.toISOString().split('T')[0],
    renewal_date: nextYear.toISOString().split('T')[0],
  });

  await knex('client_services').insert({
    user_id: client2Id,
    service_id: vpsId,
    domain_name: null,
    status: 'active',
    start_date: today.toISOString().split('T')[0],
    renewal_date: nextYear.toISOString().split('T')[0],
  });

  // ─── Invoices ─────────────────────────────────────────────────────────────────
  const dueDate1 = new Date(today);
  dueDate1.setDate(today.getDate() + 30);
  const dueDate2 = new Date(today);
  dueDate2.setDate(today.getDate() - 10);

  await knex('invoices').insert([
    {
      user_id: client1Id,
      amount: 60.00,
      currency: 'USD',
      status: 'paid',
      due_date: dueDate2.toISOString().split('T')[0],
      paid_at: toMySQL(new Date()),
    },
    {
      user_id: client1Id,
      amount: 60.00,
      currency: 'USD',
      status: 'pending',
      due_date: dueDate1.toISOString().split('T')[0],
      paid_at: null,
    },
    {
      user_id: client2Id,
      amount: 240.00,
      currency: 'USD',
      status: 'pending',
      due_date: dueDate1.toISOString().split('T')[0],
      paid_at: null,
    },
  ]);

  // ─── Tickets ──────────────────────────────────────────────────────────────────
  const [ticket1Id] = await knex('tickets').insert({
    user_id: client1Id,
    subject: 'Website not loading after DNS change',
    message: 'I updated the nameservers yesterday but the site still resolves to the old IP. It has been over 24 hours.',
    status: 'in_progress',
    priority: 'high',
  });

  const [ticket2Id] = await knex('tickets').insert({
    user_id: client2Id,
    subject: 'Need to increase VPS RAM',
    message: 'Our app is running out of memory during peak hours. Can we upgrade from 2GB to 4GB RAM without downtime?',
    status: 'open',
    priority: 'medium',
  });

  await knex('ticket_replies').insert([
    {
      ticket_id: ticket1Id,
      sender: 'admin',
      message: 'Hi Peter, I have checked the DNS configuration on our end — everything looks correct. The issue may be your ISP caching old records. Try flushing your local DNS or checking from a different network.',
    },
    {
      ticket_id: ticket1Id,
      sender: 'client',
      message: 'Tried from mobile data and it still shows the old site. This is urgent as our customers cannot reach us.',
    },
  ]);

  // ─── Blog Posts ───────────────────────────────────────────────────────────────
  await knex('blog_posts').insert([
    {
      title: 'Junubi Technologies Launches VPS Hosting in South Sudan',
      slug: 'junubi-tech-launches-vps-hosting',
      content: `We are proud to announce the launch of our VPS Hosting service, bringing affordable and reliable virtual private servers to businesses across South Sudan.

For too long, South Sudanese businesses have had to rely on international hosting providers with high latency, expensive data transfer costs, and little local support. Our new VPS plans change that.

Starting from just $20 per month, you get a KVM-based virtual server with full root access, your choice of operating system, and support from a team that understands your local business context.

**What makes our VPS different?**
- Low-latency connections optimised for East African traffic
- 24/7 support from our Juba-based team
- Flexible billing with options for monthly payment in local currency
- Free migration assistance from your existing provider

Contact us today to discuss which VPS plan is right for your business.`,
      excerpt: 'Junubi Technologies announces VPS Hosting plans from $20/month, bringing reliable virtual private servers to South Sudanese businesses.',
      author_id: adminId,
      published_at: new Date('2026-07-15').toISOString(),
    },
    {
      title: 'Why Your South Sudan Business Needs SSL in 2026',
      slug: 'why-ssl-matters-south-sudan-2026',
      content: `If your website still shows "Not Secure" in the browser address bar, you are losing customers every day. Here is why SSL certificates are no longer optional.

**Search engines penalise HTTP sites**
Google has confirmed that HTTPS is a ranking factor. If your competitor has SSL and you do not, they will outrank you — even with identical content.

**Your visitors see a warning**
Modern browsers display a red "Not Secure" warning on HTTP pages before any form or payment. Many users will leave immediately rather than enter any information.

**It protects your customers**
SSL encrypts data in transit, preventing man-in-the-middle attacks. In environments with shared Wi-Fi (like cafes and offices across Juba), this protection is especially important.

**Our SSL certificate options:**
- Domain Validated (DV): Quickest to issue, suitable for most websites — from $10/year
- Organisation Validated (OV): Shows your organisation name, great for business credibility
- Extended Validation (EV): The green bar — ideal for e-commerce and financial services

We can also help you install and configure your certificate correctly, including setting up automatic renewal so you never accidentally expire.`,
      excerpt: 'SSL certificates protect your visitors, improve your Google ranking, and build trust. Learn which type is right for your business.',
      author_id: admin2Id,
      published_at: new Date('2026-08-01').toISOString(),
    },
    {
      title: 'Building a Digital South Sudan: Our Mission',
      slug: 'building-digital-south-sudan-our-mission',
      content: `"Junubi" means "of the South" in Arabic — and that meaning is at the heart of everything we do.

South Sudan is one of the youngest nations in the world, with a population full of energy, ambition, and creativity. But the digital infrastructure to support that potential has lagged behind.

We started Junubi Technologies to change that — not by bringing foreign solutions and rebranding them, but by building genuine local capacity. We hire locally, invest in training local engineers, and price our services with South Sudanese businesses in mind.

**Our commitments:**
- Local support in English, Arabic, and Juba Arabic
- Pricing in USD with flexible local payment options
- Investment in community training programs for young developers
- Partnerships with local schools and universities in Juba, Wau, and Malakal

We believe that connectivity is infrastructure — as essential as roads and power. Every business we host, every domain we register, and every developer we train brings South Sudan one step closer to full participation in the global digital economy.

Join us on that journey.`,
      excerpt: 'Our story, our mission, and why we believe digital infrastructure is as important as physical infrastructure for South Sudan\'s future.',
      author_id: adminId,
      published_at: new Date('2026-06-20').toISOString(),
    },
    {
      title: 'Choosing the Right Hosting Plan: Shared vs VPS vs Dedicated',
      slug: 'shared-vs-vps-vs-dedicated-hosting-guide',
      content: `Not sure which hosting plan is right for your website? This guide breaks down the differences so you can make an informed decision.

**Shared Hosting — Best for small sites**
Your website shares server resources with other sites. This keeps costs low but means performance can vary during traffic spikes. Ideal for brochure sites, blogs, and small business websites.

Cost: From $5/month | Recommended for: New businesses, personal sites, small NGOs

**VPS Hosting — The middle ground**
A Virtual Private Server gives you a dedicated slice of server resources. Performance is consistent and you have full control (root access) to install any software you need.

Cost: From $20/month | Recommended for: Growing businesses, e-commerce, applications with databases

**Dedicated Servers — Maximum performance**
You rent the entire physical server — no sharing at all. This delivers the highest performance and greatest flexibility.

Cost: From $150/month | Recommended for: High-traffic sites, data-intensive applications, large enterprises

**Not sure? Start small and scale up.**
Our hosting plans are designed to grow with your business. You can always upgrade from shared to VPS, or VPS to dedicated, with our team handling the migration for you.`,
      excerpt: 'Compare shared, VPS, and dedicated hosting to find the right plan for your website traffic and budget.',
      author_id: admin2Id,
      published_at: new Date('2026-08-10').toISOString(),
    },
    {
      title: '5 Signs Your Business Website Needs a Redesign',
      slug: '5-signs-your-website-needs-redesign',
      content: `Your website is often the first impression a customer gets of your business. If it is not working hard for you, it might be working against you.

**1. It is not mobile-friendly**
Over 70% of web traffic in Africa comes from mobile devices. If your site is hard to navigate on a phone, you are losing customers before they even read your services.

**2. It loads slowly**
Users expect pages to load in under 3 seconds. Every extra second costs you conversions. We can audit your site speed and recommend optimisations.

**3. It looks outdated**
Design trends move fast. A site that looked modern in 2018 looks dated today. First impressions matter — make yours count.

**4. You cannot update it yourself**
If you need to call a developer every time you want to change your phone number, your site is working against you. Modern sites should have easy-to-use content management.

**5. It does not reflect what your business actually does**
Has your business evolved but your website not? Misaligned messaging confuses potential customers.

If two or more of these apply to your business, it is time to talk to us about a redesign. We build modern, fast, mobile-first websites designed to convert visitors into customers.`,
      excerpt: 'Is your website hurting more than helping? Here are 5 warning signs that it is time for a redesign.',
      author_id: adminId,
      published_at: new Date('2026-08-18').toISOString(),
    },
  ]);

  console.log('✅ Seed data inserted successfully');
};
