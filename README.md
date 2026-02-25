# Infonex Solutions Website

A complete static website with Python Flask server for easy deployment.

## Quick Start (Local)

```bash
# Install Flask (one time)
pip install flask

# Run the server
python server.py

# Open in browser
http://localhost:5000
```

## File Structure

```
infonex_website/
├── index.html          ← Main website (single page)
├── server.py           ← Python Flask server
├── requirements.txt    ← Python dependencies
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← All JavaScript
└── assets/             ← Add images/logos here
```

## Production Deployment

### Option A: VPS / Cloud Server (Ubuntu/Linux)
```bash
pip install flask gunicorn
gunicorn -w 4 -b 0.0.0.0:80 server:app
```

### Option B: Static Hosting (No Python needed)
Upload `index.html`, `css/`, `js/`, and `assets/` to:
- Netlify (free, drag & drop)
- Vercel (free)
- GitHub Pages (free)
- cPanel hosting (FTP upload)

### Option C: Render.com (Free Cloud)
1. Push to GitHub
2. Connect to render.com
3. Set start command: `gunicorn server:app`

## Environment Variables
- `PORT` — Port to run on (default: 5000)
- `DEBUG` — Enable debug mode (default: true, set false in production)

## Contact
Infonex Solutions |+254 711 4216505 or +254 795 800229 | infonexsolutions2@gmail.com
