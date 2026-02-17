# ⚡ Quick Start Guide

Get your game running in 10 minutes!

## Step 1: Supabase Setup (5 min)

1. Go to https://supabase.com → Sign in/up → **New Project**
2. Name it `llm-slm-game`, create password, choose region
3. Wait ~2 minutes for project to be ready
4. Click **SQL Editor** → **New Query** → Paste this:

```sql
CREATE TABLE votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  voter TEXT NOT NULL,
  vote TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on votes"
  ON votes FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX votes_question_id_idx ON votes(question_id);
```

5. Click **Run**
6. **Enable Realtime**: Go to **Database** → **Tables** → Find `votes` → Click the three dots (•••) → **Edit table** → Toggle on **Enable Realtime**
7. Go to **Settings** → **API** → Copy:
   - Project URL
   - anon public key

## Step 2: Configure App (1 min)

```bash
cd "/Users/jason/Projects/SLM vs LLM Game"
cp config.js.template config.js
```

Edit `config.js` and paste your Supabase credentials.

## Step 3: Deploy to Netlify (4 min)

### Option A: Drag & Drop (Easiest)

1. Go to https://app.netlify.com/drop
2. Drag your entire project folder
3. Done! You'll get a URL like `https://xxx.netlify.app`

### Option B: GitHub + Auto-Deploy

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create llm-slm-game --public --source=. --push
```

Then:
1. Go to https://app.netlify.com
2. **New site from Git** → Choose GitHub → Select repo
3. Deploy!

## Step 4: Play! 🎮

1. Open your Netlify URL (the host view)
2. Share screen on Teams
3. Players scan QR code or visit `/vote.html`
4. Start playing!

---

## Troubleshooting

**Votes not showing up?**
- Check `config.js` has correct Supabase credentials
- Check Supabase realtime is enabled for `votes` table
- Check browser console for errors

**Need help?** See full [DEPLOYMENT.md](DEPLOYMENT.md)
