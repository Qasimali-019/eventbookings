# EventCraft Backend (API)

Node.js + Express + MongoDB (+ optional Redis) API for **EventCraft** — customizable event management (per PRD/SADD).

**Verification:** See [VERIFICATION.md](./VERIFICATION.md) for a checklist confirming all Section 4 APIs, Section 3 DB design, and Section 2.2 tech stack.

## Setup

1. **Install dependencies**
   ```bash
   cd backend && npm install
   ```

2. **Environment**
   - Copy `.env.example` to `.env`
   - Set `MONGODB_URI` (e.g. MongoDB Atlas or `mongodb://localhost:27017/eventcraft`)
   - Set `JWT_SECRET` for production
   - Optional: `FRONTEND_URL` (default `http://localhost:5173` for Vite)

3. **Run**
   ```bash
   npm run dev
   ```
   API: `http://localhost:5000`

## API Overview (PRD Section 4)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register user |
| POST | `/auth/login` | Login (returns JWT + user) |
| GET | `/auth/me` | Current user (Bearer token) |
| POST | `/events` | Create event |
| GET | `/events` | List events (`?organizerId=`, `?status=`) |
| GET | `/events/:id` | Event detail |
| POST | `/events/:id/modules` | Add module |
| GET | `/events/:id/modules` | List modules |
| PUT | `/events/:id` | Update event |
| POST | `/agenda` | Create agenda item |
| GET | `/agenda?eventId=` | List agenda items |
| POST | `/tickets` | Create ticket |
| GET | `/tickets?eventId=` | List tickets |
| POST | `/attendee` | Register attendee |
| GET | `/attendee?eventId=` | List attendees (auth) |
| PATCH | `/attendee/:id/checkin` | Check-in |
| POST | `/automation` | Create automation rule |
| GET | `/automation?eventId=` | List rules |
| GET | `/analytics?eventId=` | Event analytics |
| POST | `/analytics` | Log metric (body: eventId, metricKey, value) |
| POST | `/notifications` | Send email/SMS (stub) |
| POST | `/livestream/connect` | Connect virtual session |
| GET | `/livestream/:eventId` | Get virtual session config |

## Auth

- **Signup**: `POST /auth/signup` — body: `{ email, name, password }`
- **Login**: `POST /auth/login` — body: `{ email, password }`
- Response includes `{ user, token }`. Send `Authorization: Bearer <token>` for protected routes.

## Database (MongoDB)

Models: User, Event, EventModule, AgendaItem, Ticket, Attendee, AutomationRule, AnalyticsLog (per PRD Section 3).

## Optional

- **Redis**: Add `REDIS_URL` for cache/queue/pub-sub when ready.
- **Email/SMS**: Wire SendGrid/Twilio in `routes/notifications.js`.
