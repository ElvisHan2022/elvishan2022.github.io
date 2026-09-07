/* =========================================================
   app.js — renders content.js into the map, panel, and mobile stack.
   You should not need to edit this to update the site.
   ========================================================= */
(function () {
  const S = window.SITE;
  const rooms = S.rooms;
  const byId = Object.fromEntries(rooms.map(r => [r.id, r]));
  const order = rooms.map(r => r.id);

  /* ---------- helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v;
      else if (k === "html") n.innerHTML = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    for (const k of kids) if (k != null) n.append(k);
    return n;
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- render a room's blocks into HTML ---------- */
  function pubStatusClass(status) {
    const s = (status || "").toLowerCase();
    if (s.includes("accepted")) return "accepted";
    if (s.includes("submitted") || s.includes("in review") || s.includes("under review")) return "review";
    return "progress";
  }

  function renderBlocks(room) {
    const frag = document.createDocumentFragment();
    if (room.intro) frag.append(el("p", { class: "intro" }, room.intro));
    if (room.beliefs) {
      const ol = el("ol", { class: "beliefs" });
      room.beliefs.forEach(b => ol.append(el("li", {}, b)));
      frag.append(ol);
    }
    (room.blocks || []).forEach(b => {
      switch (b.type) {
        case "p": frag.append(el("p", {}, b.text)); break;
        case "h": frag.append(el("h3", {}, b.text)); break;
        case "list": {
          const ul = el("ul");
          b.items.forEach(i => ul.append(el("li", {}, i)));
          frag.append(ul); break;
        }
        case "entry": {
          const d = el("div", { class: "entry" },
            el("h4", {}, b.title),
            el("p", { class: "meta" }, b.meta || ""),
            el("p", {}, b.text || ""));
          if (b.link) d.append(el("a", { class: "more", href: b.link, target: "_blank", rel: "noopener" }, "source ↗"));
          if (b.tags && b.tags.length) {
            const t = el("div", { class: "tags" });
            b.tags.forEach(x => t.append(el("span", {}, x)));
            d.append(t);
          }
          frag.append(d); break;
        }
        case "pub-legend": {
          const leg = el("ul", { class: "pub-legend", "aria-label": "Publication status key" });
          [["accepted", "Accepted"], ["review", "In review"], ["progress", "In progress"]].forEach(([cls, label]) => {
            leg.append(el("li", {}, el("span", { class: "pub-status " + cls }, label)));
          });
          frag.append(leg); break;
        }
        case "pub": {
          const cls = pubStatusClass(b.status);
          const d = el("div", { class: "pub" },
            el("h4", {}, b.title),
            el("div", { class: "pub-meta" },
              b.venue ? el("span", { class: "venue" }, b.venue) : null,
              el("span", { class: "pub-status " + cls }, b.status || "")));
          if (b.text) d.append(el("p", {}, b.text));
          if (b.link) d.append(el("a", { class: "more", href: b.link, target: "_blank", rel: "noopener" }, "code ↗"));
          frag.append(d); break;
        }
        case "links": {
          const ul = el("ul", { class: "links" });
          const L = S.links || {};
          if (L.email) ul.append(el("li", {}, el("a", { href: "mailto:" + L.email }, el("span", { class: "k" }, "email"), L.email)));
          if (L.github) ul.append(el("li", {}, el("a", { href: L.github, target: "_blank", rel: "noopener" }, el("span", { class: "k" }, "github"), L.github.replace(/^https?:\/\//, ""))));
          if (L.linkedin) ul.append(el("li", {}, el("a", { href: L.linkedin, target: "_blank", rel: "noopener" }, el("span", { class: "k" }, "linkedin"), L.linkedin.replace(/^https?:\/\//, ""))));
          if (L.scholar) ul.append(el("li", {}, el("a", { href: L.scholar, target: "_blank", rel: "noopener" }, el("span", { class: "k" }, "scholar"), "google scholar")));
          frag.append(ul); break;
        }
      }
    });
    return frag;
  }

  /* ---------- top strip + status ---------- */
  $("#site-name").textContent = S.name;
  $("#site-loc").textContent = S.location;
  $("#site-now").textContent = S.now || "";
  const beliefsRoom = rooms.find(r => r.beliefs);
  $("#status-beliefs").textContent = beliefsRoom ? beliefsRoom.beliefs.length : 0;
  $("#status-rooms").textContent = rooms.length;
  $("#status-updated").textContent = new Date(document.lastModified).toLocaleDateString("en-US", { month: "short", year: "numeric" });

  function tick() {
    try {
      $("#clock").textContent = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Los_Angeles" }).format(new Date());
    } catch (e) { $("#clock").textContent = new Date().toTimeString().slice(0, 5); }
  }
  tick(); setInterval(tick, 30000);

  /* ---------- directory ---------- */
  const dir = $("#dir-list");
  rooms.forEach((r, i) => {
    dir.append(el("li", {}, el("button", { type: "button", "data-room": r.id, onclick: () => open(r.id) },
      el("span", { class: "k" }, r.kanji),
      el("span", { class: "t" }, r.title),
      el("span", { class: "n" }, String(i + 1).padStart(2, "0")))));
  });

  /* ---------- colophon links ---------- */
  const col = $("#colophon-links");
  const L = S.links || {};
  if (L.github) col.append(el("a", { href: L.github, target: "_blank", rel: "noopener" }, "github"));
  if (L.linkedin) col.append(el("a", { href: L.linkedin, target: "_blank", rel: "noopener" }, "linkedin"));
  if (L.email) col.append(el("a", { href: "mailto:" + L.email }, "email"));

  /* ---------- panel ---------- */
  const panel = $("#panel"), scrim = $("#scrim");
  let current = null;

  function setActive(id) {
    document.querySelectorAll(".room").forEach(g => g.classList.toggle("active", g.dataset.room === id));
    document.querySelectorAll(".dir-list button").forEach(b => b.classList.toggle("active", b.dataset.room === id));
  }

  function open(id, push = true) {
    const r = byId[id]; if (!r) return;
    current = id;
    $("#panel-kanji").textContent = r.kanji;
    $("#panel-title").textContent = r.title;
    $("#panel-sub").textContent = r.subtitle || "";
    const body = $("#panel-body"); body.innerHTML = ""; body.append(renderBlocks(r)); body.scrollTop = 0;
    const i = order.indexOf(id);
    $("#pager-prev").textContent = "← " + byId[order[(i - 1 + order.length) % order.length]].title.toLowerCase();
    $("#pager-next").textContent = byId[order[(i + 1) % order.length]].title.toLowerCase() + " →";
    panel.classList.add("open"); panel.setAttribute("aria-hidden", "false"); scrim.classList.add("show");
    setActive(id);
    if (push) history.replaceState(null, "", "#" + id);
    $("#panel-close").focus({ preventScroll: true });
  }
  function close() {
    panel.classList.remove("open"); panel.setAttribute("aria-hidden", "true"); scrim.classList.remove("show");
    setActive(null); current = null;
    history.replaceState(null, "", location.pathname);
  }
  $("#panel-close").addEventListener("click", close);
  scrim.addEventListener("click", close);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && current) close();
    if (!current) return;
    if (e.key === "ArrowRight") open(order[(order.indexOf(current) + 1) % order.length]);
    if (e.key === "ArrowLeft") open(order[(order.indexOf(current) - 1 + order.length) % order.length]);
  });
  $("#pager-prev").addEventListener("click", () => open(order[(order.indexOf(current) - 1 + order.length) % order.length]));
  $("#pager-next").addEventListener("click", () => open(order[(order.indexOf(current) + 1) % order.length]));

  /* ---------- map hotspots ---------- */
  document.querySelectorAll("#map .room").forEach(g => {
    g.addEventListener("click", () => open(g.dataset.room));
    g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(g.dataset.room); } });
  });

  /* ---------- mobile stack (all sections, always rendered for search engines) ---------- */
  const stack = $("#stack");
  rooms.forEach(r => {
    const sec = el("section", { id: "s-" + r.id });
    sec.append(el("h2", {}, el("span", {}, r.kanji), r.title));
    const body = el("div", { class: "panel-body" }); body.append(renderBlocks(r));
    sec.append(body);
    stack.append(sec);
  });

  /* ---------- deep link ---------- */
  const h = location.hash.replace("#", "");
  if (h && byId[h]) open(h, false);
})();
