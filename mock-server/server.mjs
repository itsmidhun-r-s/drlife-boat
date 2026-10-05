// Tiny local mock of the DrLifeBoat API (no dependencies). For development only.
// Run:  npm run mock     (listens on http://localhost:5000, matching the Vite proxy)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.PORT) || 5000;
const DB_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), 'db.json');

const db = fs.existsSync(DB_FILE) ? JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) : { users: [] };
const save = () => fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
const hash = (pw) => crypto.createHash('sha256').update(pw).digest('hex');

const COURSES = [
  { _id: 'c1', slug: 'amc-part-1', title: 'AMC Part 1 Complete Course', category: 'AMC', level: 'intermediate', description: 'Live classes, recall discussions and adaptive mock tests for AMC MCQ.' },
  { _id: 'c2', slug: 'plab-1-masterclass', title: 'PLAB 1 Masterclass', category: 'PLAB', level: 'beginner', description: 'A structured roadmap with quizzes and mentor support for PLAB 1.' },
  { _id: 'c3', slug: 'fmge-crash-course', title: 'FMGE Crash Course', category: 'FMGE', level: 'advanced', description: 'High-yield, concept-based revision with question banks and analytics.' }
];
const MODULES = [
  { _id: 'm1', title: 'Cardiology essentials', description: 'High-yield cardiology topics.', videos: [{ _id: 'v1', title: 'ECG basics', accessLevel: 'low' }, { _id: 'v2', title: 'Heart failure', accessLevel: 'medium' }] },
  { _id: 'm2', title: 'Respiratory medicine', description: 'Asthma, COPD and more.', videos: [{ _id: 'v3', title: 'Asthma management', accessLevel: 'low' }] }
];
const PLANS = [
  { _id: 'p1', name: 'Basic', planType: 'low', price: 4999, currency: 'INR', durationDays: 90, description: 'Get started.', features: ['Recorded lectures', 'Topic-wise quizzes'] },
  { _id: 'p2', name: 'Standard', planType: 'medium', price: 9999, currency: 'INR', durationDays: 180, description: 'Most popular.', features: ['Everything in Basic', '4 live classes / week', 'AI adaptive mock tests'] },
  { _id: 'p3', name: 'Premium', planType: 'high', price: 14999, currency: 'INR', durationDays: 365, description: 'Full support.', features: ['Everything in Standard', '1:1 mentorship', 'Custom study plan'] }
];

const publicUser = (u) => { const { passwordHash, ...rest } = u; return rest; };
const tokenFor = (u) => Buffer.from(`${u._id}:${Date.now()}`).toString('base64url');
const userFromToken = (t) => {
  try { const id = Buffer.from(t, 'base64url').toString().split(':')[0]; return db.users.find((u) => u._id === id); } catch { return undefined; }
};
const bearer = (req) => (req.headers.authorization || '').replace(/^Bearer /, '');
const cookies = (req) => Object.fromEntries((req.headers.cookie || '').split(';').filter(Boolean).map((c) => c.trim().split('=')));

const send = (res, status, body, headers = {}) => {
  res.writeHead(status, { 'Content-Type': 'application/json', ...headers });
  res.end(JSON.stringify(body));
};
const readBody = (req) => new Promise((resolve) => {
  let d = ''; req.on('data', (c) => (d += c)); req.on('end', () => { try { resolve(d ? JSON.parse(d) : {}); } catch { resolve({}); } });
});
const setRefresh = (u) => ({ 'Set-Cookie': `rt=${u._id}; HttpOnly; Path=/; SameSite=Lax; Max-Age=2592000` });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const route = `${req.method} ${url.pathname.replace(/^\/api/, '')}`;
  const body = req.method === 'GET' ? {} : await readBody(req);
  console.log(route);

  if (route === 'POST /auth/register') {
    const { name, email, password, phone } = body;
    if (!name || !email || !password) return send(res, 400, { message: 'Name, email and password are required' });
    if (password.length < 8) return send(res, 400, { message: 'Password must be at least 8 characters' });
    if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) return send(res, 409, { message: 'An account with this email already exists' });
    const user = { _id: crypto.randomUUID(), name, email, phone, role: db.users.length === 0 ? 'admin' : 'user', isEmailVerified: false, passwordHash: hash(password) };
    db.users.push(user); save();
    return send(res, 201, { data: { user: publicUser(user), accessToken: tokenFor(user) } }, setRefresh(user));
  }
  if (route === 'POST /auth/login') {
    const user = db.users.find((u) => u.email.toLowerCase() === (body.email || '').toLowerCase());
    if (!user || user.passwordHash !== hash(body.password || '')) return send(res, 401, { message: 'Invalid email or password' });
    return send(res, 200, { data: { user: publicUser(user), accessToken: tokenFor(user) } }, setRefresh(user));
  }
  if (route === 'POST /auth/refresh') {
    const user = db.users.find((u) => u._id === cookies(req).rt);
    return user ? send(res, 200, { data: { accessToken: tokenFor(user) } }) : send(res, 401, { message: 'No session' });
  }
  if (route === 'POST /auth/logout') return send(res, 200, { data: null }, { 'Set-Cookie': 'rt=; Path=/; Max-Age=0' });
  if (route === 'GET /auth/me') {
    const user = userFromToken(bearer(req));
    return user ? send(res, 200, { data: publicUser(user) }) : send(res, 401, { message: 'Unauthorized' });
  }
  if (route === 'POST /contact') {
    if (!body.name || !body.email) return send(res, 400, { message: 'Name and email are required' });
    db.enquiries = [...(db.enquiries || []), { ...body, receivedAt: new Date().toISOString() }];
    save();
    return send(res, 201, { data: { ok: true } });
  }
  if (route === 'GET /courses') return send(res, 200, { data: COURSES });
  let m;
  if ((m = route.match(/^GET \/courses\/([^/]+)\/modules$/))) return send(res, 200, { data: MODULES });
  if ((m = route.match(/^GET \/courses\/([^/]+)$/))) {
    const c = COURSES.find((x) => x.slug === m[1]);
    return c ? send(res, 200, { data: c }) : send(res, 404, { message: 'Course not found' });
  }
  if (route === 'GET /subscriptions/plans') return send(res, 200, { data: PLANS });
  if (route === 'GET /subscriptions/me') return send(res, 200, { data: { isActive: false, daysRemaining: 0, subscription: null } });

  send(res, 404, { message: `No mock for ${route}` });
});

server.listen(PORT, () => console.log(`Mock API running on http://localhost:${PORT}  (data saved in mock-server/db.json)`));
