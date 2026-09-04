/* =========================================================
   room.js — the home room: hotspots, zoom, panel, bookshelf view.
   Content comes from content.js (SITE) and books.js (BOOKS, MOVIES).
   ========================================================= */
(function () {
  const S = window.SITE, B = window.BOOKS || { shelves: [] }, M = window.MOVIES || { items: [] };
  const { el, renderBlocks } = window.R;
  const $ = (sel, root = document) => root.querySelector(sel);
  const roomById = Object.fromEntries(S.rooms.map(r => [r.id, r]));

  /* ---------- objects in the room (order = directory order) ---------- */
  const SPOTS = [
    { id: "about",        kanji: "窓",   title: "About",             sub: "The window. Start here.",                        room: "about" },
    { id: "books",        kanji: "本棚", title: "Bookshelf",         sub: "Everything I have read, with notes where I have them.", view: "books" },
    { id: "research",     kanji: "机",   title: "Research",          sub: "The laptop. What is open right now.",            room: "research" },
    { id: "publications", kanji: "紙",   title: "Papers on the floor", sub: "Publications, submitted and in preparation.",    room: "publications" },
    { id: "builds",       kanji: "箱",   title: "Builds",            sub: "The boxes on top of the shelf. Things I made.",   room: "builds" },
    { id: "beliefs",      kanji: "日記", title: "Things I believe",  sub: "The journal on the desk.",                       room: "beliefs" },
    { id: "writing",      kanji: "文",   title: "Writing",           sub: "The low shelf. Posts, wherever they live.",        view: "writing" },
    { id: "music",        kanji: "音",   title: "Music",             sub: "CDs and album covers.",                          view: "music" },
    { id: "movies",       kanji: "映",   title: "Movies",            sub: "The projector. Points at the wall you cannot see.", view: "movies" },
    { id: "outdoor",      kanji: "外",   title: "Outside",           sub: "Volleyball, hiking, the gym. A second room, coming.", view: "outdoor" },
    { id: "contact",      kanji: "植",   title: "Contact",           sub: "The plant on the sill.",                         room: "contact" },
    { id: "now",          kanji: "時",   title: "Now",               sub: "The clock.",                                     view: "now" },
  ];
  const byId = Object.fromEntries(SPOTS.map(s => [s.id, s]));
  const order = SPOTS.map(s => s.id);

  /* ---------- status + colophon ---------- */
  window.R.colophon("#colophon-links");

  const allBooks = B.shelves.flatMap(s => s.items.map(i => ({ ...i, shelf: s })));
  const reading = allBooks.filter(b => b.reads && b.reads.length && !b.reads[b.reads.length - 1].to);
  $("#status-books").textContent = allBooks.length;
  $("#status-reading").textContent = reading.length;

  /* ---------- directory ---------- */
  const dir = $("#dir-list");
  SPOTS.forEach((s, i) => {
    dir.append(el("li", {}, el("button", { type: "button", "data-spot": s.id, onclick: () => open(s.id) },
      el("span", { class: "k" }, s.kanji),
      el("span", { class: "t" }, s.title),
      el("span", { class: "n" }, String(i + 1).padStart(2, "0")))));
  });

  /* ---------- hotspot hover labels ---------- */
  const label = $("#hs-label"), inner = $("#scene-inner");
  document.querySelectorAll(".hs").forEach(h => {
    const s = byId[h.dataset.spot];
    h.setAttribute("tabindex", "0"); h.setAttribute("role", "button"); h.setAttribute("aria-label", s.title);
    h.addEventListener("mouseenter", () => showLabel(h, s));
    h.addEventListener("mousemove", () => showLabel(h, s));
    h.addEventListener("mouseleave", () => label.classList.remove("show"));
    h.addEventListener("click", () => open(s.id));
    h.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(s.id); } });
  });
  function showLabel(h, s) {
    const r = h.getBoundingClientRect(), p = inner.getBoundingClientRect();
    label.innerHTML = `<b>${s.kanji}</b>${s.title}`;
    label.style.left = (r.left - p.left + r.width / 2) + "px";
    label.style.top = (r.top - p.top) + "px";
    label.classList.add("show");
  }

  const scene = $("#scene"), wrap = $(".scene-wrap");

  /* ---------- fill mode: painting covers the viewport ---------- */
  const hotspots = document.querySelector(".hotspots");
  function fitScene() {
    const fill = document.body.classList.contains("fill");
    const mobile = matchMedia("(max-width: 820px)").matches;
    if (!fill || mobile) {
      scene.style.width = "";
      scene.style.height = "";
      if (hotspots) hotspots.setAttribute("preserveAspectRatio", "none");
      return;
    }
    scene.style.width = "100%";
    scene.style.height = "100%";
    if (hotspots) hotspots.setAttribute("preserveAspectRatio", "xMidYMid slice");
  }
  fitScene();
  window.addEventListener("resize", () => { fitScene(); if (current) zoomTo(current); });
  const sceneImg = document.querySelector(".scene-img");
  if (sceneImg && !sceneImg.complete) sceneImg.addEventListener("load", fitScene, { once: true });

  /* ---------- directory drawer + help toggles ---------- */
  const help = $("#help"), revealBtn = $("#reveal-toggle"), dirNav = $("#dir"), dirToggle = $("#dir-toggle");
  const store = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };
  function setDir(open) {
    dirNav.hidden = !open;
    dirToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("dir-open", open);
    if (open) dirNav.querySelector("button")?.focus({ preventScroll: true });
  }
  dirToggle.addEventListener("click", () => setDir(dirNav.hidden));
  document.addEventListener("click", e => {
    if (!dirNav.hidden && !dirNav.contains(e.target) && !dirToggle.contains(e.target)) setDir(false);
  });
  dirNav.addEventListener("click", e => { if (e.target.closest("button[data-spot]")) setDir(false); });
  /* "show objects" outlines every hotspot at once: hover does not exist on touch screens */
  function setReveal(on) { document.body.classList.toggle("reveal", on); revealBtn.setAttribute("aria-pressed", String(on)); store.set("reveal", on ? "1" : "0"); }
  setReveal(store.get("reveal") === "1");
  revealBtn.addEventListener("click", () => setReveal(!document.body.classList.contains("reveal")));
  function setHelp(open) { help.hidden = !open; if (!open) store.set("help", "seen"); }
  setHelp(store.get("help") !== "seen");
  $("#help-toggle").addEventListener("click", () => setHelp(help.hidden));
  $("#help-close").addEventListener("click", () => setHelp(false));

  /* ---------- zoom (clamped so the painting never pans into empty space) ---------- */
  const panel = $("#panel");
  function zoomTo(id) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { inner.style.transform = ""; return; }
    if (matchMedia("(max-width: 820px)").matches) { inner.style.transform = ""; return; }
    const targets = [...document.querySelectorAll(`.hs[data-spot="${id}"]`)];
    if (!targets.length) { inner.style.transform = ""; return; }
    // Snap to rest instantly before measuring; the CSS transition would otherwise
    // leave hotspots mid-flight when paging between open panels.
    inner.classList.add("no-transition");
    inner.style.transform = "";
    void inner.offsetWidth;
    const p = scene.getBoundingClientRect();
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    targets.forEach(t => {
      const r = t.getBoundingClientRect();
      x0 = Math.min(x0, r.left - p.left); y0 = Math.min(y0, r.top - p.top);
      x1 = Math.max(x1, r.right - p.left); y1 = Math.max(y1, r.bottom - p.top);
    });
    const w = x1 - x0, h = y1 - y0, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    const panelW = panel.classList.contains("open") ? panel.getBoundingClientRect().width : Math.min(560, window.innerWidth * 0.92);
    const free = window.innerWidth - panelW;
    const wrapRect = wrap.getBoundingClientRect();
    const sceneLeft = p.left - wrapRect.left, sceneTop = p.top - wrapRect.top;
    const s = Math.min(1.8, Math.max(1.1, Math.min(free * 0.55 / w, p.height * 0.65 / h)));
    let tx = (free / 2 - sceneLeft) - cx * s;
    let ty = (wrapRect.height / 2 - sceneTop) - cy * s;
    tx = Math.min(0, Math.max(p.width * (1 - s), tx));
    ty = Math.min(0, Math.max(p.height * (1 - s), ty));
    inner.classList.remove("no-transition");
    requestAnimationFrame(() => {
      inner.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    });
  }
  function unzoom() { inner.style.transform = ""; }

  /* ---------- panel ---------- */
  const scrim = $("#scrim");
  let current = null, lastTrigger = null;
  function setActive(id) {
    document.querySelectorAll(".hs").forEach(h => h.classList.toggle("active", h.dataset.spot === id));
    document.querySelectorAll(".dir-list button").forEach(b => b.classList.toggle("active", b.dataset.spot === id));
  }
  function open(id, push = true) {
    const s = byId[id]; if (!s) return;
    if (!current) lastTrigger = document.activeElement;
    current = id;
    $("#panel-kanji").textContent = s.kanji;
    $("#panel-title").textContent = s.title;
    $("#panel-sub").textContent = s.sub || "";
    const body = $("#panel-body"); body.innerHTML = ""; body.append(renderSpot(s)); body.scrollTop = 0;
    const i = order.indexOf(id);
    $("#pager-prev").textContent = "← " + byId[order[(i - 1 + order.length) % order.length]].title.toLowerCase();
    $("#pager-next").textContent = byId[order[(i + 1) % order.length]].title.toLowerCase() + " →";
    panel.classList.add("open"); panel.setAttribute("aria-hidden", "false"); scrim.classList.add("show");
    document.body.classList.add("panel-open");
    setActive(id); zoomTo(id);
    /* one history entry per opened object, so the browser Back button closes the panel */
    if (push) { if (current && history.state && history.state.spot) history.replaceState({ spot: id }, "", "#" + id); else history.pushState({ spot: id }, "", "#" + id); }
    $("#panel-close").focus({ preventScroll: true });
  }
  function close(fromHistory) {
    panel.classList.remove("open"); panel.setAttribute("aria-hidden", "true"); scrim.classList.remove("show");
    document.body.classList.remove("panel-open");
    setActive(null); unzoom(); current = null;
    if (!fromHistory) history.pushState(null, "", location.pathname);
    if (lastTrigger && lastTrigger.focus) lastTrigger.focus({ preventScroll: true });
  }
  window.addEventListener("popstate", e => {
    const id = e.state && e.state.spot;
    if (id && byId[id]) open(id, false); else if (current) close(true);
  });
  $("#panel-close").addEventListener("click", () => close());
  scrim.addEventListener("click", () => close());
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && current) { close(); return; }
    if (e.key === "Escape" && !dirNav.hidden) { setDir(false); return; }
    if (!current) return;
    if (e.key === "ArrowRight") open(order[(order.indexOf(current) + 1) % order.length]);
    if (e.key === "ArrowLeft") open(order[(order.indexOf(current) - 1 + order.length) % order.length]);
  });
  $("#pager-prev").addEventListener("click", () => open(order[(order.indexOf(current) - 1 + order.length) % order.length]));
  $("#pager-next").addEventListener("click", () => open(order[(order.indexOf(current) + 1) % order.length]));

  /* ---------- what each object shows ---------- */
  function renderSpot(s) {
    if (s.room) return renderBlocks(roomById[s.room]);
    switch (s.view) {
      case "books": return renderShelf();
      case "music": return renderMusic();
      case "writing": return renderWriting();
      case "movies": return renderMovies();
      case "outdoor": return renderOutdoor();
      case "now": return renderNow();
    }
    return document.createDocumentFragment();
  }

  /* ---------- bookshelf view ---------- */
  const fmt = ym => {
    if (!ym) return "";
    const [y, m] = ym.split("-");
    return m ? new Date(+y, +m - 1, 1).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : y;
  };
  const span = r => r.to ? (r.from === r.to ? fmt(r.from) : fmt(r.from) + " to " + fmt(r.to)) : fmt(r.from) + " to now";
  const hue = t => { let h = 0; for (const c of t) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
  const isReading = b => b.reads && b.reads.length && !b.reads[b.reads.length - 1].to;

  function renderShelf() {
    const frag = document.createDocumentFragment();
    frag.append(el("p", { class: "intro" }, "Spines are colored by title, not by cover. Tap one to open it."));
    const lg = el("ul", { class: "legend" });
    [["reading", "reading now"], ["reread", "reread"], ["reviewed", "has notes"]].forEach(([c, t]) => lg.append(el("li", {}, el("i", { class: c }), t)));
    frag.append(lg);
    B.shelves.forEach(sh => {
      if (!sh.items.length && sh.id !== "stories") return;
      const sec = el("section", { class: "shelf" });
      sec.append(el("h3", {}, `${sh.kanji} ${sh.label}`, el("span", { class: "count" }, ` ${sh.items.length}`)));
      const row = el("div", { class: "spines" });
      if (!sh.items.length) row.append(el("p", { class: "empty" }, "Nothing shelved here yet."));
      sh.items.forEach(b => {
        const sp = el("button", { type: "button", class: "spine" + (isReading(b) ? " reading" : "") + (b.rereads ? " reread" : "") + (b.review ? " reviewed" : ""),
          style: `--h:${hue(b.title)}; --w:${Math.min(44, Math.max(24, 18 + b.title.length))}px`, title: b.title,
          onclick: () => toggleCard(sp, b) },
          el("span", { class: "spine-title" }, b.title));
        row.append(sp);
      });
      sec.append(row);
      sec.append(el("div", { class: "book-card", hidden: "" }));
      frag.append(sec);
    });
    return frag;
  }
  function toggleCard(sp, b) {
    const sec = sp.closest(".shelf"), card = sec.querySelector(".book-card");
    const already = sp.classList.contains("open");
    sec.querySelectorAll(".spine.open").forEach(x => x.classList.remove("open"));
    if (already) { card.hidden = true; return; }
    sp.classList.add("open");
    card.innerHTML = "";
    card.append(el("h4", {}, b.title));
    const meta = [];
    if (b.author) meta.push(b.author);
    if (b.kind) meta.push(b.kind);
    card.append(el("p", { class: "meta" }, meta.join(" · ")));
    const reads = el("ul", { class: "reads" });
    (b.reads || []).forEach((r, i) => reads.append(el("li", {}, (i === 0 ? "read " : "reread ") + span(r))));
    card.append(reads);
    if (b.rating) card.append(el("p", { class: "rating" }, "★".repeat(b.rating) + "☆".repeat(5 - b.rating)));
    card.append(b.review ? el("p", { class: "review" }, b.review) : el("p", { class: "review none" }, "No notes yet. I write these slowly."));
    card.hidden = false;
    card.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  /* ---------- music / movies / outdoor / now ---------- */
  function renderMusic() {
    const frag = document.createDocumentFragment();
    const MU = window.MUSIC;
    if (!MU || !MU.items || !MU.items.length) {
      frag.append(el("p", {}, "The album covers on the wall are real; the list behind them is still being typed up. Songs and albums I keep returning to will go here, each with a player."));
      frag.append(el("p", { class: "intro" }, "To add music: create music.js with window.MUSIC = { items: [{ title, artist, link, note }] } and include it in index.html."));
      return frag;
    }
    const grid = el("div", { class: "albums" });
    MU.items.forEach(m => grid.append(el("a", { class: "album", href: m.link || "#", target: "_blank", rel: "noopener" },
      el("span", { class: "album-art", style: `--h:${hue(m.title)}` }),
      el("span", { class: "album-title" }, m.title), el("span", { class: "album-artist" }, m.artist || ""),
      m.note ? el("span", { class: "album-note" }, m.note) : null)));
    frag.append(grid);
    return frag;
  }
  function renderWriting() {
    const frag = document.createDocumentFragment();
    const P = window.POSTS || { items: [], feeds: [] };
    if (!P.items.length) {
      frag.append(el("p", {}, "Nothing published yet. Short posts, reading notes, and arguments I am not sure of will be listed here, each linking out to wherever it was published."));
    } else {
      P.items.slice().sort((a, b) => (b.date || "").localeCompare(a.date || "")).forEach(x => {
        const d = el("div", { class: "post" },
          el("h4", {}, x.url ? el("a", { href: x.url, target: "_blank", rel: "noopener" }, x.title) : x.title),
          x.where ? el("span", { class: "where" }, x.where) : null,
          el("span", { class: "when" }, fmt(x.date)));
        if (x.summary) d.append(el("p", {}, x.summary));
        frag.append(d);
      });
    }
    if (P.feeds && P.feeds.length) {
      frag.append(el("h3", {}, "Where I post"));
      const ul = el("ul", { class: "feeds" });
      P.feeds.forEach(f => ul.append(el("li", {}, el("a", { href: f.url, target: "_blank", rel: "noopener" }, f.label))));
      frag.append(ul);
    }
    return frag;
  }

  function renderMovies() {
    const frag = document.createDocumentFragment();
    if (!M.items.length) {
      frag.append(el("p", {}, "Nothing on the reel yet. Films I have watched, with a line or two each, will be listed here once the list is typed up."));
      return frag;
    }
    M.items.forEach(m => frag.append(el("div", { class: "entry" },
      el("h4", {}, m.title + (m.year ? ` (${m.year})` : "")),
      el("p", { class: "meta" }, [m.director, (m.watched || []).map(fmt).join(", ")].filter(Boolean).join(" · ")),
      m.rating ? el("p", { class: "rating" }, "★".repeat(m.rating) + "☆".repeat(5 - m.rating)) : null,
      el("p", {}, m.review || ""))));
    return frag;
  }
  function renderOutdoor() {
    const frag = document.createDocumentFragment();
    frag.append(el("p", {}, "Fitness is a large part of who I am: physical therapy I had to learn the hard way, plyometrics, serratus push-ups, club volleyball, hiking, pilates, and a summit of Kilimanjaro. This is the door to a second room that does not exist yet."));
    frag.append(el("p", { class: "intro" }, "Planned: a gym and trailhead scene with a volleyball net, a pull-up bar, hiking boots, a pilates mat, and a corkboard of trail photos, each opening a log."));
    return frag;
  }
  function renderNow() {
    const frag = document.createDocumentFragment();
    frag.append(el("p", {}, S.now || ""));
    if (reading.length) {
      frag.append(el("h3", {}, "Reading right now"));
      const ul = el("ul"); reading.forEach(b => ul.append(el("li", {}, b.title + (b.author ? ", " + b.author : "")))); frag.append(ul);
    }
    frag.append(el("h3", {}, "Reach me"));
    frag.append(window.R.linksList());
    return frag;
  }

  /* ---------- mobile stack ---------- */
  const stack = $("#stack");
  SPOTS.forEach(s => {
    const sec = el("section", { id: "s-" + s.id });
    sec.append(el("h2", {}, el("span", {}, s.kanji), s.title));
    const body = el("div", { class: "panel-body" }); body.append(renderSpot(s)); sec.append(body);
    stack.append(sec);
  });

  /* ---------- deep link ---------- */
  const h = location.hash.replace("#", "");
  if (h && byId[h]) setTimeout(() => open(h, false), 50);
})();
