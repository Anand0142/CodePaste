# Pastebin Lite

A minimal Pastebin-like application where users can create text pastes and share them via a unique URL.
Pastes can optionally expire based on time-to-live (TTL) or maximum view count.

This project is built as a take-home assignment and focuses on API correctness, persistence, and constraint enforcement.

---

## Features

- Create a text paste
- Generate a shareable URL
- View a paste via API or browser
- Optional constraints:
  - Time-based expiry (TTL)
  - View-count limit
- Automatic expiration when constraints are exceeded
- Persistent storage using Redis
- Deterministic time support for automated testing

---

## Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Upstash Redis** (persistence layer)
- **Vercel** (deployment)

---

## API Endpoints

### Health Check
