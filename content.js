/* =========================================================
   content.js  —  everything on the site lives in this file.
   Edit the text below and reload. No build step needed.
   Rooms are matched to the map by their `id`.
   ========================================================= */

window.SITE = {
  name: "Elvis Han",
  tagline: "Health Data Science @ UCSF | Prev @ FDA, JPMorganChase",
  location: "San Francisco",
  links: {
    email: "elvis.han@ucsf.edu",
    github: "https://github.com/ElvisHan2022",
    linkedin: "https://www.linkedin.com/in/elvis-han",
  },

  /* A short line shown in the top strip. Update whenever it changes. */
  now: "MS Health Data Science at UCSF · researching in the TECH Lab · reading for CS229",

  rooms: [
    /* ---------------------------------------------------- */
    {
      id: "about",
      kanji: "玄関",
      romaji: "Genkan",
      title: "About",
      subtitle: "Entrance. Take your shoes off.",
      blocks: [
        { type: "p", text: "I am a master's student in Health Data Science at UCSF, arriving by way of public health and economics at Johns Hopkins. My work sits at the seam between machine learning and clinical measurement: building models on health data, then asking whether the numbers we report actually describe the people behind them." },
        { type: "p", text: "The through-line in everything I have done, from Medicare readmission penalties to wearable stress detection, is a suspicion of aggregate metrics. A model can score well on average and still fail a subgroup badly, and most reporting conventions are designed not to notice. I want to build the models and the audits that notice." },
        { type: "p", text: "Longer term I want to work on healthcare AI at a research lab that takes safety seriously, and to keep the habit of writing down what I believe so I can watch it change." },
        { type: "h", text: "Training" },
        { type: "list", items: [
          "UCSF, M.S. Health Data Science (2026 to 2028)",
          "Johns Hopkins University, B.A. Public Health Studies and Economics (2026)",
          "Coursework I actually use: real analysis, linear algebra, optimization, econometrics, biostatistics, epidemiologic methods, clinical informatics",
        ]},
        { type: "h", text: "Outside the clinic" },
        { type: "p", text: "Manga and East Asian literature (Yoko Ogawa above all), Japanese music, history, A24 films, club volleyball, and a summit of Kilimanjaro that I still think about on hard days." },
      ],
    },

    /* ---------------------------------------------------- */
    {
      id: "research",
      kanji: "診察室",
      romaji: "Shinsatsushitsu",
      title: "Research",
      subtitle: "'In the lab' figuratively~",
      blocks: [
        { type: "entry",
          title: "Agentic evaluation pipeline for participant feedback",
          meta: "UCSF TECH Lab · Dr. Peter Washington · Aug 2026 to present",
          text: "An agentic pipeline that sorts spoken participant feedback from a digital health intervention into the study's predefined categories: one model flags responses that do not fit, a second relabels them. Every automated label is scored against expert human coders, and the agreement analysis ships as a reusable evaluation tool for other trials.",
          tags: ["LLM evaluation", "agentic workflows", "inter-rater agreement"] },
        { type: "entry",
          title: "Wearable stress detection in hospital nurses",
          meta: "Independent research · May 2026 to present",
          text: "Reproducing and extending a published machine learning pipeline for stress detection from wrist-worn sensor data, merging in WESAD to correct for rare stress episodes and comparing gradient-boosted trees against sequence models across patient subgroups. The point is to find where the headline accuracy hides a subgroup that the model quietly fails.",
          link: "https://github.com/ElvisHan2022/nurse-stress-analysis",
          tags: ["wearables", "physiological signals", "subgroup auditing"] },
        { type: "entry",
          title: "Sleep onset latency and GLP-1 initiation in adults with obesity",
          meta: "All of Us Research Program · Jul 2026 to present",
          text: "Estimating whether starting GLP-1 therapy changes how quickly adults with obesity fall back asleep after waking at night, with sleep quality treated as a secondary outcome. Poster abstract submitted to the Bay Area Biotech-Pharma Statistics Workshop.",
          tags: ["All of Us", "causal inference", "sleep"] },
        { type: "entry",
          title: "Expedited drug approval pathways",
          meta: "U.S. Food and Drug Administration · Office of the Commissioner · Jan to May 2025",
          text: "Built approval timelines for over 200 applications to measure how much faster drugs reached patients under each expedited pathway, and wrote a scraper that pulled fifteen years of Regulatory Impact Analyses out of the FDA archives so labeling decisions could be analyzed over time.",
          tags: ["regulatory science", "Python", "policy"] },
        { type: "entry",
          title: "Hospital responses to Medicare readmission penalties",
          meta: "Johns Hopkins · Dr. Seth Richards-Shubik · Sep 2024 to Dec 2025",
          text: "Modeled how hospitals respond to readmission penalties. A weighted readmission measure explained 72 percent of the variation against 48 percent for the formula in use, which suggests the penalty rewards patient selection more than quality improvement. This project is where my interest in metrics that conceal harm started.",
          tags: ["health economics", "econometrics", "value-based care"] },
        { type: "entry",
          title: "Oligodendrocyte density in a mouse model of Alzheimer's disease",
          meta: "Gladstone Institutes · Dr. Lennart Mucke · Summer 2024",
          text: "Measured brain cell density across regions to test whether two disease genes drove cell loss alone or together. The null result argued against the proposed mechanism, which was my first lesson in how much a careful negative finding is worth.",
          tags: ["neuroscience", "aging", "ANOVA"] },
      ],
    },

    /* ---------------------------------------------------- */
    {
      id: "publications",
      kanji: "書斎",
      romaji: "Shosai",
      title: "Publications and writing",
      subtitle: "Study. Papers, abstracts, and things in preparation.",
      blocks: [
        { type: "p", text: "Status is stated plainly. A submission is a submission until it is accepted." },
        { type: "pub",
          title: "A provenance-aware platform for rare disease drug repurposing",
          venue: "NewInML workshop at NeurIPS 2026",
          status: "Submitted, Aug 2026",
          text: "Ranks existing therapeutics against under-served rare disease targets by joining Open Targets, ClinicalTrials.gov, and Convoke, with every recommendation traced back to the rule that produced it." },
        { type: "pub",
          title: "Sleep onset latency after GLP-1 initiation in adults with obesity: evidence from All of Us",
          venue: "Bay Area Biotech-Pharma Statistics Workshop 2026 (poster)",
          status: "Abstract submitted, Sep 2026",
          text: "" },
        { type: "pub",
          title: "Reproducing wearable stress detection in hospital nurses: where subgroup performance diverges",
          venue: "Independent reproduction study",
          status: "In preparation",
          link: "https://github.com/ElvisHan2022/nurse-stress-analysis",
          text: "" },
        { type: "pub",
          title: "Weighted readmission measures and hospital response to Medicare penalties",
          venue: "Johns Hopkins, health economics working paper",
          status: "Working paper",
          text: "" },
        { type: "h", text: "Writing" },
        { type: "p", text: "Short posts are coming here: reading notes, small experiments, and arguments I am not yet sure of. The first will be on why average accuracy is the wrong number to lead with in clinical AI." },
      ],
    },

    /* ---------------------------------------------------- */
    {
      id: "builds",
      kanji: "工房",
      romaji: "Kōbō",
      title: "Builds",
      subtitle: "Workshop. Hackathons, tools, and things that shipped in a weekend.",
      blocks: [
        { type: "entry",
          title: "Rare disease drug repurposing platform",
          meta: "AWS Biopharma Hack Day · Aug 2026",
          text: "A ranking engine over Open Targets, ClinicalTrials.gov, and Convoke that matches existing therapeutics to rare disease targets, with a provenance layer so a clinician can see why a match was made. A judge suggested we write it up; it became the NeurIPS NewInML submission.",
          tags: ["AWS", "drug repurposing", "provenance"] },
        { type: "entry",
          title: "Rescue coordinator agent for Copper's Dream",
          meta: "AI Valley × Pet Zen Dogathon, San Francisco · 2026",
          text: "An inbox-triage agent for a dog rescue that reads incoming adoption and foster emails, sorts them by urgency, and drafts replies. Built with one teammate in a day; not continued, but a good reminder that the boring part of a workflow is usually the part worth automating.",
          tags: ["agents", "LLMs", "weekend build"] },
        { type: "entry",
          title: "FDA Regulatory Impact Analysis scraper",
          meta: "FDA Office of the Commissioner · 2025",
          text: "A Python scraper that pulls Regulatory Impact Analyses out of FDA archives, cutting manual lookup time by roughly half and making fifteen years of labeling decisions analyzable as a dataset.",
          tags: ["Python", "scraping", "public data"] },
        { type: "entry",
          title: "Audit routing rules for a global fees team",
          meta: "JPMorgan Chase · Summer 2025",
          text: "Automated routing rules in Alteryx over Snowflake that reduced audit time by 95 percent, plus SQL and JQL workflow analytics feeding a sprint-health dashboard.",
          tags: ["SQL", "Snowflake", "workflow design"] },
      ],
    },

    /* ---------------------------------------------------- */
    {
      id: "beliefs",
      kanji: "縁側",
      romaji: "Engawa",
      title: "Things I believe",
      subtitle: "Veranda. Sit for a while. Numbered so you can tell me which one is wrong.",
      intro: "This is my ivory tower. Replaced by LessWrong drafts soon.",
      beliefs: [
        "Guilt and gratitude are the main emotions we are guided by.",
        "The only person you need to please is your past, present, and future.",
        "We are biologically wired to survive, not thrive. Defy."
      ],
    },

    /* ---------------------------------------------------- */
    {
      id: "contact",
      kanji: "庭",
      romaji: "Niwa",
      title: "Garden",
      subtitle: "Get in touch, or just look at the pond.",
      blocks: [
        { type: "p", text: "I am happy to talk about health data, machine learning evaluation, wearables, AI safety in clinical settings, or manga. The fastest way to reach me is email." },
        { type: "links" },
        { type: "h", text: "Currently reading" },
        { type: "list", items: [
          "Beautiful Country",
          "Kagurabachi"
        ]},
      ],
    },
  ],
};
