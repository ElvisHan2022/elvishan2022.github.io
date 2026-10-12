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
        { type: "h", text: "In short" },
        { type: "p", text: "I am a master's student in Health Data Science at UCSF. I study how we check whether a health model, or a health policy metric, can actually be trusted. A model can post a strong average score and still fail the patients who need it most, and a policy metric can look fair while penalizing the hospitals that treat the sickest people. I build the tests that catch those gaps." },
        { type: "h", text: "Currently" },
        { type: "p", text: "My UCSF capstone is a first-authored research project running from fall 2026 through June 2028. I am looking for an industry or research partner whose published work it can build on. I am also looking toward PhD programs in health AI evaluation, causal inference, and AI safety." },
        { type: "h", text: "How I got here" },
        { type: "p", text: "I studied public health and economics at Johns Hopkins, with a minor in applied math. My first research was a wet lab study of Alzheimer's disease that came back null, which taught me to defend a result nobody wanted. From there I moved into health economics, built a fairer way to measure hospital readmissions, and worked at the FDA and JPMorgan Chase. Management consulting did not select me, and I am grateful, because I now research machine learning and clinical measurement full time." },
        { type: "p", text: "Today my work sits in three places: wearable health data, large language models used in clinical research, and drug discovery tools. What ties them together is evaluation. I care most about AI safety and accountability in healthcare and biosecurity, and I think auditing is a boring, necessary art." },
        { type: "h", text: "Training" },
        { type: "list", items: [
          "UCSF, M.S. Health Data Science (2026 to 2028)",
          "Stanford University, exchange student in Biomedical Data Science (2026 to 2028)",
          "Johns Hopkins University, B.A. Public Health Studies and Economics (2026)",
          "Johns Hopkins University, minor in Applied Mathematics and Statistics",
        ]},
        { type: "h", text: "Outside work" },
        { type: "p", text: "Manga and East Asian literature, Japanese music, history, A24 films, club volleyball, and hiking. I once climbed Kilimanjaro." },
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
          title: "Can a language model stand in for a study participant?",
          meta: "UCSF · AI alignment research · 2026 to present",
          text: "Researchers are starting to use large language models as stand-ins for human survey respondents. We test whether that is safe: we ask a model to role-play as a study participant, give it the same survey questions people answered, and compare its responses to the real human responses. Where the model's answers drift from people's, we learn whose views it fails to represent, which matters before anyone uses these models to speak for patients.",
          tags: ["LLM evaluation", "alignment", "synthetic participants"] },
        { type: "entry",
          title: "Checking an AI pipeline against human experts",
          meta: "UCSF TECH Lab · Dr. Peter Washington · Aug 2026 to present",
          text: "Participants in a digital health study recorded spoken feedback, and researchers need that feedback sorted into the study's categories. I am building a two-step AI pipeline for the job: one model flags responses that do not fit any category, and a second model relabels them. Every label the pipeline produces is scored against trained human coders, and the agreement analysis is being packaged as a reusable tool other trials can use to check their own AI labeling.",
          tags: ["LLM evaluation", "agentic workflows", "inter-rater agreement"] },
        { type: "entry",
          title: "Detecting nurse stress from wearables",
          meta: "With Eric Guan · May to Aug 2026 · accepted at NewInML, NeurIPS 2026",
          text: "Fifteen hospital nurses wore wristbands for a week during COVID, and only 9 percent of the 1,252 recorded hours carried a stress report. Nurses only reported when they felt stressed, so the data had no record of calm. I built that missing comparison group by sampling quiet stretches matched on movement, then checked it with tests that should fail (movement alone and time of day alone both scored at chance). The model reached an AUC of 0.77 against a shuffled-label baseline of 0.50. Sweat response rose at 64 percent of reported stress onsets, while heart rate was a coin flip. Pretraining on 1,238 unlabeled hours did not help at all, and at one false alarm per hour the model caught only 11 percent of episodes. The honest takeaway is that better data collection, which records calm periods too, will do more here than bigger models.",
          link: "https://github.com/ElvisHan2022/nurse-stress-analysis",
          tags: ["wearables", "self-supervised learning", "evaluation"] },
        { type: "entry",
          title: "Does starting a GLP-1 drug change sleep?",
          meta: "All of Us Research Program · Jul 2026 to present",
          text: "GLP-1 drugs such as semaglutide are now widely used for obesity, and their effect on sleep is not well understood. Using data from the NIH All of Us program, I am estimating whether starting GLP-1 therapy changes how long adults with obesity take to fall asleep. The abstract has been submitted as a poster to the Bay Area Biotech-Pharma Statistics Workshop.",
          tags: ["All of Us", "causal inference", "sleep"] },
        { type: "entry",
          title: "How fast do expedited drug approvals reach patients?",
          meta: "U.S. Food and Drug Administration · Office of the Commissioner · Jan to May 2025",
          text: "The FDA has several fast-track programs for promising drugs. I built development timelines, from first human testing to approval, for more than 200 applications to estimate how much time each program actually saves. I also wrote a scraper that pulled fifteen years of Regulatory Impact Analyses out of FDA archives, turning scattered documents into a dataset that can be studied over time.",
          tags: ["regulatory science", "Python", "policy"] },
        { type: "entry",
          title: "A fairer way to measure hospital readmissions",
          meta: "Johns Hopkins · Dr. Seth Richards-Shubik · Sep 2024 to Dec 2025",
          text: "Medicare penalizes hospitals whose patients come back too often after discharge, but its formula counts every readmission the same, whether it follows a minor procedure or major heart surgery. That makes a hospital treating sicker patients look the same as one gaming the measure. Using Medicare's FY2019 penalty data, I built a severity-weighted measure that accounts for how costly each kind of readmission is. It explained 72 percent of the variation in penalties, against 48 percent for the standard measure. This is where my interest in metrics that hide harm started.",
          tags: ["health economics", "econometrics", "value-based care"] },
        { type: "entry",
          title: "Brain cell loss in a mouse model of Alzheimer's disease",
          meta: "Gladstone Institutes · Dr. Lennart Mucke · Summer 2024",
          text: "I measured the density of oligodendrocytes, the cells that insulate nerve fibers, across brain regions to test whether two Alzheimer's risk genes drove cell loss on their own or together. The result was null, and defending a null result taught me more about scientific standards than a positive one would have.",
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
        { type: "pub-legend" },
        { type: "pub",
          title: "Pretraining and self-supervised learning for detecting nurse stress from wearables",
          venue: "NewInML workshop at NeurIPS 2026 · with Eric Guan",
          status: "Accepted, NeurIPS 2026 workshop",
          link: "https://github.com/ElvisHan2022/nurse-stress-analysis",
          text: "Shows that when wearable data only records stress and never calm, pretraining on more unlabeled data does not help. Builds and validates a comparison group, and reports where the model fails, including two of ten nurses it cannot detect at all." },
        { type: "pub",
          title: "A provenance-aware platform for rare disease drug repurposing",
          venue: "NewInML workshop at NeurIPS 2026",
          status: "Accepted, NeurIPS 2026 workshop",
          text: "Ranks existing drugs against under-served rare disease targets by joining Open Targets, ClinicalTrials.gov, and Convoke, and traces every recommendation back to the rule that produced it so a clinician can see why a match was made." },
        { type: "pub",
          title: "Sleep onset latency after GLP-1 initiation in adults with obesity: evidence from All of Us",
          venue: "Bay Area Biotech-Pharma Statistics Workshop 2026 (poster)",
          status: "Abstract submitted, Sep 2026",
          text: "Estimates whether starting a GLP-1 drug changes how long adults with obesity take to fall asleep." },
        { type: "pub",
          title: "Severity-weighted readmission measures and hospital response to Medicare penalties",
          venue: "Johns Hopkins, health economics working paper",
          status: "Working paper",
          text: "A severity-weighted readmission measure explains 72 percent of the variation in Medicare penalties, against 48 percent for the standard measure." },
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
          text: "Most rare diseases have no approved treatment, but some existing drugs may already hit the right biological targets. We built a ranking engine over Open Targets, ClinicalTrials.gov, and Convoke that matches existing drugs to rare disease targets, with a provenance layer that shows a clinician why each match was made. A judge suggested we write it up, and the paper was accepted to the NewInML workshop at NeurIPS 2026.",
          tags: ["AWS", "drug repurposing", "provenance"] },
        { type: "entry",
          title: "Rescue coordinator agent for Copper's Dream",
          meta: "AI Valley × Pet Zen Dogathon, San Francisco · Aug 2026",
          text: "An AI agent for a dog rescue that reads incoming adoption and foster emails, sorts them by urgency, and drafts replies. Built with one teammate in a day. We did not continue it, but it was a good reminder that the boring part of a workflow is usually the part worth automating.",
          tags: ["agents", "LLMs", "weekend build"] },
        { type: "entry",
          title: "FDA Regulatory Impact Analysis scraper",
          meta: "FDA Office of the Commissioner · 2025",
          text: "A Python scraper that pulls Regulatory Impact Analyses, the documents that estimate the costs and benefits of new FDA rules, out of the agency's archives. It cut manual lookup time by roughly half and made fifteen years of decisions analyzable as one dataset.",
          tags: ["Python", "scraping", "public data"] },
        { type: "entry",
          title: "Audit automation and team metrics",
          meta: "JPMorgan Chase · data governance · Summer 2025",
          text: "Automated a manual account-access audit with routing rules in Alteryx over Snowflake, which cut audit time by 95 percent and went into production. I also built a year of weekly task data from Jira with SQL and JQL to feed a sprint-health dashboard, so the team could see its completion rate for the first time.",
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
        { type: "p", text: "I am happy to talk about PhD positions, research collaborations, health data, machine learning evaluation, wearables, AI safety in clinical settings, or manga. The fastest way to reach me is email." },
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
