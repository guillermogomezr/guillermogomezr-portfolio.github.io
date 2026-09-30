/* Portfolio · Guillermo Gómez Rivas
   Plano de arquitectura interactivo. Sin dependencias: HTML + CSS + JS. */
(function () {
  "use strict";

  const P = window.PORTFOLIO;
  const C = P.config;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
  };

  const byId = Object.fromEntries(P.nodes.map((n) => [n.id, n]));
  const bySlug = Object.fromEntries(P.nodes.map((n) => [n.slug, n]));
  const techs = P.stack.flatMap((g) => g.items.map((t) => ({ ...t, group: g.group, minor: !!g.minor })));
  const techById = Object.fromEntries(techs.map((t) => [t.id, t]));
  const TOUR = ["about", "cloud", "datos", "mcp", "demand", "acm", "upm", "cursos", "actividades", "iam"];
  const LINK_NAMES = { demand: "Demand Forecast", mcp: "Servidor MCP", acm: "A Critical Mind" };
  const COLS = ["A", "B", "C"];
  const ref = (n) => (n && n.tier != null ? COLS[n.col - 1] + n.tier : "—");
  const slugOf = (key) => (key === "iam" ? "politicas-iam" : key.startsWith("tech:") ? "stack-" + key.slice(5) : byId[key].slug);

  /* Sustituye {{demand}} etc. por enlaces que abren la ficha */
  const linkify = (html) =>
    String(html).replace(/\{\{(\w+)\}\}/g, (_, id) => {
      const n = byId[id];
      if (!n) return "";
      return `<a class="inline-link" href="#${n.slug}">${esc(LINK_NAMES[id] || n.title)}</a>`;
    });

  /* ------------------------------------------------------------------
     Iconos (trazo de plano, 64×64)
     ------------------------------------------------------------------ */
  const I = {
    user: '<circle class="paper" cx="32" cy="21" r="9"/><path class="paper" d="M13 55c1.5-11 9-18 19-18s17.5 7 19 18z"/>',
    balancer: '<circle class="paper" cx="32" cy="32" r="23"/><circle class="solid" cx="20" cy="32" r="3.2"/><path d="M23 32h17M23 30.5l15-9M23 33.5l15 9"/><path d="M36 17.5l4.5 3.2-3.5 4.3M40 28.5l4 3.5-4 3.5M37 39l3.5 4.3-4.5 3.2"/>',
    compute: '<path class="paper" d="M32 6l23 13v26L32 58 9 45V19z"/><rect x="22" y="22" width="20" height="20" rx="2"/><path class="soft" d="M27 22v-5M32 22v-5M37 22v-5M27 47v-5M32 47v-5M37 47v-5M22 27h-5M22 32h-5M22 37h-5M47 27h-5M47 32h-5M47 37h-5"/><rect class="solid" x="28" y="28" width="8" height="8" rx="1"/>',
    shuttle: '<path class="paper" d="M17 13Q32 7 47 13L40 44H24z"/><path d="M24 44L17 13M40 44l7-31M28.5 44L26 11M35.5 44L38 11M19.5 25q12.5-4 25 0M21.5 34q10.5-3 21 0"/><path class="paper" d="M23 44h18v2a9 9 0 0 1-18 0z"/>',
    clapper: '<rect class="paper" x="10" y="26" width="44" height="26" rx="2"/><path class="paper" d="M10 17h44v9H10z"/><path d="M19 17l-5 9M29 17l-5 9M39 17l-5 9M49 17l-5 9"/><path class="solid" d="M28 33l11 6-11 6z"/>',
    forecast: '<path class="paper" d="M10 10h44v44H10z" style="stroke:none"/><path d="M12 52V12M12 52h42"/><rect class="paper" x="18" y="38" width="6" height="14"/><rect class="paper" x="28" y="31" width="6" height="21"/><rect class="paper" x="38" y="35" width="6" height="17"/><path d="M17 33l10-9 10 5"/><path d="M37 29l7-6 8-5" stroke-dasharray="3 3.5"/><circle class="solid" cx="52" cy="18" r="2.6"/>',
    plug: '<rect class="paper" x="12" y="10" width="40" height="15" rx="2"/><rect class="paper" x="12" y="29" width="40" height="15" rx="2"/><circle class="solid" cx="19" cy="17.5" r="2"/><circle class="solid" cx="19" cy="36.5" r="2"/><path class="soft" d="M27 17.5h18M27 36.5h18"/><path d="M32 44v6M24 50h16M26 54h12"/>',
    database: '<path class="paper" d="M13 15c0-4.4 8.5-8 19-8s19 3.6 19 8v34c0 4.4-8.5 8-19 8s-19-3.6-19-8z"/><path d="M13 15c0 4.4 8.5 8 19 8s19-3.6 19-8M13 27c0 4.4 8.5 8 19 8s19-3.6 19-8M13 39c0 4.4 8.5 8 19 8s19-3.6 19-8"/>',
    bucket: '<path class="paper" d="M11 17h42l-5.5 37.5c-.3 2-7 3.5-15.5 3.5s-15.2-1.5-15.5-3.5z"/><ellipse class="paper" cx="32" cy="17" rx="21" ry="6"/><rect x="21" y="31" width="8" height="8" rx="1"/><rect x="31" y="35" width="8" height="8" rx="1"/><rect x="24" y="43" width="8" height="8" rx="1"/><path class="soft" d="M43 47V33M39 37l4-4 4 4"/>',
    shield: '<path class="paper" d="M32 7l20 7v15c0 13.5-8.5 22.5-20 27-11.5-4.5-20-13.5-20-27V14z"/><path d="M23.5 32l6 6 11-12.5"/>',
    erp: '<path class="paper" d="M9 55V29l12-8v8l12-8v8l12-8v34z"/><path d="M45 21V9h7v46"/><path class="soft" d="M16 38h5M26 38h5M36 38h5M16 46h5M26 46h5M36 46h5"/>',
    pipeline: '<circle class="paper" cx="13" cy="32" r="6"/><circle class="paper" cx="32" cy="18" r="6"/><circle class="paper" cx="32" cy="46" r="6"/><circle class="paper" cx="51" cy="32" r="6"/><path d="M18 29l9-7M18 35l9 7M37 22l9 7M37 42l9-7"/>',
    clock: '<circle class="paper" cx="32" cy="32" r="21"/><path d="M32 19v13l9 6"/>',
    key: '<circle class="paper" cx="22" cy="32" r="10"/><circle class="solid" cx="22" cy="32" r="3"/><path d="M32 32h22M46 32v8M52 32v6"/>',
    run: '<path class="paper" d="M32 6l23 13v26L32 58 9 45V19z"/><path class="solid" d="M27 22l15 10-15 10z"/>',
    llm: '<path class="paper" d="M32 8l5.5 15.5L53 29l-15.5 5.5L32 50l-5.5-15.5L11 29l15.5-5.5z"/><path class="soft" d="M50 46l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>',
    code: '<rect class="paper" x="8" y="12" width="48" height="40" rx="3"/><path d="M8 21h48"/><path d="M25 30l-7 6 7 6M39 30l7 6-7 6M35 28l-6 16"/>',
    check: '<path d="M4 12l5 5L20 6"/>',
  };
  const icon = (k, vb = 64) => `<svg viewBox="0 0 ${vb} ${vb}" aria-hidden="true">${I[k] || ""}</svg>`;
  const arrowSvg = '<svg viewBox="0 0 34 22" aria-hidden="true"><path d="M32 4C22 3 11 7 5 17"/><path d="M5 17l1-7M5 17l6.5-2.5"/></svg>';

  /* ------------------------------------------------------------------
     Utilidades: copiar, toast
     ------------------------------------------------------------------ */
  let toastT;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove("is-on"), 2200);
  }
  function copyText(text) {
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      ta.remove();
      toast(ok ? "Email copiado: " + text : "Mi email: " + text);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => toast("Email copiado: " + text), fallback);
    } else fallback();
  }

  /* ------------------------------------------------------------------
     Botones de contacto (se reutilizan en ficha, inspector y cajetín)
     ------------------------------------------------------------------ */
  let cvAvailable = false;
  function contactButtons(opts = {}) {
    const b = [];
    b.push(`<a class="btn btn--ink" href="mailto:${esc(C.email)}">${icon("check", 24).replace(I.check, '<path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/>')}Escríbeme</a>`);
    b.push(`<button type="button" class="btn" data-copy-email title="${esc(C.email)}">Copiar email</button>`);
    if (C.linkedin) b.push(`<a class="btn" href="${esc(C.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`);
    if (C.github) b.push(`<a class="btn" href="${esc(C.github)}" target="_blank" rel="noopener">GitHub</a>`);
    if (!opts.noCv) b.push(`<a class="btn" data-cv href="#lectura">CV completo</a>`);
    return b.join("");
  }
  function applyCvLinks() {
    $$("[data-cv]").forEach((a) => {
      if (a.hasAttribute("data-cv-only")) a.hidden = !cvAvailable;
      if (cvAvailable) {
        a.href = C.cvPdf; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("download", "");
        a.textContent = "Descargar CV (PDF)";
      } else {
        a.href = "#lectura"; a.removeAttribute("target"); a.removeAttribute("download");
        a.textContent = "CV completo";
      }
    });
  }
  function checkCv() {
    if (!C.cvPdf || location.protocol === "file:") { applyCvLinks(); return; }
    fetch(C.cvPdf, { method: "HEAD" })
      .then((r) => { cvAvailable = r.ok && !(r.headers.get("content-type") || "").includes("text/html"); })
      .catch(() => { cvAvailable = false; })
      .finally(applyCvLinks);
  }

  /* ------------------------------------------------------------------
     Ficha de presentación (hero)
     ------------------------------------------------------------------ */
  function renderHero() {
    const ring = "Ingeniero informático · UPM 2026 · Arquitecto cloud · ";
    const stamp = `
      <div class="stamp" aria-hidden="true">
        <svg viewBox="0 0 172 172">
          <defs><path id="ring" d="M86 86m-72 0a72 72 0 1 1 144 0a72 72 0 1 1 -144 0"/></defs>
          <circle cx="86" cy="86" r="84" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="86" cy="86" r="61" fill="none" stroke="currentColor" stroke-width="1.2"/>
          <g class="stamp__spin"><text class="ring-text"><textPath href="#ring" textLength="448" lengthAdjust="spacing">${esc(ring)}</textPath></text></g>
          <path d="M86 18v10M86 144v10M18 86h10M144 86h10" stroke="currentColor" stroke-width="1.2"/>
          ${C.photo ? "" : `<text class="initials" x="86" y="102" text-anchor="middle">${esc(C.initials)}</text>`}
        </svg>
        ${C.photo ? `<img src="${esc(C.photo)}" alt="">` : ""}
      </div>`;
    const langs = C.languages.map((l) => `${esc(l.name)} <span class="mono" style="color:var(--ink-2);font-size:.9em">${esc(l.level)}</span>`).join("<br>");
    $("#hero").innerHTML = `
      <div class="hero__main">
        <div class="namebox" style="width:fit-content;max-width:100%">
          <div class="dim" style="width:100%"><span class="dim__cap dim__cap--l"></span><span class="dim__arrow dim__arrow--l"></span><span class="dim__label">${esc(C.role)}</span><span class="dim__arrow dim__arrow--r"></span><span class="dim__cap dim__cap--r"></span></div>
          <h1 class="hero__name"><span>${esc(C.first)}</span><span class="l2">${esc(C.last)}</span></h1>
        </div>
        <p class="hero__tag">${esc(C.tagline)}</p>
        <div class="hero__actions">${contactButtons()}</div>
      </div>
      <div class="hero__side">
        ${stamp}
        <dl class="spec">
          <dt>Ahora</dt><dd><span class="run"><span class="chip chip--running">En curso</span> ${esc(C.currentCompany)}</span></dd>
          <dt>Ubicación</dt><dd>${esc(C.location)}</dd>
          <dt>Movilidad</dt><dd>${esc(C.availabilityShort)}</dd>
          <dt>Idiomas</dt><dd>${langs}</dd>
        </dl>
      </div>`;
  }

  /* ------------------------------------------------------------------
     Plano
     ------------------------------------------------------------------ */
  function nodeHTML(n) {
    const note = n.note ? `<span class="note note--top" aria-hidden="true">${arrowSvg}${esc(n.note)}</span>` : "";
    const grid = `grid-column:${n.col}${n.span ? " / span " + n.span : ""}`;
    const inner = `
      <span class="node__icon">${icon(n.icon)}</span>
      ${n.passive ? "" : `<span class="node__ref">${ref(n)}</span>`}
      <span class="node__title">${esc(n.title)}</span>
      <span class="node__sub">${esc(n.sub)}</span>
      ${n.meta ? `<span class="node__meta">${esc(n.meta)}</span>` : ""}
      ${n.status ? `<span class="chip chip--${n.status}">${esc(n.statusText)}</span>` : ""}
      ${note}`;
    if (n.passive) return `<div class="node" data-id="${n.id}" data-passive style="${grid}">${inner}</div>`;
    return `<a class="node" href="#${n.slug}" data-id="${n.id}" style="${grid};text-decoration:none;color:inherit" aria-label="${esc(n.title)} · ${esc(n.sub)}. Abrir ficha">${inner}</a>`;
  }

  function renderDiagram() {
    const d = $("#diagram");
    const html = P.tiers.map((t, i) => {
      const nodes = P.nodes.filter((n) => n.tier === i).sort((a, b) => a.col - b.col);
      return `<div class="zone zone--${t.name}" data-tier="${i}">
        <span class="zone__tag">${esc(t.label)}</span>
        <span class="zone__cidr">${esc(t.cidr)}</span>
        ${nodes.map(nodeHTML).join("")}
      </div>`;
    }).join("");
    d.insertAdjacentHTML("beforeend", html);
  }

  /* Cableado ortogonal entre nodos */
  const svgNS = "http://www.w3.org/2000/svg";
  let wirePaths = [];
  let firstDraw = true;

  function roundedPath(pts, r = 12) {
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i - 1], [x, y] = pts[i], [x2, y2] = pts[i + 1];
      const d1 = Math.hypot(x - x0, y - y0), d2 = Math.hypot(x2 - x, y2 - y);
      const rr = Math.min(r, d1 / 2, d2 / 2);
      if (rr < 0.5) { d += ` L${x},${y}`; continue; }
      const ax = x - ((x - x0) / d1) * rr, ay = y - ((y - y0) / d1) * rr;
      const bx = x + ((x2 - x) / d2) * rr, by = y + ((y2 - y) / d2) * rr;
      d += ` L${ax},${ay} Q${x},${y} ${bx},${by}`;
    }
    const l = pts[pts.length - 1];
    return d + ` L${l[0]},${l[1]}`;
  }

  function drawWires() {
    const svg = $("#wires");
    const d = $("#diagram");
    if (getComputedStyle(svg).display === "none") { svg.innerHTML = ""; wirePaths = []; return; }
    const D = d.getBoundingClientRect();
    const box = (el) => { const r = el.getBoundingClientRect(); return { x: r.left - D.left, y: r.top - D.top, w: r.width, h: r.height, cx: r.left - D.left + r.width / 2, cy: r.top - D.top + r.height / 2 }; };
    svg.setAttribute("viewBox", `0 0 ${D.width} ${D.height}`);
    let out = `<defs><marker id="ah" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="arrowhead" d="M0,1 L9,5 L0,9 z"/></marker></defs>`;
    const labels = [];
    P.edges.forEach((e, i) => {
      const A = d.querySelector(`.node[data-id="${e.from}"]`), B = d.querySelector(`.node[data-id="${e.to}"]`);
      if (!A || !B) return;
      const ai = box(A.querySelector(".node__icon")), bi = box(B.querySelector(".node__icon"));
      const an = box(A), bn = box(B);
      let pts, lx, ly, anchor = "middle";
      if (Math.abs(ai.cy - bi.cy) < 24) {
        const dir = bi.cx > ai.cx ? 1 : -1;
        const x1 = dir > 0 ? ai.x + ai.w + 6 : ai.x - 6;
        const x2 = dir > 0 ? bi.x - 8 : bi.x + bi.w + 8;
        pts = [[x1, ai.cy], [x2, bi.cy]];
        if (Math.abs(ai.cy - bi.cy) > 1) { const mx = (x1 + x2) / 2; pts = [[x1, ai.cy], [mx, ai.cy], [mx, bi.cy], [x2, bi.cy]]; }
        lx = (x1 + x2) / 2; ly = ai.cy - 9;
      } else if (bi.cy > ai.cy) {
        const x1 = ai.cx, y1 = an.y + an.h + 6, x2 = bi.cx, y2 = bi.y - 8;
        const my = y1 + (y2 - y1) * 0.42;
        pts = Math.abs(x1 - x2) < 1 ? [[x1, y1], [x2, y2]] : [[x1, y1], [x1, my], [x2, my], [x2, y2]];
        lx = x2 + 8; ly = (my + y2) / 2; anchor = "start";
      } else {
        const x1 = ai.cx, y1 = ai.y - 6, x2 = bi.cx, y2 = bn.y + bn.h + 8;
        const my = (y1 + y2) / 2;
        pts = Math.abs(x1 - x2) < 1 ? [[x1, y1], [x2, y2]] : [[x1, y1], [x1, my], [x2, my], [x2, y2]];
        lx = x1 + 10; ly = y2 + 16; anchor = "start";
      }
      out += `<path class="wire" data-i="${i}" data-from="${e.from}" data-to="${e.to}" d="${roundedPath(pts)}" marker-end="url(#ah)"/>`;
      if (e.label) labels.push(`<text class="wire-label" x="${lx}" y="${ly}" text-anchor="${anchor}">${esc(e.label)}</text>`);
    });
    out += `<g class="packets"></g>` + labels.join("");
    svg.innerHTML = out;
    wirePaths = $$(".wire", svg).map((p) => ({ el: p, len: p.getTotalLength() }));

    firstDraw = false;
    resetPackets();
  }

  /* Paquetes de datos que viajan por el cableado */
  let packets = [], rafId = null, lastT = 0, diagramVisible = true;
  function resetPackets() {
    const g = $("#wires .packets");
    if (!g || reduceMotion) { packets = []; return; }
    g.innerHTML = "";
    packets = wirePaths.map((w, i) => {
      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("r", "3.2"); c.setAttribute("class", "packet"); c.style.opacity = "0";
      g.appendChild(c);
      return { w, c, t: 0, wait: 900 + i * 520 + Math.random() * 1500, speed: 0.11 + Math.random() * 0.05 };
    });
    if (!rafId) rafId = requestAnimationFrame(tick);
  }
  function tick(now) {
    rafId = requestAnimationFrame(tick);
    const dt = Math.min(64, now - (lastT || now)); lastT = now;
    if (!diagramVisible || document.hidden || !packets.length) return;
    packets.forEach((p) => {
      if (p.wait > 0) { p.wait -= dt; p.c.style.opacity = "0"; return; }
      p.t += (dt * p.speed) / Math.max(60, p.w.len) ;
      if (p.t >= 1) { p.t = 0; p.wait = 2200 + Math.random() * 4200; p.c.style.opacity = "0"; return; }
      const pt = p.w.el.getPointAtLength(p.t * p.w.len);
      p.c.setAttribute("cx", pt.x); p.c.setAttribute("cy", pt.y);
      p.c.style.opacity = p.t < 0.08 ? p.t / 0.08 : p.t > 0.92 ? (1 - p.t) / 0.08 : 1;
    });
  }

  /* ------------------------------------------------------------------
     Notas del plano: leyenda, stack (filtro), políticas IAM
     ------------------------------------------------------------------ */
  function renderNotes() {
    const legend = [
      ["compute", "Experiencia"], ["forecast", "Proyecto"],
      ["database", "Formación"], ["bucket", "Formación continua"],
      ["shuttle", "Docencia y deporte"], ["shield", "Política IAM"],
    ].map(([k, t]) => `<li>${icon(k)}${t}</li>`).join("");
    const stack = P.stack.map((g) => `
      <div class="stack-group">
        <p class="stack-group__name">${esc(g.group)}</p>
        <div class="tags">${g.items.map((t) => `<button type="button" class="tag${g.minor ? " tag--minor" : ""}" data-tech="${t.id}" aria-pressed="false">${esc(t.name)}</button>`).join("")}</div>
      </div>`).join("");
    const pol = P.policies.map((p, i) => `
      <li><button type="button" data-policy="${i}"><span class="eff">Allow</span><span class="nm">${esc(p.name)}</span><span class="ac">${esc(p.action)}</span></button></li>`).join("");
    $("#notes").innerHTML = `
      <section class="notes__block">
        <h3 class="notes__title"><b>1</b> Leyenda</h3>
        <ul class="legend">${legend}</ul>
      </section>
      <section class="notes__block notes__block--stack">
        <h3 class="notes__title"><b>2</b> Stack técnico</h3>
        <p class="notes__hint">Pulsa una tecnología para ver dónde la he usado.</p>
        <div id="filterbar"></div>
        ${stack}
      </section>
      <section class="notes__block">
        <span class="notes__pencil" aria-hidden="true">mínimo privilegio, siempre</span>
        <h3 class="notes__title"><b>3</b> Políticas IAM</h3>
        <p class="notes__hint">Mis soft skills, escritas como permisos. Cada una con su evidencia.</p>
        <ul class="policies">${pol}</ul>
      </section>`;
  }

  let activeTech = null;
  function setFilter(id) {
    activeTech = id;
    const d = $("#diagram");
    const t = id ? techById[id] : null;
    d.classList.toggle("filtering", !!t);
    $$(".node", d).forEach((n) => n.classList.toggle("is-hit", !!t && t.used.includes(n.dataset.id)));
    $$(".tag[data-tech]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tech === id)));
    const fb = $("#filterbar");
    if (fb) fb.innerHTML = t ? `<div class="filterbar"><span>Resaltado: <b>${esc(t.name)}</b> · ${t.used.length ? t.used.length + " recurso" + (t.used.length > 1 ? "s" : "") : "sin recursos en el plano"}</span><button type="button" data-clear-filter>Quitar</button></div>` : "";
  }

  /* ------------------------------------------------------------------
     Inspector (ficha de cada recurso)
     ------------------------------------------------------------------ */
  const sec = (title, body) => (body ? `<section class="insp__sec"><h3>${title}</h3>${body}</section>` : "");
  const list = (arr) => (arr && arr.length ? `<ul class="insp__list">${arr.map((x) => `<li>${linkify(x)}</li>`).join("")}</ul>` : "");
  const staticTags = (arr) => (arr && arr.length ? `<div class="tags">${arr.map((x) => `<span class="tag tag-static">${esc(x)}</span>`).join("")}</div>` : "");
  const head = (n, extraMeta = "") => `
    <div class="insp__top">
      ${n.status ? `<span class="chip chip--${n.status}">${esc(n.statusText)}</span>` : ""}
      <span class="insp__ref">Ref. plano ${ref(n)}</span>
    </div>
    <h2 class="insp__title" id="insp-title">${esc(n.title)}</h2>
    ${n.long ? `<p class="insp__long">${esc(n.long)}</p>` : ""}
    <div class="insp__meta"><span><b>${esc(n.sub)}</b></span>${n.meta ? `<span>${esc(n.meta)}</span>` : ""}${n.type ? `<span>${esc(n.type)}</span>` : ""}${extraMeta}</div>`;
  const resultBox = (txt) => `<div class="insp__result"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l5 5L20 6"/></svg><p>${linkify(txt)}</p></div>`;

  function flowStep(ic, title, small, extra = "") {
    return `<div class="flow__step">${icon(ic)}<div><b>${title}</b>${small ? `<small>${small}</small>` : ""}</div>${extra}</div>`;
  }
  const flowArrow = (t) => `<div class="flow__arrow">${t || ""}</div>`;
  const DIAGRAMS = {
    demand: () => `
      <div class="flow"><span class="flow__tag">Arquitectura · anonimizada</span>
        ${flowStep("erp", "ERP del cliente", "histórico de ventas")}
        ${flowArrow("carga")}
        ${flowStep("database", "Oracle Autonomous Database", "ventas por cliente y referencia")}
        ${flowArrow("lectura · Resource Principal")}
        ${flowStep("pipeline", "OCI Data Science", "Jobs vía SDK · orquestados en 4 Pipelines · Schedules",
          `<div class="flow__pipes"><div class="flow__pipe"><i>1</i>Limpieza de datos</div><div class="flow__pipe"><i>2</i>Entrenamiento</div><div class="flow__pipe"><i>3</i>Reentrenamiento (últimos 3 años)</div><div class="flow__pipe"><i>4</i>Consolidación y validación</div></div>`)}
        ${flowArrow("escritura")}
        ${flowStep("database", "Tablas de previsiones", "Autonomous Database")}
        ${flowArrow("consumo periódico")}
        ${flowStep("user", "Cliente", "previsiones listas, sin intervención manual")}
        <div class="flow__side"><span>Conda personalizado · Object Storage</span><span>Grupos dinámicos</span><span>Políticas IAM de mínimo privilegio</span></div>
      </div>`,
    mcp: () => `
      <div class="flow flow--building"><span class="flow__tag">Arquitectura · en construcción</span>
        ${flowStep("user", "Usuario", "")}
        ${flowArrow("inicio de sesión")}
        ${flowStep("key", "SSO", "autenticación del usuario")}
        ${flowArrow("identidad + permisos")}
        ${flowStep("run", "Cloud Run · Servidor MCP", "gestión de permisos: a qué recursos accede cada usuario")}
        ${flowArrow("consulta")}
        ${flowStep("llm", "LLM", "responde a las consultas")}
        <div class="flow__side"><span>Cloud Storage</span><span>IAM</span><span>Toda la infraestructura en Terraform</span></div>
      </div>`,
  };

  function contentFor(key) {
    if (key === "iam") {
      return `
        <div class="insp__top"><span class="chip chip--live">Adjuntas a todos los recursos</span></div>
        <h2 class="insp__title" id="insp-title">Políticas IAM</h2>
        <p class="insp__long">Soft skills · principio de mínimo privilegio aplicado a mí mismo: solo lo que puedo demostrar.</p>
        ${sec("Fortalezas", `<p>${P.policiesIntro}</p>`)}
        <div class="policy-cards">${P.policies.map((p, i) => `
          <article class="policy" id="pol-${i}">
            <div class="policy__code"><span class="eff">Allow</span> · ${esc(p.action)}</div>
            <h4>${esc(p.name)}</h4>
            <p>${esc(p.text)}</p>
            <p class="proof">${linkify(p.proof)}</p>
          </article>`).join("")}
        </div>`;
    }
    if (key.startsWith("tech:")) {
      const t = techById[key.slice(5)];
      const used = t.used.map((id) => byId[id]).filter(Boolean);
      return `
        <div class="insp__top"><span class="insp__ref">Stack · ${esc(t.group)}</span></div>
        <h2 class="insp__title" id="insp-title">${esc(t.name)}</h2>
        ${t.full && t.full !== t.name ? `<p class="insp__long">${esc(t.full)}</p>` : ""}
        ${t.desc ? sec("Experiencia", `<p class="insp__lead">${linkify(t.desc)}</p>`) : sec("Experiencia", `<p class="insp__private">Descripción en preparación.</p>`)}
        ${used.length ? sec("Dónde aparece en el plano", `<ul class="insp__list">${used.map((n) => `<li><a class="inline-link" href="#${n.slug}">${esc(n.title)}</a> <span class="mono" style="color:var(--ink-2);font-size:.85em">· Ref. ${ref(n)}</span></li>`).join("")}</ul>`) : ""}
        <div class="insp__actions"><button type="button" class="btn btn--ghost" data-close>Ver resaltado en el plano</button></div>`;
    }
    const n = byId[key];
    switch (n.kind) {
      case "gateway":
        return `${head(n)}
          ${sec("Sobre mí", `<p class="insp__lead">${esc(P.about)}</p>`)}
          ${sec("Ficha", `<dl class="spec" style="max-width:none">
            <dt>Rol</dt><dd>${esc(C.role)} · ${esc(C.currentCompany)}</dd>
            <dt>Ubicación</dt><dd>${esc(C.location)}</dd>
            <dt>Movilidad</dt><dd>${esc(C.availability)}</dd>
            <dt>Idiomas</dt><dd>${C.languages.map((l) => `${esc(l.name)} (${esc(l.level)})`).join(" · ")}</dd>
            <dt>Email</dt><dd><span class="mono" style="user-select:all">${esc(C.email)}</span></dd>
          </dl>`)}
          <div class="insp__actions">${contactButtons()}</div>`;
      case "experience":
        return `${head(n)}
          ${sec("Qué hago", list(n.bullets))}
          ${sec("Tecnologías", staticTags(n.stackText))}`;
      case "activity":
        return `${head(n)}
          ${sec("Actividades", `<ul class="items">${n.items.map((it) => `<li><span class="t">${esc(it.title)}</span><span class="y">${esc(it.time)}</span><span class="o">${esc(it.org)}</span>${it.text ? `<span class="x">${esc(it.text)}</span>` : ""}</li>`).join("")}</ul>`)}
          ${sec("Lo que me aporta", `<p>Liderar un grupo hacia un objetivo común y explicar lo complejo de forma sencilla. Lo verás reflejado en las <a class="inline-link" href="#politicas-iam">políticas IAM</a>.</p>`)}`;
      case "project":
        return `${head(n)}
          ${n.problem ? sec("Problema", `<p>${esc(n.problem)}</p>`) : ""}
          ${n.solution ? sec("Solución", `<p>${esc(n.solution)}</p>`) : ""}
          ${sec("Mi rol", `<p>${esc(n.role)}</p>`)}
          ${n.diagram ? sec("Arquitectura", DIAGRAMS[n.diagram]()) : ""}
          ${n.did && n.did.length ? sec("Qué hice", list(n.did)) : ""}
          ${sec("Stack", staticTags(n.stackText))}
          ${sec("Resultado", resultBox(n.result))}
          ${n.gallery ? sec("Capturas", `<div class="gallery">${n.gallery.map((g) => `<figure><img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy" width="1116" height="633"><figcaption>${esc(g.alt)}</figcaption></figure>`).join("")}</div>`) : ""}
          ${n.download === "memoria" && C.memoriaPdf ? `<div class="insp__actions"><a class="btn btn--ink" href="${esc(C.memoriaPdf)}" target="_blank" rel="noopener" download>Descargar la memoria (PDF)</a></div>` : ""}
          ${n.privateNote ? `<p class="insp__private" style="margin-top:18px">${esc(n.privateNote)}</p>` : ""}`;
      case "education": {
        const minor = P.stack.find((g) => g.minor);
        return `${head(n)}
          ${sec("Titulación", `<p class="insp__lead">Grado en Ingeniería Informática por la Universidad Politécnica de Madrid (2022–2026).</p><p>Trabajo de Fin de Grado: <a class="inline-link" href="#${byId.acm.slug}">A Critical Mind</a>.</p>`)}
          ${minor ? sec("Otros lenguajes de la carrera", `<ul class="items">${minor.items.map((t) => `<li><span class="t">${esc(t.name)}</span><span class="x">${esc(t.desc)}</span></li>`).join("")}</ul>`) : ""}`;
      }
      case "courses": {
        const certs = P.certifications.length ? sec("Certificaciones oficiales", `<ul class="items">${P.certifications.map((c) => `<li><span class="t">${c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.name)}</a>` : esc(c.name)}</span><span class="y">${esc(c.year)}</span><span class="o">${esc(c.org)}</span></li>`).join("")}</ul>`) : "";
        return `${head(n)}
          ${certs}
          ${P.courses.map((g) => sec(esc(g.group), `<ul class="items">${g.items.map((c) => `<li class="${c.ongoing ? "ongoing" : ""}"><span class="t">${c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.name)}</a>` : esc(c.name)}</span><span class="y">${esc(c.year)}</span><span class="o">${esc(c.org)}</span></li>`).join("")}</ul>`)).join("")}`;
      }
    }
    return head(n);
  }

  const insp = $("#inspector"), scrim = $("#scrim");
  let currentKey = null, lastFocus = null;
  function addrFor(key) {
    if (key === "iam") return 'module.iam.politicas["soft_skills"]';
    if (key.startsWith("tech:")) return `provider.stack["${key.slice(5)}"]`;
    return byId[key].address || "";
  }
  function titleFor(key) {
    if (key === "iam") return "Políticas IAM";
    if (key.startsWith("tech:")) return techById[key.slice(5)].name;
    return byId[key].title;
  }
  function openPanel(key, opts = {}) {
    if (!insp.hidden && currentKey === key) return;
    if (insp.hidden) lastFocus = document.activeElement;
    currentKey = key;
    $("#insp-addr").textContent = addrFor(key);
    $("#insp-body").innerHTML = contentFor(key);
    $("#insp-body").scrollTop = 0;
    const idx = TOUR.indexOf(key);
    const prev = $("#insp-prev"), next = $("#insp-next"), count = $("#insp-count");
    if (idx >= 0) {
      prev.disabled = idx === 0; next.disabled = idx === TOUR.length - 1;
      prev.textContent = idx > 0 ? "← " + titleFor(TOUR[idx - 1]) : "←";
      next.textContent = idx < TOUR.length - 1 ? titleFor(TOUR[idx + 1]) + " →" : "Fin →";
      prev.dataset.go = idx > 0 ? TOUR[idx - 1] : ""; next.dataset.go = idx < TOUR.length - 1 ? TOUR[idx + 1] : "";
      count.textContent = String(idx + 1).padStart(2, "0") + " / " + String(TOUR.length).padStart(2, "0");
    } else {
      prev.disabled = true; next.disabled = false; prev.textContent = "←"; next.textContent = "Volver al plano";
      prev.dataset.go = ""; next.dataset.go = "__close"; count.textContent = "Stack";
    }
    insp.hidden = false; scrim.hidden = false;
    document.documentElement.style.overflow = "hidden";
    $$(".node.is-active").forEach((n) => n.classList.remove("is-active"));
    const nodeEl = $(`.node[data-id="${key}"]`);
    if (nodeEl) nodeEl.classList.add("is-active");
    if (opts.policy != null) {
      const el = $("#pol-" + opts.policy);
      if (el) { el.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" }); el.classList.add("is-flash"); }
    }
    if (key.startsWith("tech:")) setFilter(key.slice(5));
    setTimeout(() => $("#insp-close").focus({ preventScroll: true }), 30);
  }
  function closePanel(fromHash) {
    if (insp.hidden) return;
    insp.hidden = true; scrim.hidden = true; currentKey = null;
    document.documentElement.style.overflow = "";
    $$(".node.is-active").forEach((n) => n.classList.remove("is-active"));
    if (!fromHash && location.hash) history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }
  function go(key) {
    const slug = slugOf(key);
    if (location.hash === "#" + slug) route(); else location.hash = slug;
  }

  /* ------------------------------------------------------------------
     Modo lectura: CV limpio y lineal
     ------------------------------------------------------------------ */
  function renderRead() {
    const exp = ["cloud", "datos"].map((id) => byId[id]);
    const proj = ["demand", "mcp", "acm"].map((id) => byId[id]);
    const act = byId.actividades;
    const entryExp = (n) => `
      <div class="entry" id="${n.slug}">
        <div class="entry__head"><h3>${esc(n.title === "Arquitecto Cloud Jr." ? "Arquitecto Cloud Junior" : n.title)} <span style="font-weight:400;color:var(--ink-2)">(${esc(n.type.toLowerCase())})</span></h3><span class="entry__when">${esc(n.meta)}</span></div>
        <p class="entry__org">${esc(n.sub)}</p>
        <ul>${n.bullets.map((b) => `<li>${linkify(b)}</li>`).join("")}</ul>
        <p class="stackline"><b>Tecnologías:</b> ${esc(n.stackText.join(", "))}.</p>
      </div>`;
    const entryProj = (n) => `
      <div class="entry" id="${n.slug}">
        <div class="entry__head"><h3>${esc(n.long || n.title)}</h3><span class="entry__when">${esc(n.statusText)}</span></div>
        ${n.problem ? `<h4>Problema</h4><p>${esc(n.problem)}</p>` : ""}
        ${n.solution ? `<h4>Solución</h4><p>${esc(n.solution)}</p>` : ""}
        <h4>Mi rol</h4><p>${esc(n.role)}</p>
        ${n.did && n.did.length ? `<h4>Qué hice</h4><ul>${n.did.map((b) => `<li>${b}</li>`).join("")}</ul>` : ""}
        <p class="stackline"><b>Stack:</b> ${esc(n.stackText.join(", "))}.</p>
        <h4>Resultado</h4><p>${esc(n.result)}</p>
        ${n.download === "memoria" && C.memoriaPdf ? `<p><a class="inline-link" href="${esc(C.memoriaPdf)}" target="_blank" rel="noopener" download>Descargar la memoria del TFG (PDF)</a></p>` : ""}
      </div>`;
    const certs = P.certifications.length ? `<h4>Certificaciones oficiales</h4><ul>${P.certifications.map((c) => `<li>${esc(c.name)} · ${esc(c.org)} · ${esc(c.year)}</li>`).join("")}</ul>` : "";
    $("#lectura").innerHTML = `
      <header>
        <p class="eyebrow">Currículum · versión en texto</p>
        <h1 class="insp__title" style="font-size:clamp(2.4rem,7vw,3.6rem)">${esc(C.name)}</h1>
        <p style="font-weight:600;font-size:1.15rem;margin:8px 0 4px">${esc(C.role)}</p>
        <p>${esc(C.tagline)}</p>
        <dl style="margin-top:16px">
          <dt>Ubicación</dt><dd>${esc(C.location)}</dd>
          <dt>Movilidad</dt><dd>${esc(C.availability)}</dd>
          <dt>Idiomas</dt><dd>${C.languages.map((l) => `${esc(l.name)} (${esc(l.level)})`).join(" · ")}</dd>
          <dt>Email</dt><dd><span class="mono" style="user-select:all">${esc(C.email)}</span></dd>
        </dl>
        <div class="hero__actions" style="margin-top:18px">${contactButtons({ noCv: true })}<a class="btn" data-cv data-cv-only href="#lectura" hidden></a></div>
      </header>

      <h2 id="r-sobre-mi" style="margin-top:36px">Sobre mí</h2>
      <p>${esc(P.about)}</p>

      <h2>Experiencia</h2>
      ${exp.map(entryExp).join("")}

      <h2>Proyectos</h2>
      ${proj.map(entryProj).join("")}

      <h2>Formación</h2>
      <div class="entry" id="${byId.upm.slug}">
        <div class="entry__head"><h3>Grado en Ingeniería Informática</h3><span class="entry__when">2022 — 2026</span></div>
        <p class="entry__org">Universidad Politécnica de Madrid</p>
      </div>
      <div class="entry" id="${byId.cursos.slug}">
        ${certs}
        ${P.courses.map((g) => `<h4>${esc(g.group)}</h4><ul>${g.items.map((c) => `<li>${esc(c.name)} · ${esc(c.org)} · ${esc(c.year)}</li>`).join("")}</ul>`).join("")}
      </div>

      <h2 id="stack">Stack técnico</h2>
      ${P.stack.map((g) => `<h4>${esc(g.group)}</h4><ul>${g.items.map((t) => `<li><b>${esc(t.full || t.name)}</b>${t.desc ? ": " + linkify(t.desc.charAt(0).toLowerCase() + t.desc.slice(1)) : ""}</li>`).join("")}</ul>`).join("")}

      <h2>Actividades complementarias</h2>
      <div class="entry" id="${act.slug}">
        <ul>${act.items.map((it) => `<li>${esc(it.title)} · ${esc(it.org)}${it.text ? " · " + esc(it.text.replace(/\.$/, "").toLowerCase()) : ""} (${esc(it.time.toLowerCase())})</li>`).join("")}</ul>
      </div>

      <h2 id="politicas-iam">Soft skills</h2>
      <p>${P.policiesIntro}</p>
      <ul>${P.policies.map((p) => `<li><b>${esc(p.name)}:</b> ${esc(p.text.charAt(0).toLowerCase() + p.text.slice(1))} <span style="color:var(--ink-2)">${linkify(p.proof)}</span></li>`).join("")}</ul>

      <div class="read__back"><button type="button" class="btn btn--ink" data-mode="plano">Volver al plano</button></div>`;
  }

  let mode = "plano";
  function setMode(m, opts = {}) {
    mode = m === "lectura" ? "lectura" : "plano";
    document.body.classList.toggle("mode-lectura", mode === "lectura");
    $("#lectura").hidden = mode !== "lectura";
    $$(".seg__btn").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
    store.set("ggr-mode", mode);
    closePanel(true);
    if (mode === "plano" && opts.redraw !== false) requestAnimationFrame(drawWires);
    if (!opts.silent) {
      const target = mode === "lectura" ? $("#lectura") : $("#plano");
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }

  /* ------------------------------------------------------------------
     Cajetín (pie)
     ------------------------------------------------------------------ */
  function renderCartouche() {
    const links = [
      `<a href="mailto:${esc(C.email)}">${esc(C.email)}</a>`,
      C.linkedin ? `<a href="${esc(C.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : "",
      C.github ? `<a href="${esc(C.github)}" target="_blank" rel="noopener">GitHub</a>` : "",
      `<a data-cv href="#lectura">CV completo</a>`,
    ].filter(Boolean).join("");
    const cell = (k, v) => `<div class="cartouche__cell"><span class="cartouche__k">${k}</span><span class="cartouche__v">${v}</span></div>`;
    $("#cartouche").innerHTML = `
      <div class="cartouche__cell cartouche__big">
        <div><span class="cartouche__k">Proyecto · contacto</span><span class="cartouche__v">${esc(C.name)}</span></div>
        <div class="cartouche__links">${links}</div>
      </div>
      ${cell("Plano", "Arquitectura profesional")}
      ${cell("Escala", "1:1 · tamaño real")}
      ${cell("Fecha", esc(C.date))}
      ${cell("Autor", esc(C.initials))}
      ${cell("Revisión", esc(C.revision))}
      ${cell("Estado", '<span class="chip chip--running">En producción</span>')}
      <div class="cartouche__cell cartouche__foot"><span>Dibujado a mano en HTML, CSS y JavaScript · alojado en GitHub Pages</span><span>Consola: tecla <kbd>º</kbd> o botón <kbd>&gt;_</kbd></span></div>`;
  }

  /* ------------------------------------------------------------------
     Consola
     ------------------------------------------------------------------ */
  const con = $("#console"), out = $("#console-out"), input = $("#console-input");
  const hist = []; let hIdx = -1; let greeted = false;
  function print(html, cls) {
    const div = document.createElement("div");
    if (cls) div.className = cls;
    div.innerHTML = html;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }
  const openBtn = (key, label) => `<button type="button" class="c-link" data-go="${key}">${esc(label)}</button>`;
  function openConsole() {
    con.hidden = false;
    if (!greeted) {
      greeted = true;
      print(`<span class="c-acc">GGR-OS 1.0</span> <span class="c-dim">· región es-madrid-1 · ${new Date().toLocaleDateString("es-ES")}</span>`);
      print(`Escribe <span class="c-cmd">help</span> para ver los comandos. <span class="c-dim">Prueba también ls, whoami o terraform plan.</span>`);
    }
    setTimeout(() => input.focus(), 20);
  }
  function closeConsole() { con.hidden = true; }

  const CMDS = {
    help() {
      print(`<span class="c-dim">Comandos disponibles</span>
  <span class="c-cmd">whoami</span>             quién soy
  <span class="c-cmd">ls</span>                 recursos del plano
  <span class="c-cmd">open</span> &lt;recurso&gt;     abre la ficha (p. ej. open demand-forecast)
  <span class="c-cmd">stack</span>              tecnologías
  <span class="c-cmd">contacto</span>           datos de contacto (alias: terraform output)
  <span class="c-cmd">cv</span> · <span class="c-cmd">memoria</span>       documentos
  <span class="c-cmd">lectura</span> · <span class="c-cmd">plano</span>     cambiar de vista
  <span class="c-cmd">tema</span>               papel ↔ cianotipia
  <span class="c-cmd">terraform</span> plan|apply|destroy
  <span class="c-cmd">clear</span> · <span class="c-cmd">exit</span>`);
    },
    whoami() { print(`<span class="c-acc">${esc(C.name)}</span> · ${esc(C.role)} en ${esc(C.currentCompany)}\n${esc(C.tagline)}`); },
    ls() {
      const rows = TOUR.map((k) => {
        const slug = slugOf(k);
        const n = byId[k];
        const st = n && n.statusText ? `<span class="c-dim">[${esc(n.statusText.toLowerCase())}]</span>` : "";
        return `  ${openBtn(k, slug.padEnd(24, " "))} ${st}`;
      });
      print(rows.join("\n"));
    },
    open(arg) {
      if (!arg) { print(`uso: open &lt;recurso&gt; <span class="c-dim">· escribe ls para ver la lista</span>`); return; }
      const a = arg.toLowerCase();
      let key = null;
      if (a === "iam" || a.startsWith("polit") || a.startsWith("soft")) key = "iam";
      else {
        const n = P.nodes.find((x) => !x.passive && (x.slug === a || x.id === a || x.slug.includes(a) || x.title.toLowerCase().includes(a)));
        if (n) key = n.id;
        else { const t = techs.find((x) => x.id === a || x.name.toLowerCase() === a); if (t) key = "tech:" + t.id; }
      }
      if (!key) { print(`<span class="c-err">Error:</span> recurso «${esc(arg)}» no encontrado. Escribe <span class="c-cmd">ls</span>.`); return; }
      print(`<span class="c-dim">Abriendo ${esc(addrFor(key))}…</span>`);
      closeConsole(); go(key);
    },
    stack() {
      print(P.stack.map((g) => `<span class="c-dim"># ${esc(g.group)}</span>\n  ${g.items.map((t) => openBtn("tech:" + t.id, t.name)).join("  ")}`).join("\n"));
    },
    contacto() {
      print(`<span class="c-acc">Outputs:</span>\n
  email    = "<span style="user-select:all">${esc(C.email)}</span>"
  location = "${esc(C.location)}"${C.linkedin ? `\n  linkedin = "<a href="${esc(C.linkedin)}" target="_blank" rel="noopener">${esc(C.linkedin)}</a>"` : ""}${C.github ? `\n  github   = "<a href="${esc(C.github)}" target="_blank" rel="noopener">${esc(C.github)}</a>"` : ""}
  idiomas  = ["es: nativo", "en: B1 → B2"]`);
    },
    cv() { if (cvAvailable) { print(`<a href="${esc(C.cvPdf)}" target="_blank" rel="noopener" download>Descargar CV (PDF)</a>`); } else { print("Abriendo la versión en texto…"); closeConsole(); setMode("lectura"); } },
    memoria() { print(`<a href="${esc(C.memoriaPdf)}" target="_blank" rel="noopener" download>Memoria del TFG · A Critical Mind (PDF)</a>`); },
    lectura() { closeConsole(); setMode("lectura"); },
    plano() { closeConsole(); setMode("plano"); },
    tema() { toggleTheme(); print(`Tema: <span class="c-acc">${effectiveTheme() === "dark" ? "cianotipia" : "papel"}</span>`); },
    clear() { out.innerHTML = ""; },
    exit() { closeConsole(); },
    ping() { print(`PING guillermo (10.0.0.1): respuesta en <span class="c-acc">menos de 24 h</span> · escríbeme a ${esc(C.email)}`); },
    badminton() {
      print(`<span class="c-acc">      .
     /|\\
    / | \\      Un remate de bádminton puede superar los 400 km/h.
   /__|__\\     Llevo más de 7 años entrenando en el Club Bádminton Rivas.
     (_)       Los despliegues, en cambio, mejor sin prisas y con plan.</span>`);
    },
    terraform(arg) {
      const sub = (arg || "").split(/\s+/)[0];
      if (sub === "plan") {
        print(`<span class="c-dim">Refreshing state…</span>
Terraform will perform the following actions:

  <span class="c-warn">~</span> module.experiencia.arquitecto_cloud_jr
      nivel     = "junior" <span class="c-warn">-></span> "(known after apply)"
      aprendiendo = ["AWS", "CI/CD", "certificaciones oficiales"]

  <span class="c-acc">+</span> module.proyectos.servidor_mcp  <span class="c-dim">(en desarrollo)</span>

<b>Plan:</b> 1 to add, 1 to change, 0 to destroy.`);
      } else if (sub === "apply") {
        print(`<span class="c-dim">Aplicando de nuevo el plano…</span>`);
        closeConsole(); replayIntro();
      } else if (sub === "destroy") {
        print(`<span class="c-err">│ Error: Instance cannot be destroyed</span>
<span class="c-err">│</span>
<span class="c-err">│</span>   on guillermo.tf line 1:
<span class="c-err">│</span>    1: resource "ingeniero" "guillermo" {
<span class="c-err">│</span>
<span class="c-err">│</span> Resource has lifecycle.prevent_destroy = true.
<span class="c-err">│</span> Motivo: perseverancia (más de 7 años sin tirar la toalla).
<span class="c-err">│</span> Sugerencia: prueba mejor <span class="c-cmd">sudo contratar</span>.`);
      } else if (sub === "output") CMDS.contacto();
      else print(`uso: terraform plan | apply | destroy | output`);
    },
    sudo(arg) {
      if (/^(contratar|hire)/i.test(arg || "")) {
        print(`[sudo] contraseña para reclutador: ********
<span class="c-acc">Permiso concedido.</span> Política aplicada: <span class="c-cmd">Allow · contratar:Guillermo</span>
Siguiente paso → <a href="mailto:${esc(C.email)}?subject=${encodeURIComponent("Hablemos · portfolio")}">${esc(C.email)}</a>`);
      } else print(`<span class="c-err">sudo:</span> este usuario sigue el principio de mínimo privilegio. <span class="c-dim">(pista: sudo contratar)</span>`);
    },
  };
  const ALIASES = { cat: "open", cd: "open", contact: "contacto", "?": "help", ayuda: "help", hire: "sudo", contratar: "sudo", theme: "tema", read: "lectura" };

  function runCmd(raw) {
    const line = raw.trim();
    print(`<span class="c-acc">~$</span> <span class="c-cmd">${esc(line)}</span>`);
    if (!line) return;
    hist.unshift(line); hIdx = -1;
    let [cmd, ...rest] = line.split(/\s+/);
    cmd = cmd.toLowerCase();
    let arg = rest.join(" ");
    if (cmd === "hire" || cmd === "contratar") { arg = "contratar"; }
    const fn = CMDS[cmd] || CMDS[ALIASES[cmd]];
    if (fn) fn(arg);
    else print(`<span class="c-err">comando no encontrado:</span> ${esc(cmd)}. Escribe <span class="c-cmd">help</span>.`);
  }

  /* ------------------------------------------------------------------
     Tema
     ------------------------------------------------------------------ */
  function effectiveTheme() {
    const t = document.documentElement.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function toggleTheme() {
    const next = effectiveTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    store.set("ggr-theme", next);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "dark" ? "#0C2A4A" : "#EBF1F6");
  }

  /* ------------------------------------------------------------------
     Intro: "terraform apply" que traza el plano
     ------------------------------------------------------------------ */
  let plotting = false;
  const APPLY = [
    ["dim", "$ terraform apply -auto-approve"],
    ["", "module.perfil.sobre_mi: Creating…"],
    ["", "module.formacion.grado_ingenieria: Creation complete [2026]"],
    ["", "module.proyectos.a_critical_mind: Creation complete [MVP]"],
    ["", "module.experiencia.cientifico_datos: Creation complete [06/2026]"],
    ["", "module.proyectos.demand_forecast: Creation complete [4 pipelines]"],
    ["", "module.experiencia.arquitecto_cloud_jr: Still creating… [en curso]"],
    ["ok", "Apply complete! Resources: 9 added, 0 changed, 0 destroyed."],
  ];
  let applyTimers = [];
  function runApplyLog() {
    const el = $("#applylog");
    applyTimers.forEach(clearTimeout); applyTimers = [];
    el.className = "applylog is-on"; el.innerHTML = "";
    APPLY.forEach(([cls, txt], i) => {
      applyTimers.push(setTimeout(() => {
        const l = document.createElement("div");
        l.className = "l " + cls; l.textContent = txt;
        el.appendChild(l);
        while (el.children.length > 5) el.removeChild(el.firstChild);
      }, 120 + i * 210));
    });
    const end = 120 + APPLY.length * 210 + 1300;
    applyTimers.push(setTimeout(() => {
      el.className = "applylog is-on is-pill";
      el.innerHTML = `<span class="ok">✓ Plano aplicado</span> <span class="faint">· abre la consola con º o &gt;_</span>`;
      el.onclick = () => { el.className = "applylog"; openConsole(); };
    }, end));
    applyTimers.push(setTimeout(() => { el.className = "applylog"; el.onclick = null; }, end + 6000));
  }
  function replayIntro() {
    setMode("plano", { silent: true });
    $("#plano").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    plotting = !reduceMotion; firstDraw = true;
    const d = $("#diagram");
    d.classList.remove("is-plotting"); void d.offsetWidth;
    if (plotting) d.classList.add("is-plotting");
    drawWires();
    runApplyLog();
    setTimeout(() => d.classList.remove("is-plotting"), 2400);
  }

  /* ------------------------------------------------------------------
     Router por hash (#demand-forecast, #politicas-iam, #stack-oci…)
     ------------------------------------------------------------------ */
  function route() {
    const h = decodeURIComponent(location.hash.slice(1));
    if (!h) { closePanel(true); return; }
    if (h === "lectura") { if (mode !== "lectura") setMode("lectura"); return; }
    if (h === "plano") { setMode("plano"); return; }
    let key = null;
    if (h === "politicas-iam") key = "iam";
    else if (h.startsWith("stack-") && techById[h.slice(6)]) key = "tech:" + h.slice(6);
    else if (bySlug[h] && !bySlug[h].passive) key = bySlug[h].id;
    if (!key) return;
    if (mode === "lectura") {
      const target = document.getElementById(h === "politicas-iam" ? "politicas-iam" : h) || $("#stack");
      if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      return;
    }
    openPanel(key, { policy: pendingPolicy });
    pendingPolicy = null;
  }
  let pendingPolicy = null;

  /* ------------------------------------------------------------------
     Eventos
     ------------------------------------------------------------------ */
  function bind() {
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-mode],[data-copy-email],[data-tech],[data-policy],[data-clear-filter],[data-close],[data-go]");
      if (!t) return;
      if (t.matches("[data-mode]")) { e.preventDefault(); setMode(t.dataset.mode); if (location.hash) history.replaceState(null, "", location.pathname + location.search); }
      else if (t.matches("[data-copy-email]")) { e.preventDefault(); copyText(C.email); }
      else if (t.matches("[data-tech]")) {
        const id = t.dataset.tech;
        if (activeTech === id) { setFilter(null); return; }
        go("tech:" + id);
      }
      else if (t.matches("[data-policy]")) { pendingPolicy = +t.dataset.policy; if (currentKey === "iam") openPanel("iam", { policy: pendingPolicy }); else go("iam"); }
      else if (t.matches("[data-clear-filter]")) setFilter(null);
      else if (t.matches("[data-close]")) closePanel();
      else if (t.matches("[data-go]")) {
        const g = t.dataset.go;
        if (!g) return;
        if (g === "__close") { closePanel(); return; }
        if (t.classList.contains("c-link")) closeConsole();
        go(g);
      }
    });
    $("#insp-close").addEventListener("click", () => closePanel());
    scrim.addEventListener("click", () => closePanel());
    $("#btn-tour").addEventListener("click", () => go(TOUR[0]));
    $("#btn-theme").addEventListener("click", toggleTheme);
    $("#btn-console").addEventListener("click", () => (con.hidden ? openConsole() : closeConsole()));
    $("#console-close").addEventListener("click", closeConsole);
    $("#console-form").addEventListener("submit", (e) => { e.preventDefault(); const v = input.value; input.value = ""; runCmd(v); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") { e.preventDefault(); if (hIdx < hist.length - 1) { hIdx++; input.value = hist[hIdx]; } }
      else if (e.key === "ArrowDown") { e.preventDefault(); if (hIdx > 0) { hIdx--; input.value = hist[hIdx]; } else { hIdx = -1; input.value = ""; } }
      else if (e.key === "Tab") {
        const v = input.value.trim();
        const pool = v.startsWith("open ") ? TOUR.map((k) => "open " + slugOf(k)) : Object.keys(CMDS);
        const m = pool.filter((c) => c.startsWith(v));
        if (m.length === 1 && v) { e.preventDefault(); input.value = m[0] + " "; }
        else if (m.length > 1 && v) { e.preventDefault(); print(`<span class="c-dim">${m.map(esc).join("  ")}</span>`); }
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { if (!con.hidden) closeConsole(); else closePanel(); return; }
      const typing = /INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || "");
      if (!typing && (e.key === "º" || e.key === "`" || e.key === "ª")) { e.preventDefault(); con.hidden ? openConsole() : closeConsole(); return; }
      if (!insp.hidden && !typing && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
        const b = e.key === "ArrowRight" ? $("#insp-next") : $("#insp-prev");
        if (!b.disabled) b.click();
      }
      // Trampa de foco en la ficha
      if (e.key === "Tab" && !insp.hidden && con.hidden) {
        const f = $$('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])', insp).filter((x) => x.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // Hover en nodo -> ilumina sus tecnologías
    const d = $("#diagram");
    d.addEventListener("pointerover", (e) => {
      const n = e.target.closest(".node:not([data-passive])");
      $$(".tag.is-lit").forEach((t) => t.classList.remove("is-lit"));
      if (!n) return;
      techs.filter((t) => t.used.includes(n.dataset.id)).forEach((t) => { const b = $(`.tag[data-tech="${t.id}"]`); if (b) b.classList.add("is-lit"); });
    });
    d.addEventListener("pointerleave", () => $$(".tag.is-lit").forEach((t) => t.classList.remove("is-lit")));
    window.addEventListener("hashchange", route);

    let rT;
    const redraw = () => { cancelAnimationFrame(rT); rT = requestAnimationFrame(drawWires); };
    if ("ResizeObserver" in window) new ResizeObserver(redraw).observe(d);
    else window.addEventListener("resize", redraw);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(redraw);
    if ("IntersectionObserver" in window) new IntersectionObserver((es) => { diagramVisible = es[0].isIntersecting; }).observe(d);
  }

  /* ------------------------------------------------------------------
     Arranque
     ------------------------------------------------------------------ */
  function init() {
    renderHero();
    renderDiagram();
    renderNotes();
    renderRead();
    renderCartouche();
    bind();
    checkCv();
    applyCvLinks();

    const savedMode = store.get("ggr-mode");
    const firstVisit = !store.sget("ggr-applied");
    plotting = firstVisit && !reduceMotion;
    if (plotting) {
      const d = $("#diagram");
      d.classList.add("is-plotting");
      $$(".node__icon svg", d).forEach((s, i) => s.style.setProperty("--d", 120 + i * 90 + "ms"));
      setTimeout(() => d.classList.remove("is-plotting"), 2600);
    }
    setMode(savedMode === "lectura" && !location.hash ? "lectura" : "plano", { silent: true, redraw: false });
    requestAnimationFrame(() => {
      drawWires();
      if (firstVisit && !reduceMotion && mode === "plano") runApplyLog();
      store.sset("ggr-applied", "1");
      route();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
