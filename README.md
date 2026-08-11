# Web Development Info — login-protected site

A small Next.js site that explains "What is Web Development," gated behind
Supabase magic-link (passwordless) auth.

- `/login` — enter your email, get a magic link
- `/` — homepage (protected)
- `/about` — more detail on frontend/backend (protected)
- Visiting `/` or `/about` while logged out redirects to `/login`
- Logged-in users get a "Log out" button in the header

---

## 1. Run it locally (optional, to test before deploying)

```bash
npm install
cp .env.local.example .env.local
# fill in .env.local with your real Supabase values (see step 4 below)
npm run dev
```

Visit `http://localhost:3000`.

---

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create webdev-info --public --source=. --push
# or create the repo on github.com and follow its "push an existing repo" instructions
```

---

## 3. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import the GitHub repo you just pushed
3. Framework preset should auto-detect as **Next.js** — leave defaults
4. **Don't deploy yet if you haven't set env vars** — or deploy once now and
   redeploy after step 5 below. Either order works.

---

## 4. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**
2. Once it's created, go to **Project Settings → API**
3. Copy:
   - **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 5. Connect Supabase to your deployed site

In your **Vercel project → Settings → Environment Variables**, add:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon public key |

Add them for all environments (Production, Preview, Development), then go to
**Deployments** and **redeploy** — env var changes don't apply to already-built
deployments.

---

## 6. Set up Supabase Auth

1. **Supabase → Authentication → Providers** — confirm **Email** is enabled
   (it is by default).
2. **Supabase → Authentication → URL Configuration**:
   - **Site URL**: your live Vercel URL, e.g. `https://webdev-info.vercel.app`
   - **Redirect URLs**: add `https://webdev-info.vercel.app/auth/callback`
     (and `http://localhost:3000/auth/callback` too if you want local testing
     to work)

This is the step that's easy to forget — if you skip it, your login emails
will link to `localhost` instead of your live site.

---

## 7. Test the full flow

1. Visit your live Vercel URL → you should land on `/login`
2. Enter your email → you should see "Check your email for a login link"
3. Open your inbox (check spam) → click the link
4. You should land on the homepage, logged in
5. Open an incognito window and try visiting the homepage URL directly →
   you should get redirected to `/login`
6. Try logging in with the same email from a second browser/device → it
   should work independently

---

## How the auth flow works (for reference)

1. `/login` calls `supabase.auth.signInWithOtp({ email })` — this is the
   magic-link method, no password involved.
2. Supabase emails a link pointing at `/auth/callback` on your site.
3. `app/auth/callback/route.ts` exchanges the one-time code in that link for
   a real session (stored in cookies), then redirects to `/`.
4. `middleware.ts` runs on every request. It checks for a valid session and
   redirects logged-out users away from `/` and `/about` back to `/login`.
5. The "Log out" button in the header calls `supabase.auth.signOut()`.

## Project structure

```
app/
  layout.tsx           root layout
  page.tsx              homepage (protected)
  about/page.tsx         about page (protected)
  login/page.tsx          login page with email form
  auth/callback/route.ts   exchanges magic-link code for a session
components/
  SiteHeader.tsx         nav + logout button
lib/supabase/
  client.ts              browser Supabase client
  server.ts               server Supabase client
  middleware.ts            session refresh + route protection logic
middleware.ts             wires middleware.ts helper into Next.js
```
