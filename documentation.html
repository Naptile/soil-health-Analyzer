<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Soil Health Analyzer — Project Documentation</title>
  <style>
    :root{
      --bg:#0f1724; /* dark navy */
      --card:#0b1220;
      --muted:#9aa4b2;
      --accent:#0ea5a0;
      --white:#ffffff;
      --glass: rgba(255,255,255,0.04);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    }

    html,body{height:100%;margin:0;background:linear-gradient(180deg,var(--bg) 0%, #071028 100%);color:var(--white);}
    .container{max-width:1000px;margin:36px auto;padding:28px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));box-shadow:0 8px 30px rgba(2,6,23,0.7);border-radius:12px;border:1px solid rgba(255,255,255,0.03);}    

    header{display:flex;align-items:center;gap:16px;margin-bottom:20px}
    .logo{width:64px;height:64px;border-radius:10px;background:var(--glass);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--white);box-shadow:inset 0 -2px 6px rgba(0,0,0,0.5)}
    h1{font-size:22px;margin:0}
    p.lead{color:var(--muted);margin-top:6px}

    .toc{background:transparent;padding:12px;border-radius:8px;margin:18px 0;border:1px dashed rgba(255,255,255,0.04)}
    .toc ul{margin:0;padding-left:18px;color:var(--muted)}

    section{margin:20px 0;padding:18px;background:linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.00));border-radius:10px;border:1px solid rgba(255,255,255,0.02)}
    h2{font-size:18px;margin:0 0 10px 0}
    h3{font-size:15px;margin:8px 0}
    pre{background:#071226;padding:12px;border-radius:8px;overflow:auto;color:var(--muted)}
    code{background:rgba(255,255,255,0.02);padding:2px 6px;border-radius:6px;color:var(--white)}

    .grid{display:grid;grid-template-columns:1fr 320px;gap:18px}
    .card{padding:14px;background:linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.00));border-radius:10px}

    .screenshot{width:100%;height:220px;background:linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));display:flex;align-items:center;justify-content:center;border-radius:8px;border:1px dashed rgba(255,255,255,0.04);color:var(--muted);}
    .screenshot small{display:block;margin-top:8px;color:var(--muted)}

    table{width:100%;border-collapse:collapse;color:var(--muted)}
    th,td{padding:8px;border-bottom:1px solid rgba(255,255,255,0.03);text-align:left}
    th{color:var(--white)}

    .badge{display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(14,165,160,0.12);color:var(--accent);font-weight:600}

    footer{margin-top:22px;color:var(--muted);font-size:13px;text-align:center}

    /* responsive */
    @media (max-width:980px){.grid{grid-template-columns:1fr} .screenshot{height:160px}}
    @media print{body{background:white;color:black} .container{box-shadow:none;border:0} .screenshot{border:1px solid #ccc}}
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo">SHA</div>
      <div>
        <h1>Soil Health Analyzer</h1>
        <p class="lead">Project documentation — describes the system, installation, API, architecture, and placeholders for screenshots.</p>
      </div>
    </header>

    <nav class="toc">
      <strong>Contents</strong>
      <ul>
        <li>Introduction</li>
        <li>Quick Start</li>
        <li>Project Structure</li>
        <li>Technologies</li>
        <li>API Endpoints</li>
        <li>How it Works (Flow)</li>
        <li>Architecture (diagram + explanation)</li>
        <li>Screenshots (placeholders)</li>
        <li>Deployment</li>
        <li>Future Enhancements</li>
        <li>Contact & License</li>
      </ul>
    </nav>

    <section id="introduction">
      <h2>Introduction</h2>
      <p>The <strong>Soil Health Analyzer</strong> is a web application that analyses soil images and returns a soil health score and diagnostics (texture, moisture indicator, and basic nutrient inference). It consists of a React front-end and a Node/Express backend that hosts the analysis model or forwards images to an ML service.</p>
    </section>

    <section class="grid">
      <div>
        <section id="quickstart">
          <h2>Quick Start</h2>
          <h3>Prerequisites</h3>
          <ul>
            <li>Node.js v14+ and npm</li>
            <li>Modern browser (Chrome, Firefox, Edge)</li>
            <li>Optional: Python environment if ML runs in a Python service</li>
          </ul>

          <h3>Install & Run</h3>
          <pre>
# from project root
npm install
npm run dev   # starts the React frontend

# in /server
cd server
npm install
node index.js    # or npm run start
          </pre>

          <h3>Notes</h3>
          <ul>
            <li>By default the front-end expects the backend API at <code>/api</code>. Adjust <code>src/config</code> or environment variables if needed.</li>
            <li>Replace placeholder ML endpoints with your deployed model URL or local Python microservice.</li>
          </ul>
        </section>

        <section id="project-structure">
          <h2>Project Structure</h2>
          <pre>
soil-health-Analyzer-main/
├─ public/              # static files
├─ src/                 # React app
├─ server/              # Backend (Express) + ML glue
├─ images/              # assets & example screenshots
├─ package.json
├─ tailwind.config.js
          </pre>
        </section>

        <section id="technologies">
          <h2>Technologies</h2>
          <table>
            <thead><tr><th>Layer</th><th>Technology</th></tr></thead>
            <tbody>
              <tr><td>Frontend</td><td>React, Tailwind CSS, Vite (or CRA)</td></tr>
              <tr><td>Backend</td><td>Node.js, Express</td></tr>
              <tr><td>ML</td><td>Python (TensorFlow / PyTorch) or a Node-integrated model</td></tr>
              <tr><td>Storage</td><td>Local file store or cloud storage (S3/GCS)</td></tr>
              <tr><td>Optional</td><td>Postgres / MongoDB for user & results persistence</td></tr>
            </tbody>
          </table>
        </section>

        <section id="api">
          <h2>API Endpoints</h2>
          <table>
            <thead><tr><th>Endpoint</th><th>Method</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td><code>/api/analyze</code></td><td>POST</td><td>Upload image; returns analysis JSON</td></tr>
              <tr><td><code>/api/status</code></td><td>GET</td><td>Healthcheck for backend</td></tr>
              <tr><td><code>/api/results/:id</code></td><td>GET</td><td>Retrieve past analysis by id</td></tr>
            </tbody>
          </table>

          <h3>Example (curl)</h3>
          <pre>
curl -F "image=@mysoil.jpg" http://localhost:5000/api/analyze
          </pre>
        </section>

        <section id="how-it-works">
          <h2>How Soil Analysis Works</h2>
          <ol>
            <li>User uploads an image via the web UI.</li>
            <li>Front-end sends multipart/form-data to <code>/api/analyze</code>.</li>
            <li>Backend stores the image temporarily and forwards it to the ML model/service (local or remote).</li>
            <li>ML model inspects color channels, texture patterns, and optionally runs a trained classifier/regressor to predict moisture/nutrient hints.</li>
            <li>Backend composes a JSON result and returns it to the front-end.</li>
          </ol>
        </section>

        <section id="deployment">
          <h2>Deployment</h2>
          <p>Suggested deployment pattern:</p>
          <ol>
            <li>Build front-end (<code>npm run build</code>) and serve from a static host (Netlify, Vercel) or behind the backend as static files.</li>
            <li>Host backend on Heroku / Render / VPS. If ML model is heavy, run it in a separate Python service or container and expose a gRPC/HTTP endpoint.</li>
            <li>Use cloud storage for images and secure the API with API keys / JWT authentication.</li>
          </ol>
        </section>

      </div>

      <aside>
        <div class="card">
          <h3>Architecture (Overview)</h3>
          <p class="s-muted">High-level components</p>
          <div style="margin-top:10px">
            <!-- Inline simple SVG diagram placeholder -->
            <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <style> .node { fill:#071226; stroke:rgba(255,255,255,0.06); } .label{font-size:12px; fill:var(--muted);} .accent{fill:var(--accent);} </style>
              </defs>
              <rect x="12" y="18" width="110" height="46" rx="8" class="node"/>
              <text x="68" y="46" text-anchor="middle" class="label">Frontend (React)</text>

              <rect x="145" y="18" width="110" height="46" rx="8" class="node"/>
              <text x="200" y="46" text-anchor="middle" class="label">Backend (Express)</text>

              <rect x="278" y="18" width="110" height="46" rx="8" class="node"/>
              <text x="333" y="46" text-anchor="middle" class="label">ML Service</text>

              <line x1="122" y1="41" x2="145" y2="41" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>
              <line x1="255" y1="41" x2="278" y2="41" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>

              <rect x="160" y="110" width="150" height="46" rx="8" class="node"/>
              <text x="235" y="139" text-anchor="middle" class="label">Storage (S3 / Disk)</text>

              <line x1="200" y1="64" x2="235" y2="110" stroke="rgba(255,255,255,0.04)" stroke-width="1.2"/>
            </svg>

            <p style="font-size:13px;color:var(--muted);margin-top:8px">Diagram: Frontend → Backend → ML Service. Storage sits as a shared artifact store for images and results. For scale, run ML in a separate container or serverless function.</p>
          </div>
        </div>

        <div class="card" style="margin-top:14px">
          <h3>Quick Tips</h3>
          <ul>
            <li>Validate images on the client (size/type) before upload.</li>
            <li>Use async worker queues for long-running ML tasks (Bull, Redis).</li>
            <li>Cache recent results to reduce repeated analyses.</li>
          </ul>
        </div>

        <div class="card" style="margin-top:14px">
          <h3>Status</h3>
          <p><span class="badge">Prototype</span></p>
          <p style="color:var(--muted);font-size:13px">Replace badges when moving to staging / production.</p>
        </div>
      </aside>
    </section>

    <section id="screenshots">
      <h2>Screenshots (Placeholders)</h2>
      <p>Replace the images in <code>/images</code> and update the <code>src</code> attributes below with the final screenshots.</p>

      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <figure style="flex:1 1 320px">
          <div class="screenshot">
            <div>
              <strong>Screenshot Placeholder — Upload screen</strong>
              <small>Replace with <code>images/screenshot-upload.png</code></small>
            </div>
          </div>
        </figure>

        <figure style="flex:1 1 320px">
          <div class="screenshot">
            <div>
              <strong>Screenshot Placeholder — Analysis result</strong>
              <small>Replace with <code>images/screenshot-result.png</code></small>
            </div>
          </div>
        </figure>

      </div>

      <p style="margin-top:12px;color:var(--muted)">Tip: include an annotated screenshot that points to the health score, suggested actions, and any confidence metrics returned by the model.</p>
    </section>

    <section id="future">
      <h2>Future Enhancements</h2>
      <ul>
        <li>Integrate a trained nutrient detection model (NPK estimation).</li>
        <li>Mobile app and offline inference.</li>
        <li>User accounts, history, and result-sharing features.</li>
        <li>Automated dataset collection pipeline to improve model accuracy.</li>
      </ul>
    </section>

    <section id="contact">
      <h2>Contact & License</h2>
      <p>Author: <strong>Naptile Peter</strong></p>
      <p>License: <code>MIT</code> (or replace with your preferred license). Add a <code>LICENSE</code> file at the repo root.</p>
    </section>

    <footer>
      Generated documentation • Edit this HTML file, add real screenshots, and host alongside your repository.
    </footer>
  </div>
</body>
</html>
