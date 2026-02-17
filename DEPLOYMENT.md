# 🚀 Deployment Guide - Netlify + Supabase

This guide will walk you through deploying your LLM vs SLM game to Netlify with Supabase for real-time voting.

## Part 1: Set Up Supabase (5 minutes)

### 1. Create Supabase Project

1. Go to https://supabase.com
2. Sign in or create a free account
3. Click **"New Project"**
4. Fill in:
   - **Name**: `llm-slm-game`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your location
5. Click **"Create new project"** (takes ~2 minutes)

### 2. Create the Database Table

1. Once ready, click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Copy and paste this SQL:

```sql
-- Create votes table
CREATE TABLE votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  voter TEXT NOT NULL,
  vote TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Allow all operations (it's a game, not sensitive data)
CREATE POLICY "Allow all operations on votes"
  ON votes
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX votes_question_id_idx ON votes(question_id);
```

4. Click **"Run"** (or Cmd/Ctrl + Enter)

### 3. Enable Realtime

1. Click **"Database"** in the left sidebar
2. Click **"Tables"**
3. Find the **"votes"** table in the list
4. Click the three dots (•••) next to the votes table
5. Click **"Edit table"**
6. Toggle **"Enable Realtime"** to ON
7. Click **"Save"**

### 4. Get Your API Keys

1. Click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"**
3. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: `eyJhbGc...` (long string)

**Copy both of these** - you'll need them next!

---

## Part 2: Configure the App (2 minutes)

### 1. Update config.js

1. In your project folder, copy `config.js.template` to `config.js`:
   ```bash
   cp config.js.template config.js
   ```

2. Open `config.js` and replace:
   ```javascript
   const SUPABASE_URL = 'https://your-project.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGciOi...your-key-here';
   ```

3. Save the file

---

## Part 3: Deploy to Netlify (3 minutes)

### Option A: Deploy via GitHub (Recommended)

1. **Create GitHub repo**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: LLM vs SLM game"
   gh repo create llm-slm-game --public --source=. --push
   ```

2. **Go to Netlify**:
   - Visit https://netlify.com
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **"GitHub"** and select your repo
   - Build settings:
     - **Build command**: (leave empty)
     - **Publish directory**: `.`
   - Click **"Deploy site"**

3. **Add environment variables** (IMPORTANT):
   - In Netlify dashboard, go to **Site settings** → **Environment variables**
   - Click **"Add a variable"**
   - Add both:
     - `VITE_SUPABASE_URL` = your Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
   - These will be injected at build time

4. **Update config.js for production**:
   Edit `config.js` to use environment variables:
   ```javascript
   const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL_HERE';
   const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY_HERE';
   ```

5. **Redeploy**:
   - Commit and push changes
   - Netlify will auto-deploy

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

4. Follow the prompts:
   - Create a new site or link to existing
   - Publish directory: `.`

---

## Part 4: Test Your Deployment

1. **Open your Netlify URL** (e.g., `https://your-site.netlify.app`)
2. **Open the voting page** in another tab/phone: `https://your-site.netlify.app/vote.html`
3. **Test voting**:
   - Enter a name on the voting page
   - Click LLM or SLM
   - Vote should appear on the host screen in real-time!

---

## Troubleshooting

### Votes not appearing?

1. Check browser console for errors
2. Verify `config.js` has correct Supabase credentials
3. Check Supabase → Database → Replication that "votes" table has Realtime enabled
4. Check Supabase → API settings that both URL and key are correct

### "Failed to fetch" errors?

1. Check your internet connection
2. Verify Supabase project is running (not paused)
3. Check CORS settings in Supabase (should allow all by default)

### Realtime not working?

1. Make sure you enabled Realtime in Supabase (Part 1, Step 3)
2. Check browser console for WebSocket connection errors
3. Try refreshing both host and voting pages

---

## Your Live URLs

Once deployed, share these with your team:

- **Host View** (share on Teams): `https://your-site.netlify.app`
- **Voting Page** (scan QR or share link): `https://your-site.netlify.app/vote.html`

---

## Cost

- **Supabase**: Free tier (500MB database, 2GB bandwidth/month)
- **Netlify**: Free tier (100GB bandwidth/month)

Both are more than enough for team game sessions! 🎉
