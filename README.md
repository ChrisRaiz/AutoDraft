<p align="center">
  <img src="frontend/src/data/assets/logo-title-56x56.svg" alt="AutoDraft logo" width="96">
</p>

<h1 align="center">AutoDraft</h1>

<p align="center">
  A desktop application that eliminates the administrative work of preparing client documents.<br>
  Clients fill out a single form, and AutoDraft procedurally generates every document they need, each one built dynamically to be exactly right for the information provided.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Work%20in%20Progress-orange" alt="Status: Work in Progress">
  <img src="https://img.shields.io/badge/Electron-47848F?logo=electron&logoColor=white" alt="Electron">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express 5">
  <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Cloudflare-R2%20%2B%20Workers-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare R2 and Workers">
</p>

<p align="center">
  📖 <a href="https://chrisraiz.github.io/AutoDraft/"><b>Documentation</b></a>: how it works, writing templates, architecture, and setup.
</p>

---

> [!IMPORTANT]
> **AutoDraft is a work in progress and is not a production deployment.**
> There are no live databases, storage buckets, or Cloudflare Workers provisioned for it, and parts of the interface use sample data. The project exists to demonstrate the design and engineering of an application built to grow into a large-scale production system: a desktop client, a REST API, and edge storage services, all structured to be deployed and scaled.

---

## Overview

Preparing document packages, such as a will set containing a Last Will & Testament, Powers of Attorney, a HIPAA Release, and so on, usually means copying the same client details into many documents by hand, adjusting each one to the client's situation, and having to duplicate sections based on the client's needs.

AutoDraft replaces that process:

1. **Templates are scanned.** Word templates are uploaded and scanned for fields written as `{{Category | Field}}` placeholders. Fields marked with `*` are detected as dynamic (repeatable); all others are static.
2. **Fields are configured.** Detected fields are organized into sections and mapped to the questions on the client form.
3. **Documents are grouped into sets.** Related templates are bundled into document sets that are generated together.
4. **Clients fill out a form.** Submissions are collected through JotForm and listed per client in the app.
5. **Documents are generated.** The client's answers are patched into every document in the set, conditional logic includes or excludes content so each document contains only what applies to that client, and *x* amount of dynamic sections are created based on the conditions for the set and the client's answers.

---

## Features

### Template Detection

- Upload `.docx` templates through the native file browser or drag and drop
- Scanning in the main process detects static and dynamic fields in every template
- Live, per-file scan progress with a smoothly animated progress bar

### Field Editor

- Fixed and dynamic field sections with section-level and page-level actions
- Filtering, plus input formatting for values like phone numbers and SSNs

### Document Sets & Generation

- Document set selection, and a set preview with drag-to-reorder
- A generator that produces every document in a set, with progress and completion displays

### Submissions & Dashboard

- Client and submission lists with update and delete actions
- Dashboard with statistic cards, line and bar charts, and recent documents

### Accounts & Teams

- Login with persistent sessions and password recovery
- Multi-step sign-up that creates a user and a team, with tiered packages

### Backend Services

- REST API for users, teams, tiers, documents, and fields
- File storage in Cloudflare R2, served by a Worker that authenticates requests with timestamped HMAC signatures

---

## Project Status

AutoDraft is under active development. Most of the interface and the core services are in place, and connecting them end to end is ongoing.

| Area                                           | Status                        |
| ---------------------------------------------- | ----------------------------- |
| Template upload and field detection            | ✅ Implemented                |
| Desktop app layout, navigation, and dashboard  | ✅ Implemented (sample data)  |
| Field editor, document sets, and submissions   | 🚧 In progress                |
| Document generation from live form submissions | 🚧 In progress                |
| Connecting the desktop app to the REST API     | 🚧 In progress                |
| REST API and R2 storage worker                 | ✅ Implemented (not deployed) |
| Hosted databases, storage, and workers         | ❌ Not provisioned            |
| Automated test coverage                        | ❌ Not started                |

---

## Tech Stack

| Layer               | Technology                                                             |
| ------------------- | ---------------------------------------------------------------------- |
| Desktop app         | Electron, React 18, TypeScript, Electron React Boilerplate (webpack)   |
| UI                  | CSS Modules, Chart.js, Motion, React DnD, React Router                 |
| Document processing | `word-extractor` (field detection), `docx` (document patching)         |
| Form submissions    | JotForm API                                                            |
| API                 | Node.js, Express 5, TypeScript                                         |
| Database            | MongoDB with Mongoose                                                  |
| File storage        | Cloudflare R2, accessed through the AWS S3 SDK and a Cloudflare Worker |
| Security            | bcrypt password hashing, HMAC-signed storage requests                  |

---

## Architecture

```
┌──────────────────────────┐        ┌──────────────────────┐        ┌──────────────┐
│  Desktop App (Electron)  │  HTTP  │   REST API (Express) │        │   MongoDB    │
│                          │ ─────► │                      │ ─────► │              │
│  React renderer          │        │  users · teams ·     │        │  users ·     │
│      ▲  typed IPC bridge │        │  tiers · documents · │        │  metadata ·  │
│      ▼                   │        │  fields              │        │  documents   │
│  Main process            │        └──────────┬───────────┘        └──────────────┘
│  (template scanning,     │                   │ HMAC-signed requests
│   document generation)   │                   ▼
└────────────┬─────────────┘        ┌──────────────────────┐        ┌──────────────┐
             │                      │  Cloudflare Worker   │ ─────► │ Cloudflare R2│
             │ form submissions     └──────────────────────┘        └──────────────┘
             ▼
        ┌─────────┐
        │ JotForm │
        └─────────┘
```

---

## Project Structure

```
.
├── docs/                     # Documentation site (GitHub Pages)
├── frontend/                 # Electron + React desktop app
│   ├── .erb/                 # Webpack configs and build scripts (Electron React Boilerplate)
│   ├── assets/               # App icons
│   ├── functions/            # Shared helpers (formatting, submission updates)
│   └── src/
│       ├── main/             # Main process: IPC handlers, template scanning, MongoDB and R2 clients
│       ├── renderer/         # React entry point and the typed preload bridge
│       ├── routes/           # Pages: dashboard, upload, editor, document sets, generator, submissions, login
│       ├── components/       # Reusable UI components
│       ├── data/             # Icons, chart datasets, JotForm connection, IPC message wrappers
│       └── types/            # Shared TypeScript types
├── backend/                  # Express REST API
│   ├── server.ts             # Entry point
│   └── app/
│       ├── config/           # Database connection settings
│       ├── connections/      # MongoDB connections
│       ├── models/           # Mongoose models
│       ├── controllers/      # Route handlers
│       ├── routes/           # API routes
│       └── utils/            # Validation, HMAC signing, error handling
└── r2-worker/                # Cloudflare Worker for R2 file storage
    └── src/
        ├── auth/             # HMAC request authentication
        ├── controllers/
        └── routes/
```

---

## Running It Locally

Because AutoDraft is not deployed, running the full system means supplying your own services: a MongoDB Atlas cluster, a Cloudflare account with an R2 bucket, and a JotForm API key.

**Requirements:** Node.js and npm.

```bash
git clone https://github.com/ChrisRaiz/AutoDraft.git
cd AutoDraft
```

### Desktop App

```bash
cd frontend
npm install
npm start
```

Other scripts: `npm run build`, `npm run package` (builds a distributable app), `npm run lint`, and `npm test`.

### REST API

```bash
cd backend
npm install
npm start
```

### R2 Worker

```bash
cd r2-worker
npm install
npm run dev       # run locally with Wrangler
npm run deploy    # deploy to Cloudflare
```

### Configuration

Secrets are never committed. Create these files locally:

<details>
<summary><code>backend/.env</code></summary>

```
PORT=
DB_USER=
DB_PASSWORD=
CLUSTER=
APP=
USERS_DB=
METADATA_DB=
DOCUMENTS_DB=
```

</details>

<details>
<summary><code>frontend/.env</code></summary>

```
JOTFORM_API_KEY=
CLOUDFLARE_ENDPOINT=
CLOUDFLARE_REGION=
CLOUDFLARE_ACCESS_KEY_ID=
CLOUDFLARE_SECRET_ACCESS_KEY=
```

</details>

<details>
<summary><code>r2-worker/.dev.vars</code> (use <code>wrangler secret put</code> for deployed secrets)</summary>

```
HMAC_SECRET=
AUTH_HEADER=
```

</details>

---

## Document Templates

Document templates are **not** included in this repository. They contain proprietary content, and `.gitignore` excludes them along with every `.doc` and `.docx` file. To try field detection, place your own templates in `frontend/src/data/templates/`, using the `{{Category | Field}}` placeholder syntax.
