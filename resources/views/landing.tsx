// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";

const styles = `
  :root { --bg:#0a0a0b; --panel:#131316; --line:rgba(255,255,255,.08);
    --ink:#e7e7ea; --dim:#9a9aa2; --faint:#6b6b73;
    --coral:#f4552e; --coral2:#f97b3d; --live:#3fdc8c; }
  * { box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body { margin:0; background:var(--bg); color:var(--ink);
    font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;
    -webkit-font-smoothing:antialiased; }
  a { color:inherit; }
  .wrap { max-width:1080px; margin:0 auto; padding:0 24px; }
  .mono { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; }

  nav { position:sticky; top:0; z-index:10; backdrop-filter:blur(12px);
    background:rgba(10,10,11,.72); border-bottom:1px solid var(--line); }
  nav .wrap { display:flex; align-items:center; gap:14px; height:60px; }
  .logo { width:30px; height:30px; border-radius:8px;
    background:linear-gradient(135deg,var(--coral),var(--coral2)); flex:none;
    display:grid; place-items:center; font-weight:800; color:#fff; }
  .brand { font-weight:700; letter-spacing:-.01em; }
  nav .spacer { flex:1; }
  nav a.ghost { color:var(--dim); text-decoration:none; font-size:14px; padding:8px 12px; }
  nav a.ghost:hover { color:var(--ink); }
  .btn { display:inline-block; background:var(--coral); color:#fff; text-decoration:none;
    font-weight:600; font-size:14px; padding:9px 16px; border-radius:9px; border:1px solid transparent; }
  .btn:hover { background:var(--coral2); }
  .btn.sec { background:transparent; border-color:var(--line); color:var(--ink); }
  .btn.sec:hover { border-color:var(--coral); }

  header.hero { padding:88px 0 48px; text-align:center; position:relative; overflow:hidden; }
  header.hero::before { content:""; position:absolute; inset:-40% 0 auto 0; height:520px;
    background:radial-gradient(60% 60% at 50% 0%, rgba(244,85,46,.16), transparent 70%); z-index:0; }
  .hero .wrap { position:relative; z-index:1; }
  .pill { display:inline-flex; align-items:center; gap:7px; font-size:13px; color:var(--dim);
    border:1px solid var(--line); border-radius:999px; padding:5px 12px; margin-bottom:22px; }
  .dot { width:7px; height:7px; border-radius:50%; background:var(--live); }
  h1 { font-size:clamp(34px,5.4vw,58px); line-height:1.04; letter-spacing:-.03em;
    margin:0 0 18px; font-weight:800; }
  h1 .grad { background:linear-gradient(120deg,var(--coral),var(--coral2)); -webkit-background-clip:text;
    background-clip:text; color:transparent; }
  .lede { font-size:clamp(17px,2.2vw,20px); color:var(--dim); max-width:620px; margin:0 auto 30px; }
  .cta { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-bottom:14px; }
  .install { margin-top:26px; display:inline-flex; align-items:center; gap:10px;
    background:var(--panel); border:1px solid var(--line); border-radius:10px; padding:11px 16px;
    font-size:14px; color:var(--ink); }
  .install .p { color:var(--coral); }

  .shot { margin:52px auto 0; max-width:1000px; border-radius:14px; overflow:hidden;
    border:1px solid var(--line); box-shadow:0 40px 120px -40px rgba(0,0,0,.9),0 0 0 1px rgba(255,255,255,.03);
    background:var(--panel); }
  .shot .bar { display:flex; align-items:center; gap:7px; padding:11px 14px; border-bottom:1px solid var(--line); }
  .shot .bar i { width:11px; height:11px; border-radius:50%; background:#3a3a40; display:inline-block; }
  .shot .bar i:nth-child(1){background:#ff5f57} .shot .bar i:nth-child(2){background:#febc2e} .shot .bar i:nth-child(3){background:#28c840}
  .shot .bar span { margin-left:10px; font-size:12px; color:var(--faint); }
  .shot img { display:block; width:100%; }

  section { padding:64px 0; border-top:1px solid var(--line); }
  .kicker { color:var(--coral); font-weight:700; font-size:13px; letter-spacing:.06em; text-transform:uppercase; }
  h2 { font-size:clamp(26px,3.4vw,36px); letter-spacing:-.02em; margin:8px 0 12px; font-weight:800; }
  .sub { color:var(--dim); max-width:620px; }

  .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:38px; }
  @media(max-width:820px){ .grid{grid-template-columns:1fr} }
  .card { background:var(--panel); border:1px solid var(--line); border-radius:13px; padding:22px; }
  .card .ic { width:34px; height:34px; border-radius:9px; background:rgba(244,85,46,.12);
    display:grid; place-items:center; margin-bottom:14px; font-size:17px; }
  .card h3 { margin:0 0 6px; font-size:17px; letter-spacing:-.01em; }
  .card p { margin:0; color:var(--dim); font-size:14.5px; }

  .split { display:grid; grid-template-columns:1fr 1fr; gap:44px; align-items:center; }
  @media(max-width:820px){ .split{grid-template-columns:1fr} }
  .split ul { list-style:none; padding:0; margin:20px 0 0; }
  .split li { padding:9px 0 9px 28px; position:relative; color:var(--dim); font-size:15px; }
  .split li::before { content:"→"; position:absolute; left:0; color:var(--coral); }
  .codeblock { background:#0e0e10; border:1px solid var(--line); border-radius:12px; padding:18px 20px;
    font-family:ui-monospace,Menlo,monospace; font-size:13.5px; line-height:1.9; overflow-x:auto; }
  .codeblock .c { color:var(--faint); } .codeblock .k { color:var(--coral2); } .codeblock .g { color:var(--live); }

  footer { border-top:1px solid var(--line); padding:44px 0; color:var(--faint); font-size:14px; }
  footer .wrap { display:flex; gap:16px; align-items:center; flex-wrap:wrap; }
  footer .spacer { flex:1; }
  footer a { color:var(--dim); text-decoration:none; } footer a:hover{color:var(--ink);}
`;

const F: FC<{ ic: string; title: string; children: string }> = ({ ic, title, children }) => (
  <div class="card">
    <div class="ic">{ic}</div>
    <h3>{title}</h3>
    <p>{children}</p>
  </div>
);

export const Landing: FC<{ shot: string; repo: string }> = ({ shot, repo }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Dply Local — the local dev environment for PHP & Laravel</title>
      <meta name="description" content="One daemon serves every .test site with trusted HTTPS, per-project PHP and Node, a built-in flame-graph profiler, and a live view of every subsystem. A native macOS app." />
      <meta property="og:title" content="Dply Local" />
      <meta property="og:description" content="Local PHP dev, done right: per-project PHP & Node, one-click SPX profiling, trusted .test HTTPS with no sudo, and a live System console." />
      <style>{styles}</style>
    </head>
    <body>
      <nav>
        <div class="wrap">
          <div class="logo">D</div>
          <div class="brand">Dply Local</div>
          <div class="spacer" />
          <a class="ghost" href="#features">Features</a>
          <a class="ghost" href="#profiler">Profiler</a>
          <a class="ghost" href="#system">System</a>
          <a class="btn sec" href={repo}>GitHub</a>
        </div>
      </nav>

      <header class="hero">
        <div class="wrap">
          <span class="pill"><span class="dot" /> 116 sites, one daemon — all running</span>
          <h1>Local PHP dev,<br /><span class="grad">without the yak-shaving.</span></h1>
          <p class="lede">
            One daemon serves every <code class="mono">.test</code> site with trusted HTTPS, per-project
            PHP &amp; Node, a built-in flame-graph profiler, and a live view of every subsystem —
            from a native macOS app.
          </p>
          <div class="cta">
            <a class="btn" href={repo}>Get it on GitHub</a>
            <a class="btn sec" href="#features">See what's inside</a>
          </div>
          <div class="install mono"><span class="p">$</span> dpl link . &nbsp;·&nbsp; <span style="color:var(--dim)">your project is now</span> myapp.test</div>

          <div class="shot">
            <div class="bar"><i /><i /><i /><span class="mono">Dply Local</span></div>
            <img src={shot} alt="The Dply Local dashboard: 116 sites running, services, workers, and system health at a glance." />
          </div>
        </div>
      </header>

      <section id="features">
        <div class="wrap">
          <span class="kicker">Everything local, nothing fiddly</span>
          <h2>The whole stack, managed for you</h2>
          <p class="sub">Link a folder and it's a site. dpl handles the DNS, the certificate, the PHP pool, and the ports — and shows you exactly what's happening.</p>
          <div class="grid">
            <F ic="🌐" title="Automatic .test + TLS">One command routes every .test domain and mints a trusted certificate from a local CA. Or opt into *.localhost — no resolver, no sudo for the DNS bits.</F>
            <F ic="🧩" title="Per-project PHP & Node">PHP 8.0–8.5 plus a frozen 7.4 legacy tier, one pool per version, isolated per repo. Node via fnm/nvm, pinned from a site's .nvmrc — switch with one click.</F>
            <F ic="🔥" title="Built-in SPX profiler">Flip profiling on for a site and every PHP-FPM request becomes a flame graph, served same-origin. No cookie, no per-request trigger.</F>
            <F ic="🔌" title="Ports 80/443, no root">launchd binds the privileged ports and hands them to the daemon — which never runs as root. Nothing for Docker or a VPN to flush.</F>
            <F ic="🐞" title="Xdebug, mail & dumps">Per-site Xdebug modes on their own pool. A built-in SMTP sink with per-site mailboxes and an HTML viewer. dump()/ray() captured to the app.</F>
            <F ic="📊" title="A live System console">Every subsystem — proxy, DNS, mail, PHP-FPM — with live status and real request traffic streaming, right in the app.</F>
          </div>
        </div>
      </section>

      <section id="profiler">
        <div class="wrap split">
          <div>
            <span class="kicker">One click, zero setup</span>
            <h2>Flame graphs for every request</h2>
            <p class="sub">Turn the profiler on for a site and dpl gives it a dedicated php-fpm pool with SPX loaded and auto-profiling. Your PATH php stays untouched.</p>
            <ul>
              <li>Every request captured — reload the page, read the flame graph</li>
              <li>Browsable same-origin, at the site's own URL</li>
              <li>Installs the right SPX build for that PHP version automatically</li>
            </ul>
          </div>
          <div class="codeblock">
            <span class="c"># turn it on for one site</span><br />
            <span class="k">dpl</span> profile on myapp<br />
            <span class="g">✓</span> every request is now captured<br /><br />
            <span class="c"># open the flame graphs</span><br />
            <span class="k">dpl</span> profile open myapp
          </div>
        </div>
      </section>

      <section id="system">
        <div class="wrap split">
          <div class="codeblock">
            <span class="c"># ~/.dpl/logs/access.log — live</span><br />
            [10:48:56] <span class="g">GET</span> /            200  <span class="c">528ms</span>  myapp.test<br />
            [10:48:56] <span class="g">GET</span> /products    404   70ms  myapp.test<br />
            [10:48:57] <span class="k">POST</span> /checkout   302  199ms  shop.test<br />
            [10:48:58] <span class="g">GET</span> /orders/42   200  233ms  shop.test
          </div>
          <div>
            <span class="kicker">See what's actually happening</span>
            <h2>A console for the whole daemon</h2>
            <p class="sub">The System panel lists every subsystem with live status, and streams real request traffic and logs — proxy, DNS, mail, dumps, and each PHP-FPM pool.</p>
            <ul>
              <li>Real access logs: method, path, status, timing, per site</li>
              <li>Per-subsystem live tail, filtered and follow-on-append</li>
              <li>Health at a glance — one green board means the stack is up</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div class="wrap" style="text-align:center">
          <span class="kicker">Ready when you are</span>
          <h2>Point it at a folder. That's the setup.</h2>
          <p class="sub" style="margin:0 auto 26px">A native macOS app plus a <code class="mono">dpl</code> CLI. Free and open source.</p>
          <div class="cta"><a class="btn" href={repo}>Get Dply Local</a></div>
        </div>
      </section>

      <footer>
        <div class="wrap">
          <div class="logo" style="width:24px;height:24px;font-size:13px">D</div>
          <span>Dply Local</span>
          <div class="spacer" />
          <a href={repo}>GitHub</a>
          <span>·</span>
          <span>Built with <a href="https://www.keeljs.com">Keel</a></span>
        </div>
      </footer>
    </body>
  </html>
);
