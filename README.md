# 🤖 LLM vs SLM Guessing Game 🧠

A fun interactive game where teams guess whether a response came from a Large Language Model (LLM) or a Small Language Model (SLM).

## How It Works

1. **Host View**: Shows prompts, responses, and live voting results
2. **Player Voting**: Participants scan QR code or visit URL to cast their votes
3. **Real-time Updates**: Votes appear instantly on the host screen via Supabase Realtime
4. **Reveal**: Host reveals the correct answer and scores

## 🚀 Quick Start

### Deployment (Recommended - Netlify + Supabase)

**Perfect for team games - no firewall issues!**

1. **Set up Supabase** (5 min) - See [DEPLOYMENT.md](DEPLOYMENT.md)
2. **Configure credentials** - Update `config.js`
3. **Deploy to Netlify** (3 min) - Free hosting with real-time updates

👉 **[Full Deployment Guide](DEPLOYMENT.md)**

### Local Development (Optional)

If you want to run locally for testing:

```bash
npm install
npm start
```

Note: Local server requires all devices on same network

## Playing the Game

1. **Host**: Open the host URL in your browser and share your screen on Teams
2. **Players**:
   - Scan the QR code displayed on screen, OR
   - Navigate to the voting URL on their phones/computers
   - Enter their name
   - Vote LLM or SLM for each round
3. **Host Controls**:
   - **Reveal Answer**: Shows the correct answer and scores
   - **Next**: Move to the next question
   - **Previous**: Go back to previous question
   - **Reset Votes**: Clear all votes for current question

## Game Data

The game includes 15 carefully curated prompt-response pairs:
- Factual questions
- Creative writing
- Logic puzzles
- Jokes

Responses from:
- **LLM**: High-quality Claude responses
- **SLM**: deepseek-r1:1.5b via Ollama (often verbose with "thinking" sections)

## Technical Details

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Supabase (PostgreSQL + Realtime)
- **Hosting**: Netlify (static site hosting)
- **Real-time**: Supabase Realtime (WebSocket) for instant vote updates
- **QR Codes**: Automatic generation for easy player access

### Two Deployment Options

1. **Netlify + Supabase** (Recommended):
   - Files: `index-supabase.html`, `vote-supabase.html`
   - No server needed, works anywhere
   - See [DEPLOYMENT.md](DEPLOYMENT.md)

2. **Local Node.js Server**:
   - Files: `index.html`, `vote.html`, `server.js`
   - Requires same network
   - Run with `npm start`

## File Structure

```
.
├── index-supabase.html     # Host view (Netlify version)
├── vote-supabase.html      # Player voting (Netlify version)
├── config.js               # Supabase credentials
├── game_data.json          # 15 curated Q&A pairs
├── netlify.toml            # Netlify configuration
├── DEPLOYMENT.md           # Deployment guide
├── supabase-setup.md       # Supabase setup instructions
│
├── index.html              # Host view (local server version)
├── vote.html               # Player voting (local server version)
├── server.js               # Node.js server (for local use)
├── package.json            # Dependencies
└── README.md               # This file
```

## Tips

- Make sure all devices are on the same network
- Test the voting URL before the game starts
- Use the "Reset Votes" button between questions if needed
- The game randomly chooses LLM or SLM responses to keep it unpredictable

Enjoy the game! 🎮
