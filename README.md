# AutoDraft

AutoDraft removes the administrative work of preparing client documents. Instead of filling out paperwork by hand, clients complete a form, and AutoDraft procedurally generates every document they need from their answers.

Each generated document is built dynamically: sections, wording, and fields are included, excluded, or populated based on exactly what the client provided, so the output is correct for that client without manual editing.

## How it works

1. **Templates are uploaded and scanned.** Word (`.docx`) templates are uploaded in the desktop app, which scans each one and detects its fields using the `{{Category | Field}}` placeholder syntax. Fields marked with `*` are treated as dynamic (repeatable) fields; all others are static.
2. **Fields are configured.** In the field editor, detected fields are organized into sections and mapped to the questions on the client form.
3. **Documents are grouped into sets.** Related templates (for example, a will package: Last Will & Testament, Power of Attorney, HIPAA Release, Living Will) are grouped into document sets.
4. **Clients fill out a form.** Client submissions are collected through JotForm and appear in the app alongside their status.
5. **Documents are generated.** For each submission, AutoDraft patches the client's answers into every document in the selected set, applying conditional logic so each document contains only what applies to that client.

## Repository structure

| Directory    | Description |
|--------------|-------------|
| `frontend/`  | Electron + React desktop app (built on Electron React Boilerplate). Handles template upload and field detection, the field editor, document sets, submissions, and document generation. |
| `backend/`   | Express + TypeScript REST API backed by MongoDB. Manages users, teams, subscription tiers, documents, fields, and signed R2 storage requests. |
| `r2-worker/` | Cloudflare Worker that stores and serves files in an R2 bucket, authenticating requests with HMAC signatures. |

## Getting started

### Prerequisites

- Node.js and npm
- A MongoDB Atlas cluster
- A Cloudflare account with an R2 bucket (for `r2-worker`)
- A JotForm account and API key

### Frontend (desktop app)

```bash
cd frontend
npm install
npm start
```

Other scripts: `npm run build`, `npm run package` (creates a distributable app), `npm run lint`, and `npm test`.

### Backend (API)

```bash
cd backend
npm install
npm start
```

### R2 worker

```bash
cd r2-worker
npm install
npm run dev      # run locally
npm run deploy   # deploy to Cloudflare
```

## Configuration

Secrets are never committed. Create the following files locally.

**`backend/.env`**

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

**`frontend/.env`**

```
JOTFORM_API_KEY=
CLOUDFLARE_ENDPOINT=
CLOUDFLARE_REGION=
CLOUDFLARE_ACCESS_KEY_ID=
CLOUDFLARE_SECRET_ACCESS_KEY=
```

**`r2-worker/.dev.vars`** (use `wrangler secret put` for deployed secrets)

```
HMAC_SECRET=
AUTH_HEADER=
```

## Document templates

Document templates are **not** stored in this repository. They contain proprietary and client-specific content, and `.gitignore` excludes them (along with all `.doc`/`.docx` files). Place templates locally in `frontend/src/data/templates/`, where the desktop app reads them.
