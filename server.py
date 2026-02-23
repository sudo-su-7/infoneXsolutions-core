#!/usr/bin/env python3
"""
Infonex Solutions Website Server
---------------------------------
Run:  python server.py
Then: open http://localhost:5000 in your browser

For production deployment on a VPS/Linux server:
  pip install flask gunicorn
  gunicorn -w 4 -b 0.0.0.0:80 server:app
"""

import os
from flask import Flask, send_from_directory, render_template_string

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(
    __name__,
    static_folder=BASE_DIR,
    template_folder=BASE_DIR
)

@app.route('/')
def index():
    return send_from_directory(BASE_DIR, 'index.html')

@app.route('/css/<path:filename>')
def css(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'css'), filename)

@app.route('/js/<path:filename>')
def js(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'js'), filename)

@app.route('/assets/<path:filename>')
def assets(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'assets'), filename)

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(BASE_DIR, 'index.html'), 200  # SPA fallback

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('DEBUG', 'true').lower() == 'true'
    print(f"""
╔══════════════════════════════════════════════════════╗
║          INFONEX SOLUTIONS — Website Server          ║
╠══════════════════════════════════════════════════════╣
║  Local:   http://localhost:{port:<27}║
║  Network: http://0.0.0.0:{port:<28}║
║                                                      ║
║  Press CTRL+C to stop                                ║
╚══════════════════════════════════════════════════════╝
    """)
    app.run(host='0.0.0.0', port=port, debug=debug)
