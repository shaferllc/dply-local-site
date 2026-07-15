// @jsxRuntime automatic
// @jsxImportSource hono/jsx
import type { FC } from "hono/jsx";

const styles = `
  :root{
    --bg:#070709; --panel:#0e0e12; --panel2:#131318; --line:rgba(255,255,255,.07);
    --ink:#f0f0f3; --dim:#8c8c96; --faint:#5c5c66;
    --coral:#f4552e; --coral2:#ff7a45; --green:#43e08d; --amber:#f7b955; --violet:#8b7bf0;
  }
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;background:var(--bg);color:var(--ink);
    font:400 16px/1.6 "Inter",ui-sans-serif,system-ui,sans-serif;
    -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;overflow-x:hidden}
  a{color:inherit;text-decoration:none}
  .mono,code{font-family:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace}
  
  .wrap{max-width:1140px;margin:0 auto;padding:0 24px;position:relative;z-index:1}

  /* dotted grid + glow backdrop */
  body::before{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;
    background-image:radial-gradient(circle at 1px 1px, rgba(255,255,255,.045) 1px, transparent 0);
    background-size:26px 26px;mask-image:radial-gradient(100% 60% at 50% 0%, #000 30%, transparent 75%)}
  body::after{content:"";position:fixed;top:-260px;left:50%;transform:translateX(-50%);
    width:1100px;height:620px;z-index:0;pointer-events:none;
    background:radial-gradient(50% 50% at 50% 50%, rgba(244,85,46,.20), transparent 70%);filter:blur(20px)}

  nav{position:sticky;top:0;z-index:20;backdrop-filter:blur(14px);
    background:rgba(7,7,9,.6);border-bottom:1px solid var(--line)}
  nav .wrap{display:flex;align-items:center;gap:16px;height:62px}
  img.logo{width:30px;height:30px;border-radius:8px;flex:none;display:block;
    box-shadow:0 6px 20px -8px rgba(244,85,46,.6)}
  .brand{font-weight:700;letter-spacing:-.03em;font-size:16px}
  nav .sp{flex:1}
  nav a.lnk{color:var(--dim);font-size:14px;padding:8px 10px}
  nav a.lnk:hover{color:var(--ink)}
  .btn{display:inline-flex;align-items:center;gap:8px;background:var(--coral);color:#fff;
    font-weight:600;font-size:14px;padding:10px 17px;border-radius:10px;border:1px solid transparent;
    box-shadow:0 8px 24px -10px rgba(244,85,46,.8);transition:transform .12s,background .12s}
  .btn:hover{background:var(--coral2);transform:translateY(-1px)}
  .btn.ghost{background:transparent;border-color:var(--line);color:var(--ink);box-shadow:none}
  .btn.ghost:hover{border-color:var(--coral)}

  /* hero */
  header{padding:74px 0 40px}
  .hgrid{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center}
  @media(max-width:900px){.hgrid{grid-template-columns:1fr;gap:34px}}
  .eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;color:var(--dim);
    border:1px solid var(--line);border-radius:999px;padding:5px 12px;margin-bottom:22px}
  .blink{width:7px;height:7px;border-radius:50%;background:var(--green);
    box-shadow:0 0 0 0 rgba(67,224,141,.6);animation:pulse 2s infinite}
  @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(67,224,141,.5)}70%{box-shadow:0 0 0 7px rgba(67,224,141,0)}100%{box-shadow:0 0 0 0 rgba(67,224,141,0)}}
  h1{font-family:'Inter',ui-sans-serif,system-ui,sans-serif;font-size:clamp(38px,5.6vw,64px);line-height:1.0;letter-spacing:-.045em;margin:0 0 20px;font-weight:800}
  h1 .g{background:linear-gradient(115deg,var(--coral),var(--coral2) 60%,var(--amber));
    -webkit-background-clip:text;background-clip:text;color:transparent}
  .lede{font-size:clamp(16px,1.9vw,19px);color:var(--dim);max-width:520px;margin:0 0 28px}
  .cta{display:flex;gap:12px;flex-wrap:wrap}
  .ver{margin-top:16px;font-size:12.5px;color:var(--faint)}
  .stats{display:flex;gap:36px;margin-top:34px;flex-wrap:wrap}
  .stats b{display:block;font-size:28px;font-weight:800;letter-spacing:-.02em;
    background:linear-gradient(120deg,var(--coral),var(--coral2));-webkit-background-clip:text;background-clip:text;color:transparent}
  .stats span{font-size:12.5px;color:var(--dim)}

  /* live console card */
  .console{background:linear-gradient(180deg,var(--panel2),var(--panel));border:1px solid var(--line);
    border-radius:16px;overflow:hidden;box-shadow:0 40px 100px -40px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.04)}
  .console .top{display:flex;align-items:center;gap:7px;padding:12px 15px;border-bottom:1px solid var(--line)}
  .console .top i{width:11px;height:11px;border-radius:50%;background:#33333c}
  .console .top i:nth-child(1){background:#ff5f57}.console .top i:nth-child(2){background:#febc2e}.console .top i:nth-child(3){background:#28c840}
  .console .top b{margin-left:8px;font:12px 'JetBrains Mono',ui-monospace,monospace;color:var(--faint);font-weight:500}
  .term{padding:18px 18px 8px;font:400 13px/1.85 'JetBrains Mono',ui-monospace,monospace;min-height:120px}
  .term .l{opacity:0;animation:rise .5s forwards}
  .term .l:nth-child(1){animation-delay:.3s}.term .l:nth-child(2){animation-delay:1.1s}
  .term .l:nth-child(3){animation-delay:2.0s}.term .l:nth-child(4){animation-delay:2.8s}
  @keyframes rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  .term .p{color:var(--coral)}.term .ok{color:var(--green)}.term .d{color:var(--faint)}
  .term .cur{display:inline-block;width:8px;height:15px;background:var(--coral);vertical-align:-2px;
    margin-left:3px;animation:blink 1.1s steps(1) infinite}
  @keyframes blink{50%{opacity:0}}
  .logstrip{border-top:1px solid var(--line);height:132px;overflow:hidden;position:relative;
    background:rgba(0,0,0,.25)}
  .logstrip .roll{padding:10px 16px;font:11.5px/2.15 'JetBrains Mono',ui-monospace,monospace;color:var(--dim);
    animation:roll 12s linear infinite}
  @keyframes roll{from{transform:translateY(0)}to{transform:translateY(-50%)}}
  .logstrip .ts{color:var(--faint)}.logstrip .m{color:var(--green)}.logstrip .mp{color:var(--amber)}
  .logstrip .s2{color:var(--coral)}.logstrip .h{color:var(--violet)}
  .logstrip::after{content:"";position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(180deg,var(--panel) 0%,transparent 22%,transparent 78%,var(--panel) 100%)}

  /* big screenshot */
  .showcase{margin-top:64px;perspective:2000px}
  .frame{border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--panel);
    box-shadow:0 60px 140px -50px rgba(0,0,0,.95),0 0 0 1px rgba(255,255,255,.03);
    transform:rotateX(6deg) scale(.99);transform-origin:50% 0;transition:transform .5s cubic-bezier(.2,.7,.2,1)}
  .frame:hover{transform:none}
  .frame .bar{display:flex;align-items:center;gap:7px;padding:12px 15px;border-bottom:1px solid var(--line)}
  .frame .bar i{width:11px;height:11px;border-radius:50%;background:#33333c}
  .frame .bar i:nth-child(1){background:#ff5f57}.frame .bar i:nth-child(2){background:#febc2e}.frame .bar i:nth-child(3){background:#28c840}
  .frame .bar b{margin-left:9px;font:12px 'JetBrains Mono',ui-monospace,monospace;color:var(--faint);font-weight:500}
  .frame img{display:block;width:100%}

  section{padding:76px 0;position:relative}
  .kick{color:var(--coral);font:600 12px/1 'JetBrains Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase}
  h2{font-family:'Inter',ui-sans-serif,system-ui,sans-serif;font-size:clamp(27px,3.6vw,40px);letter-spacing:-.035em;margin:12px 0 12px;font-weight:800;line-height:1.04}
  .sub{color:var(--dim);max-width:560px;font-size:16px}

  /* bento */
  .bento{display:grid;grid-template-columns:repeat(6,1fr);gap:16px;margin-top:40px}
  @media(max-width:900px){.bento{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:560px){.bento{grid-template-columns:1fr}}
  .cell{background:linear-gradient(180deg,var(--panel2),var(--panel));border:1px solid var(--line);
    border-radius:15px;padding:24px;position:relative;overflow:hidden;transition:border-color .2s,transform .2s}
  .cell:hover{border-color:rgba(244,85,46,.4);transform:translateY(-2px)}
  .cell::before{content:"";position:absolute;top:-1px;left:24px;right:24px;height:1px;
    background:linear-gradient(90deg,transparent,rgba(244,85,46,.5),transparent);opacity:0;transition:opacity .2s}
  .cell:hover::before{opacity:1}
  .span3{grid-column:span 3}.span2{grid-column:span 2}
  @media(max-width:900px){.span3,.span2{grid-column:span 1}}
  .cell .ic{font-size:20px;margin-bottom:14px;display:inline-grid;place-items:center;width:38px;height:38px;
    border-radius:10px;background:rgba(244,85,46,.12);border:1px solid rgba(244,85,46,.18)}
  .cell h3{margin:0 0 7px;font-size:17px;letter-spacing:-.01em}
  .cell p{margin:0;color:var(--dim);font-size:14.5px}

  .split{display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:center}
  @media(max-width:900px){.split{grid-template-columns:1fr;gap:30px}}
  .split ul{list-style:none;padding:0;margin:22px 0 0}
  .split li{padding:9px 0 9px 26px;position:relative;color:var(--dim);font-size:15px}
  .split li::before{content:"→";position:absolute;left:0;color:var(--coral)}
  .code{background:#0a0a0d;border:1px solid var(--line);border-radius:14px;padding:20px 22px;
    font:400 13px/1.95 'JetBrains Mono',ui-monospace,monospace;overflow-x:auto;box-shadow:inset 0 1px 0 rgba(255,255,255,.03)}
  .code .c{color:var(--faint)}.code .k{color:var(--coral2)}.code .g{color:var(--green)}.code .a{color:var(--amber)}.code .v{color:var(--violet)}

  .final{text-align:center;border-top:1px solid var(--line);border-bottom:1px solid var(--line);
    background:radial-gradient(60% 100% at 50% 100%, rgba(244,85,46,.1), transparent 70%)}
  footer{padding:44px 0;color:var(--faint);font-size:14px}
  footer .wrap{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
  footer .sp{flex:1}
  footer a{color:var(--dim)}footer a:hover{color:var(--ink)}
  .divide{border:0;border-top:1px solid var(--line);margin:0}

  .road{display:grid;grid-template-columns:1fr 1fr;gap:0 40px;margin-top:38px;border-top:1px solid var(--line)}
  @media(max-width:760px){.road{grid-template-columns:1fr}}
  .ri{display:flex;gap:16px;padding:18px 0;border-bottom:1px solid var(--line);align-items:flex-start}
  .ri .n{font:600 12px/1.6 'JetBrains Mono',monospace;color:var(--coral);flex:none;width:26px;padding-top:2px}
  .ri h4{margin:0 0 3px;font-size:15.5px;letter-spacing:-.01em}
  .ri p{margin:0;color:var(--dim);font-size:13.5px;line-height:1.5}
  .ri.done .n{color:var(--green)}
  .ri.done h4{color:var(--dim)}
  .ri.done h4::after{content:" — shipped";color:var(--green);font:600 11px/1 'JetBrains Mono',monospace;letter-spacing:.04em}
`;

const Cell: FC<{ ic: string; title: string; span?: string; children: string }> = ({ ic, title, span, children }) => (
  <div class={`cell ${span ?? ""}`}>
    <div class="ic">{ic}</div>
    <h3>{title}</h3>
    <p>{children}</p>
  </div>
);

export const Landing: FC<{ shot: string; repo: string; dmg: string; version: string }> = ({ shot, repo, dmg, version }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Dply Local — a whole local dev environment, in one app</title>
      <meta name="description" content="One daemon serves every .test site with trusted HTTPS, per-project PHP and Node, a database per git branch, a built-in flame-graph profiler, and a live console of every subsystem. A native macOS app." />
      <meta property="og:title" content="Dply Local — local PHP dev, without the yak-shaving" />
      <meta property="og:description" content="Per-project PHP & Node, a database per git branch, one-click SPX profiling, trusted .test HTTPS with no sudo, and a live System console — in a native macOS app." />
      <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      <link rel="apple-touch-icon" href="/logo.svg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      {/* raw: Hono escapes children, turning quotes in font-family into &#39; and
          breaking every quoted font name — that was the serif fallback. */}
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </head>
    <body>
      <nav>
        <div class="wrap">
          <img class="logo" src="/logo.svg" alt="Dply Local" />
          <div class="brand">Dply&nbsp;Local</div>
          <div class="sp" />
          <a class="lnk" href="#features">Features</a>
          <a class="lnk" href="#branchdb">Databases</a>
          <a class="lnk" href="#profiler">Profiler</a>
          <a class="lnk" href="#console">Console</a>
          <a class="lnk" href="#roadmap">Roadmap</a>
          <a class="lnk" href={repo}>GitHub</a>
          <a class="btn" href={dmg}>Download</a>
        </div>
      </nav>

      <header>
        <div class="wrap hgrid">
          <div>
            <span class="eyebrow"><span class="blink" /> 121 sites · one daemon · all running</span>
            <h1>Local PHP dev,<br /><span class="g">without the yak-shaving.</span></h1>
            <p class="lede">
              Point it at a folder — it's a site, with trusted HTTPS, per-project PHP &amp; Node,
              a built-in flame-graph profiler, and a live console for the whole stack.
            </p>
            <div class="cta">
              <a class="btn" href={dmg}>↓&nbsp; Download for macOS</a>
              <a class="btn ghost" href={repo}>View source</a>
            </div>
            <div class="ver mono">{version} · 3.9 MB · macOS 14+ · free &amp; open source</div>
            <div class="stats">
              <div><b>121</b><span class="mono">sites, one daemon</span></div>
              <div><b>6</b><span class="mono">PHP versions, isolated</span></div>
              <div><b>~90ms</b><span class="mono">branch-DB switches</span></div>
              <div><b>0</b><span class="mono">sudo to serve</span></div>
            </div>
          </div>

          <div class="console">
            <div class="top"><i /><i /><i /><b>~/Projects/myapp — dpl</b></div>
            <div class="term mono">
              <div class="l"><span class="p">$</span> dpl link .</div>
              <div class="l"><span class="ok">✓</span> myapp.test <span class="d">→ https · PHP 8.4 · Laravel 12</span></div>
              <div class="l"><span class="p">$</span> dpl profile on myapp</div>
              <div class="l"><span class="ok">✓</span> every request is now a flame graph<span class="cur" /></div>
            </div>
            <div class="logstrip">
              <div class="roll mono">
                <div><span class="ts">[10:48:56]</span> <span class="m">GET</span> /              <span class="ok">200</span> <span class="ts">138ms</span> <span class="h">myapp.test</span></div>
                <div><span class="ts">[10:48:59]</span> <span class="m">GET</span> /products      <span class="ok">200</span> <span class="ts">70ms</span> <span class="h">myapp.test</span></div>
                <div><span class="ts">[10:49:05]</span> <span class="mp">POST</span> /checkout    <span class="s2">302</span> <span class="ts">199ms</span> <span class="h">shop.test</span></div>
                <div><span class="ts">[10:49:08]</span> <span class="m">GET</span> /orders/42     <span class="ok">200</span> <span class="ts">233ms</span> <span class="h">shop.test</span></div>
                <div><span class="ts">[10:49:12]</span> <span class="m">GET</span> /dashboard     <span class="ok">200</span> <span class="ts">88ms</span> <span class="h">admin.test</span></div>
                <div><span class="ts">[10:49:14]</span> <span class="m">GET</span> /api/health    <span class="ok">200</span> <span class="ts">12ms</span> <span class="h">api.test</span></div>
                {/* duplicate for a seamless loop */}
                <div><span class="ts">[10:48:56]</span> <span class="m">GET</span> /              <span class="ok">200</span> <span class="ts">138ms</span> <span class="h">myapp.test</span></div>
                <div><span class="ts">[10:48:59]</span> <span class="m">GET</span> /products      <span class="ok">200</span> <span class="ts">70ms</span> <span class="h">myapp.test</span></div>
                <div><span class="ts">[10:49:05]</span> <span class="mp">POST</span> /checkout    <span class="s2">302</span> <span class="ts">199ms</span> <span class="h">shop.test</span></div>
                <div><span class="ts">[10:49:08]</span> <span class="m">GET</span> /orders/42     <span class="ok">200</span> <span class="ts">233ms</span> <span class="h">shop.test</span></div>
                <div><span class="ts">[10:49:12]</span> <span class="m">GET</span> /dashboard     <span class="ok">200</span> <span class="ts">88ms</span> <span class="h">admin.test</span></div>
                <div><span class="ts">[10:49:14]</span> <span class="m">GET</span> /api/health    <span class="ok">200</span> <span class="ts">12ms</span> <span class="h">api.test</span></div>
              </div>
            </div>
          </div>
        </div>

        <div class="wrap showcase">
          <div class="frame">
            <div class="bar"><i /><i /><i /><b>Dply Local</b></div>
            <img src={shot} alt="The Dply Local dashboard: 116 sites running, services, workers and system health at a glance." />
          </div>
        </div>
      </header>

      <section id="features">
        <div class="wrap">
          <span class="kick">Everything local, nothing fiddly</span>
          <h2>The whole stack, managed for you</h2>
          <p class="sub">Link a folder and it's a site. dpl handles the DNS, the certificate, the PHP pool and the ports — and shows you exactly what's happening.</p>
          <div class="bento">
            <Cell ic="🌐" title="Automatic .test + TLS" span="span3">One command routes every .test domain and mints a trusted certificate from a local CA. Or opt into *.localhost — no resolver, no sudo for the DNS bits.</Cell>
            <Cell ic="🧩" title="Per-project PHP & Node" span="span3">PHP 8.0–8.5 plus a frozen 7.4 legacy tier, one pool per version, isolated per repo. Node via fnm/nvm, pinned from a site's .nvmrc.</Cell>
            <Cell ic="🔥" title="Built-in SPX profiler" span="span2">Flip it on and every PHP-FPM request becomes a flame graph, served same-origin. No cookie, no trigger.</Cell>
            <Cell ic="🔌" title="Ports 80/443, no root" span="span2">launchd binds the privileged ports and hands them over — the daemon never runs as root.</Cell>
            <Cell ic="🐞" title="Xdebug · Mail · Dumps" span="span2">Per-site Xdebug on its own pool, an SMTP sink with per-site mailboxes, and dump()/ray() captured in-app.</Cell>
            <Cell ic="🌿" title="A database per git branch" span="span3">Attach once and every branch keeps its own Postgres data. Checkouts swap it automatically in ~90ms — migrations never bleed across branches.</Cell>
            <Cell ic="📦" title="Committable team config" span="span3">Check in dpl.toml and a teammate runs one `dpl up` for your exact site — PHP pin, HTTPS, runtime, Xdebug, preload, branch database, required services.</Cell>
          </div>
        </div>
      </section>

      <section id="branchdb">
        <div class="wrap split">
          <div>
            <span class="kick">Switch branch, switch data</span>
            <h2>A database for every git branch</h2>
            <p class="sub">Attach a site's database once and it follows your checkouts. Known branches swap in ~90ms; a new branch clones the state you left. Your .env never changes.</p>
            <ul>
              <li>Plain <code class="mono">git checkout</code> — no command, the daemon watches</li>
              <li>Migrations on a branch stay on that branch</li>
              <li>Parked copies listed with sizes; drop them when merged</li>
            </ul>
          </div>
          <div class="code">
            <span class="c"># once</span><br />
            <span class="k">dpl</span> db attach myapp<br />
            <span class="g">✓</span> `myapp` now tracks git branch `main`<br /><br />
            <span class="c"># then just work</span><br />
            <span class="k">git</span> checkout -b feat/new-schema<br />
            <span class="g">✓</span> cloned from `main` — migrate away<br />
            <span class="k">git</span> checkout main<br />
            <span class="g">✓</span> swapped back in <span class="a">92ms</span> — data intact
          </div>
        </div>
      </section>

      <section id="profiler">
        <div class="wrap split">
          <div>
            <span class="kick">One click, zero setup</span>
            <h2>Flame graphs for every request</h2>
            <p class="sub">Turn the profiler on and dpl gives the site a dedicated php-fpm pool with SPX loaded and auto-profiling. Your PATH php stays untouched.</p>
            <ul>
              <li>Every request captured — reload, read the flame graph</li>
              <li>Browsable same-origin, at the site's own URL</li>
              <li>Installs the right SPX build for that PHP version</li>
            </ul>
          </div>
          <div class="code">
            <span class="c"># turn it on for one site</span><br />
            <span class="k">dpl</span> profile on myapp<br />
            <span class="g">✓</span> every request is now captured<br /><br />
            <span class="c"># open the flame graphs</span><br />
            <span class="k">dpl</span> profile open myapp
          </div>
        </div>
      </section>

      <section id="console">
        <div class="wrap split">
          <div class="code">
            <span class="c"># ~/.dpl/logs/access.log — live</span><br />
            <span class="c">[10:48:56]</span> <span class="g">GET</span> /            200  528ms  <span class="v">myapp.test</span><br />
            <span class="c">[10:48:56]</span> <span class="g">GET</span> /products    404   70ms  <span class="v">myapp.test</span><br />
            <span class="c">[10:48:57]</span> <span class="a">POST</span> /checkout   302  199ms  <span class="v">shop.test</span><br />
            <span class="c">[10:48:58]</span> <span class="g">GET</span> /orders/42   200  233ms  <span class="v">shop.test</span>
          </div>
          <div>
            <span class="kick">See what's actually happening</span>
            <h2>A live console for the daemon</h2>
            <p class="sub">The System panel lists every subsystem with live status, and streams real request traffic and logs — proxy, DNS, mail, dumps, and each PHP-FPM pool.</p>
            <ul>
              <li>Real access logs: method, path, status, timing, per site</li>
              <li>Per-subsystem live tail, filtered and follow-on-append</li>
              <li>One green board means the whole stack is up</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="roadmap">
        <div class="wrap">
          <span class="kick">What's next</span>
          <h2>The roadmap</h2>
          <p class="sub">Where it's headed — the biggest reliability, observability and performance bets.</p>
          <div class="road">
            <div class="ri"><span class="n">01</span><div><h4>Signed &amp; notarized releases</h4><p>Opens with no Gatekeeper warning; one-time approval instead of a prompt each setup.</p></div></div>
            <div class="ri done"><span class="n">✓</span><div><h4>Self-updating app</h4><p>Sparkle checks GitHub Releases daily and updates in place — lands in the next DMG.</p></div></div>
            <div class="ri"><span class="n">03</span><div><h4>Bundled PHP runtimes</h4><p>dply ships its own PHP builds — reproducible everywhere, no host-extension surprises.</p></div></div>
            <div class="ri"><span class="n">04</span><div><h4>Notifications</h4><p>Native push for worker failures, N+1 query bursts, and slow routes.</p></div></div>
            <div class="ri"><span class="n">05</span><div><h4>Web Tinker &amp; queries</h4><p>A browser REPL into a site, plus a live query inspector — same origin.</p></div></div>
            <div class="ri"><span class="n">06</span><div><h4>Richer debug capture</h4><p>Queries, jobs, views, mail, cache, events and HTTP, filterable per request.</p></div></div>
            <div class="ri done"><span class="n">✓</span><div><h4>Committable team config</h4><p>dpl.toml is in: check it in, a teammate runs `dpl up` for your exact environment.</p></div></div>
            <div class="ri done"><span class="n">✓</span><div><h4>Branch-aware databases</h4><p>Beyond snapshots: checkouts swap a per-branch Postgres DB automatically, in ~90ms.</p></div></div>
            <div class="ri done"><span class="n">✓</span><div><h4>Sub-100ms cold starts</h4><p>opcache preload (dpl preload) + worker warm-up shipped in 0.3.0.</p></div></div>
            <div class="ri done"><span class="n">✓</span><div><h4>Push-based tailing + incremental reconcile</h4><p>Event-driven tailing and one-site reconciles (1.75s → 0.01s at 150 sites) are in; pooled FastCGI still to come.</p></div></div>
          </div>
        </div>
      </section>

      <section class="final">
        <div class="wrap">
          <span class="kick">Ready when you are</span>
          <h2>Point it at a folder.<br />That's the setup.</h2>
          <p class="sub" style="margin:14px auto 26px">A native macOS app plus a <code class="mono">dpl</code> CLI. Free and open source.</p>
          <div class="cta" style="justify-content:center">
            <a class="btn" href={dmg}>↓&nbsp; Download for macOS</a>
            <a class="btn ghost" href={repo}>GitHub</a>
          </div>
          <div class="ver mono" style="margin-bottom:6px">{version} · 3.9 MB · macOS 14+</div>
        </div>
      </section>

      <footer>
        <div class="wrap">
          <img class="logo" src="/logo.svg" alt="" style="width:22px;height:22px" />
          <span>Dply Local</span>
          <div class="sp" />
          <a href={repo}>GitHub</a><span>·</span>
          <span>Built with <a href="https://www.keeljs.com">Keel</a>, on Cloudflare</span>
        </div>
      </footer>
    </body>
  </html>
);
