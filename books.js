/* =========================================================
   books.js — everything on the bookshelf.
   One entry per title. Reads are listed oldest first; an open-ended
   read (no `to`) means "currently reading". Set `rereads` to the
   number of times read AFTER the first. Leave `rating` null and
   `review` "" until you have something to say; the shelf renders
   unrated books as plain spines and rated ones with a small mark.
   Dates are "YYYY-MM" (or "YYYY" when that is all you remember).
   ========================================================= */

window.BOOKS = {
  shelves: [
    /* ---------------- novels and nonfiction ---------------- */
    { id: "books", label: "Books", kanji: "本", items: [
      { title: "Sweet Bean Paste", author: "Durian Sukegawa", kind: "novel",
        reads: [{ from: "2024-11", to: "2025-05" }], rereads: 0, rating: null, review: "" },
      { title: "The Memory Police", author: "Yoko Ogawa", kind: "novel",
        reads: [{ from: "2024-08", to: "2024-12" }], rereads: 0, rating: null, review: "" },
      { title: "Mina's Matchbox", author: "Yoko Ogawa", kind: "novel",
        reads: [{ from: "2025-05", to: "2025-08" }], rereads: 0, rating: null, review: "" },
      { title: "The Vegetarian", author: "Han Kang", kind: "novel",
        reads: [{ from: "2025-04", to: "2025-05" }], rereads: 0, rating: null, review: "" },
      { title: "Butter", author: "Asako Yuzuki", kind: "novel",
        reads: [{ from: "2026-04", to: "2026-07" }], rereads: 0, rating: null, review: "" },
      { title: "The Kamogawa Food Detectives", author: "Hisashi Kashiwai", kind: "novel",
        reads: [{ from: "2025-10", to: "2025-10" }], rereads: 0, rating: null, review: "" },
      { title: "Beautiful Country", author: "Qian Julie Wang", kind: "memoir",
        reads: [{ from: "2026-09" }], rereads: 0, rating: null, review: "" },
      { title: "Atomic Habits", author: "James Clear", kind: "nonfiction",
        reads: [{ from: "2024-08", to: "2024-11" }], rereads: 0, rating: null, review: "" },
    ]},

    /* ---------------- short stories ---------------- */
    { id: "stories", label: "Short stories", kanji: "短編", items: [
      /* add entries here in the same shape as above */
    ]},

    /* ---------------- manga ---------------- */
    { id: "manga", label: "Manga", kanji: "漫画", items: [
      { title: "Blue Lock", reads: [{ from: "2024-01" }], rereads: 0, rating: null, review: "" },
      { title: "Dandadan", reads: [{ from: "2024-08" }], rereads: 0, rating: null, review: "" },
      { title: "Attack on Titan", reads: [{ from: "2023-08", to: "2024-02" }], rereads: 0, rating: null, review: "" },
      { title: "Kagurabachi", reads: [{ from: "2024-12" }], rereads: 0, rating: null, review: "" },
      { title: "One Punch Man", reads: [{ from: "2023-08", to: "2024-05" }], rereads: 0, rating: null, review: "" },
      { title: "The Climber", reads: [{ from: "2026-08" }], rereads: 0, rating: null, review: "" },
      { title: "Hell's Paradise", reads: [{ from: "2024-11", to: "2025-01" }], rereads: 1, rating: null, review: "" },
      { title: "Gachiakuta", reads: [{ from: "2026-08" }], rereads: 0, rating: null, review: "" },
      { title: "Haikyu!!", reads: [{ from: "2025-06", to: "2026-05" }], rereads: 0, rating: null, review: "" },
      { title: "Jujutsu Kaisen", reads: [{ from: "2023-10", to: "2024-09" }], rereads: 0, rating: null, review: "" },
      { title: "My Hero Academia", reads: [{ from: "2023-01", to: "2024-08" }], rereads: 0, rating: null, review: "" },
      { title: "Kaguya-sama: Love Is War", reads: [{ from: "2023-12", to: "2025-12" }], rereads: 0, rating: null, review: "" },
      { title: "Delicious in Dungeon", reads: [{ from: "2025-01", to: "2025-10" }], rereads: 0, rating: null, review: "" },
      { title: "Frieren: Beyond Journey's End", reads: [{ from: "2026-01" }], rereads: 0, rating: null, review: "" },
      { title: "The Summer Hikaru Died", reads: [{ from: "2025-07", to: "2025-08" }], rereads: 0, rating: null, review: "" },
      { title: "The Apothecary Diaries", reads: [{ from: "2025-05", to: "2025-11" }], rereads: 0, rating: null, review: "" },
      { title: "Chainsaw Man", reads: [{ from: "2023-01", to: "2025-03" }], rereads: 0, rating: null, review: "" },
      { title: "Tokyo Ghoul", reads: [{ from: "2024-01", to: "2024-12" }, { from: "2026-01", to: "2026-01" }], rereads: 1, rating: null, review: "" },
      { title: "Mushoku Tensei", reads: [{ from: "2024-01", to: "2024-05" }], rereads: 0, rating: null, review: "" },
    ]},

    /* ---------------- manhwa ---------------- */
    { id: "manhwa", label: "Manhwa", kanji: "만화", items: [
      { title: "The Boxer", reads: [{ from: "2018", to: "2020" }, { from: "2022", to: "2022" }, { from: "2024", to: "2024" }], rereads: 2, rating: null, review: "" },
      { title: "Pigpen", reads: [{ from: "2018", to: "2018" }], rereads: 0, rating: null, review: "" },
      { title: "True Beauty", reads: [{ from: "2017", to: "2019" }], rereads: 0, rating: null, review: "" },
      { title: "Sweet Home", reads: [{ from: "2019", to: "2019" }], rereads: 0, rating: null, review: "" },
      { title: "Omniscient Reader's Viewpoint", reads: [{ from: "2020" }], rereads: 0, rating: null, review: "" },
      { title: "Omniscient Reader's Viewpoint (light novel)", kind: "light novel", reads: [{ from: "2023-10", to: "2024-03" }], rereads: 0, rating: null, review: "" },
      { title: "Solo Leveling", reads: [{ from: "2021", to: "2023" }], rereads: 0, rating: null, review: "" },
      { title: "Bastard", reads: [{ from: "2019", to: "2019" }], rereads: 0, rating: null, review: "" },
      { title: "The Horizon", reads: [{ from: "2019", to: "2019" }], rereads: 0, rating: null, review: "" },
      { title: "Mosquito Wars", reads: [{ from: "2018", to: "2018" }], rereads: 0, rating: null, review: "" },
    ]},
  ],
};

/* Movies go on the projector, not the shelf. Same shape, `watched` instead of `reads`. */
window.MOVIES = {
  items: [
    /* { title: "", director: "", year: 0, watched: ["2026-01"], rating: null, review: "" }, */
  ],
};
