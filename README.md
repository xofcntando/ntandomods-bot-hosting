# Ntandomods — Multi-Host WhatsApp Bots for Render

A one-stop hosting site for deploying **mruniquehacker's** WhatsApp bots to [Render.com](https://render.com) with a single click.

> 🌐 **Live site:** [Ntandomods Bot Hosting](https://github.com/mruniquehacker)

## 🤖 Hosted Bots

| Bot | Prefix | Session Method | Repo |
|---|---|---|---|
| **Knightbot-MD** | `.` | `creds.json` in `session/` folder | [mruniquehacker/Knightbot-md](https://github.com/mruniquehacker/Knightbot-md) |
| **KnightBot-Mini** | `,` | `SESSION_ID` env var | [mruniquehacker/KnightBot-Mini](https://github.com/mruniquehacker/KnightBot-Mini) |

## ✨ Features

- **One-click Deploy to Render** buttons for both bots
- **Step-by-step deployment guide** — fork, pair code, deploy, go live
- **Copy-paste `render.yaml` blueprint** (the bots don't ship one)
- **Deploy Link Generator** — build a Render deploy-button link for any fork
- **Environment variables reference** for both bots
- **FAQ** — pair codes, free tier sleep, build fixes, auto-deploy
- Dark neon theme, fully responsive, zero dependencies (pure HTML/CSS/JS)

## 🚀 Run Locally

```bash
git clone https://github.com/<your-user>/<this-repo>.git
cd <this-repo>
python3 -m http.server 8000
# open http://localhost:8000
```

Or just open `index.html` directly in your browser — it's fully static.

## 📁 Structure

```
├── index.html          # Main page (all sections)
├── css/
│   └── style.css       # Dark neon theme
├── js/
│   └── main.js         # Nav, FAQ accordion, copy buttons, generator
└── assets/
    ├── logo.png        # Ntandomods knight emblem
    ├── knightbot-md.jpg
    └── knightbot-mini.jpg
```

## 🔗 Community

- Telegram: https://t.me/+3QhFUZHx-nhhZmY1
- WhatsApp Channel: https://whatsapp.com/channel/0029Va90zAnIHphOuO8Msp3A
- YouTube Tutorial: https://youtu.be/-oz_u1iMgf8

## ⚠️ Disclaimer

This is an unofficial community hosting site by Ntandomods. WhatsApp is a trademark of Meta Platforms Inc. The bots use unofficial APIs (Baileys) and are intended for educational purposes. Use at your own risk — accounts may be banned.
