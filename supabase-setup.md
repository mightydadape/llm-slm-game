# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to https://supabase.com
2. Sign in / Create account (free)
3. Click "New Project"
4. Fill in:
   - **Name**: llm-slm-game (or whatever you want)
   - **Database Password**: (create a strong password - save it!)
   - **Region**: Choose closest to you
5. Click "Create new project" (takes ~2 minutes)

## 2. Create the Database Table

Once your project is ready:

1. Click "SQL Editor" in the left sidebar
2. Click "New Query"
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

-- Enable Row Level Security (RLS)
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since this is a game, not sensitive data)
CREATE POLICY "Allow all operations on votes"
  ON votes
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX votes_question_id_idx ON votes(question_id);
```

4. Click "Run" (or press Cmd/Ctrl + Enter)

## 3. Enable Realtime

1. Click "Database" in the left sidebar
2. Click "Tables"
3. Find the "votes" table in the list
4. Click the three dots (•••) menu next to "votes"
5. Click "Edit table"
6. Toggle "Enable Realtime" to ON
7. Click "Save"

## 4. Get Your API Keys

1. Click "Settings" (gear icon) in the left sidebar
2. Click "API" under Project Settings
3. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (long string)

Copy both of these - you'll need them next!

## 5. Add to the Web App

Create a file called `.env` in your project folder with:

```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace the values with what you copied in step 4.

---

That's it! Once you complete these steps, let me know and I'll update the code to use your Supabase credentials.
