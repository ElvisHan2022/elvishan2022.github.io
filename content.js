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
    email2: "elvish@stanford.edu",
    github: "https://github.com/ElvisHan2022",
    linkedin: "https://www.linkedin.com/in/elvis-han",
  },

  /* A short line shown in the top strip. Update whenever it changes. */
  now: "MS Health Data Science at UCSF · two workshop papers accepted at NeurIPS 2026 · reading for CS229",

  rooms: [
    /* ---------------------------------------------------- */
    {
      id: "about",
      kanji: "玄関",
      romaji: "Genkan",
      title: "About",
      subtitle: "Entrance. Take your shoes off.",
      blocks: [
        { type: "p", text: "Hello there. My name is Elvis Han. I am a master's student in Health Data Science at UCSF (2026 to 2028), where I work in the TECH Lab with Peter Washington on the evaluation of large language models in digital health research. I am also an exchange student in Biomedical Data Science at Stanford University. I received my B.A. in Public Health Studies and Economics, with a minor in Applied Mathematics and Statistics, from Johns Hopkins University (2026), where I worked with Seth Richards-Shubik on Medicare readmission policy." },
        { type: "p", text: "Previously, I worked at the U.S. Food and Drug Administration (Office of the Commissioner), JPMorgan Chase, CTIC Capital, and the Gladstone Institutes." },
        { type: "p", text: "I am currently studying whether large language models can serve as substitutes for human study participants, and I am beginning a first-authored capstone (fall 2026 to June 2028) that I am open to conducting with an industry or academic research partner." },
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
          title: "Language models as substitutes for human study participants",
          meta: "UCSF · AI alignment research · 2026 to present",
          text: "Large language models are increasingly proposed as substitutes for human survey respondents. We prompt models to role-play study participants, administer the survey instrument completed by human respondents, and compare model and human response distributions to identify where model responses diverge and which participant groups models fail to represent.",
          tags: ["LLM evaluation", "alignment", "synthetic participants"] },
        { type: "entry",
          title: "Evaluating an agentic pipeline for coding participant feedback",
          meta: "UCSF TECH Lab · Peter Washington · Aug 2026 to present",
          text: "We develop a two-stage language model pipeline that classifies spoken participant feedback from a digital health intervention into predefined study categories: one model flags responses outside existing categories and a second model assigns revised labels. Pipeline labels are evaluated against trained human coders using inter-rater agreement, and the evaluation is released as a reusable tool for other trials.",
          tags: ["LLM evaluation", "agentic workflows", "inter-rater agreement"] },
        { type: "entry",
          title: "Self-supervised learning for nurse stress detection from wearables",
          meta: "With Eric Guan · May to Aug 2026 · NewInML workshop, NeurIPS 2026",
          text: "Field deployments of wearable stress detection yield sparse labels that mark stress episodes and never their absence. Using a public dataset of 15 hospital nurses (1,251.7 hours, 9.1% within self-reported episodes), we construct an activity-matched comparison group from unlabeled time and validate it with falsification probes (movement-only and time-of-day models, AUC 0.51). A gradient-boosted baseline reaches AUC 0.77 against a within-participant permutation null of 0.50. Electrodermal activity rises at onset in 64.3% of episodes (p = 0.0009); heart rate does not (p = 0.80). Masked-reconstruction pretraining on 1,238 unlabeled hours matches random initialization at every label budget, and at one false alarm per hour the baseline recovers 10.6% of episodes.",
          link: "https://github.com/ElvisHan2022/nurse-stress-analysis",
          tags: ["wearables", "self-supervised learning", "evaluation"] },
        { type: "entry",
          title: "GLP-1 receptor agonist initiation and sleep onset latency",
          meta: "All of Us Research Program · Jul 2026 to present",
          text: "Using data from the NIH All of Us Research Program, we estimate the effect of GLP-1 receptor agonist initiation on sleep onset latency in adults with obesity. An abstract has been submitted to the Bay Area Biotech-Pharma Statistics Workshop.",
          tags: ["All of Us", "causal inference", "sleep"] },
        { type: "entry",
          title: "Time to approval under FDA expedited pathways",
          meta: "U.S. Food and Drug Administration · Office of the Commissioner · Jan to May 2025",
          text: "I assembled IND-to-NDA development timelines for more than 200 applications to estimate the time saved under each FDA expedited pathway, and built a scraper that extracted fifteen years of Regulatory Impact Analyses from FDA archives into an analyzable dataset.",
          tags: ["regulatory science", "Python", "policy"] },
        { type: "entry",
          title: "Severity-weighted excess readmissions under the HRRP",
          meta: "Johns Hopkins University · Seth Richards-Shubik · Sep 2024 to Dec 2025",
          text: "The Hospital Readmissions Reduction Program weights all excess readmissions equally. Using FY2019 HRRP impact file data, I construct a DRG-weighted excess readmission measure and compare penalty gradients under the standard and weighted specifications. The weighted measure explains more of the variation in penalties (R² = 0.72) than the standard measure (R² = 0.48).",
          tags: ["health economics", "econometrics", "value-based care"] },
        { type: "entry",
          title: "Oligodendrocyte density in a mouse model of Alzheimer's disease",
          meta: "Gladstone Institutes · Lennart Mucke · Summer 2024",
          text: "I measured oligodendrocyte density across brain regions in a mouse model of Alzheimer's disease to test for independent and interactive effects of two risk genes using two-way ANOVA. No significant effects were observed.",
          tags: ["neuroscience", "aging", "ANOVA"] },
      ],
    },

    /* ---------------------------------------------------- */
    {
      id: "publications",
      kanji: "書斎",
      romaji: "Shosai",
      title: "Publications",
      subtitle: "Study. Papers and abstracts.",
      blocks: [
        { type: "pub-legend" },
        { type: "pub",
          title: "Pretraining and self-supervised learning for detecting nurse stress from wearables",
          venue: "NewInML workshop at NeurIPS 2026 · with Eric Guan",
          status: "Accepted, NeurIPS 2026 workshop",
          link: "https://github.com/ElvisHan2022/nurse-stress-analysis",
          text: "Constructs and validates an activity-matched comparison group for positive-only wearable stress labels and shows that masked-reconstruction pretraining over 1,238 unlabeled hours does not improve on a supervised baseline (AUC 0.77)." },
        { type: "pub",
          title: "A provenance-aware platform for rare disease drug repurposing",
          venue: "NewInML workshop at NeurIPS 2026",
          status: "Accepted, NeurIPS 2026 workshop",
          text: "Ranks existing therapeutics against rare disease targets by integrating Open Targets, ClinicalTrials.gov, and Convoke, and traces each recommendation to the rule that produced it." },
        { type: "pub",
          title: "Sleep onset latency after GLP-1 initiation in adults with obesity: evidence from All of Us",
          venue: "Bay Area Biotech-Pharma Statistics Workshop 2026 (poster)",
          status: "Abstract submitted, Sep 2026",
          text: "Estimates the effect of GLP-1 receptor agonist initiation on sleep onset latency in adults with obesity." },
        { type: "pub",
          title: "Severity-weighted readmission measures and hospital response to Medicare penalties",
          venue: "Johns Hopkins University, health economics working paper",
          status: "Working paper",
          text: "A DRG-weighted excess readmission measure explains more of the variation in HRRP penalties (R² = 0.72) than the standard measure (R² = 0.48)." },
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
          text: "A ranking engine that matches existing therapeutics to rare disease targets using Open Targets, ClinicalTrials.gov, and Convoke, with a provenance layer that records the rule behind each match.",
          tags: ["AWS", "drug repurposing", "provenance"] },
        { type: "entry",
          title: "Rescue coordinator agent for Copper's Dream",
          meta: "AI Valley × Pet Zen Dogathon, San Francisco · Aug 2026",
          text: "An email agent for a dog rescue that triages adoption and foster inquiries by urgency and drafts replies. Built with one teammate in one day.",
          tags: ["agents", "LLMs", "hackathon"] },
        { type: "entry",
          title: "FDA Regulatory Impact Analysis scraper",
          meta: "FDA Office of the Commissioner · 2025",
          text: "A Python scraper that extracts Regulatory Impact Analyses from FDA archives into a fifteen-year dataset, reducing manual lookup time by roughly half.",
          tags: ["Python", "scraping", "public data"] },
        { type: "entry",
          title: "Audit automation and team metrics",
          meta: "JPMorgan Chase · data governance · Summer 2025",
          text: "Routing rules in Alteryx over Snowflake that automate a manual account-access audit, reducing audit time by 95 percent, and SQL and JQL pipelines over a year of Jira task data feeding a sprint-health dashboard.",
          tags: ["SQL", "Snowflake", "workflow design"] },
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
        { type: "p", text: "Email is the best way to reach me." },
        { type: "links" },
      ],
    },
  ],
};
