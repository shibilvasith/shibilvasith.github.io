/**
 * Portfolio Data Store — Mohammed Shibil Vasith MK
 *
 * HOW TO ADD FUTURE LINUX / CLOUD COMPUTING PROJECTS:
 * Append a new object to `PORTFOLIO_DATA.projects` using this template:
 * {
 *   id: "unique-slug",
 *   num: "06",
 *   category: "Cloud & Linux", // Options: "Automation & AI" | "ML & NLP" | "Hardware" | "Cloud & Linux"
 *   featured: false,
 *   kicker: "CLOUD INFRASTRUCTURE / LINUX",
 *   title: "Project Title",
 *   shortDesc: "Concise summary shown on the card.",
 *   highlights: [
 *     "Key implementation bullet 1.",
 *     "Key implementation bullet 2."
 *   ],
 *   tags: ["LINUX", "NETWORKING", "CLOUD"],
 *   icon: "server", // "workflow" | "brain" | "activity" | "radar" | "server" | "cloud" | "terminal"
 *   screenshot: "./assets/images/your-screenshot.png", // optional path
 *   githubUrl: "https://github.com/shibilvasith4816-droid/your-repo" // optional repo URL
 * }
 */

window.PORTFOLIO_DATA = {
  profile: {
    name: "Mohammed Shibil Vasith MK",
    shortBrand: "SV",
    headline: "Cloud Computing & IT Infrastructure",
    email: "shibilvasith4816@gmail.com",
    whatsappNumber: "917356214147",
    displayPhone: "+91 73562 14147",
    linkedin: "https://www.linkedin.com/in/shibilvasith/",
    github: "https://github.com/shibilvasith4816-droid",
    resumePath: "./assets/Mohammed-Shibil-Vasith-MK-Resume.pdf",
  },

  projects: [
    {
      id: "webtestai",
      num: "01",
      category: "Automation & AI",
      featured: true,
      kicker: "01 / FEATURED PROJECT · WEBSITE TESTING PLATFORM",
      title: "WebTestAI",
      visualLines: ["WEB", "TEST AI"],
      dashboardRows: [
        { label: "INPUT", value: "TARGET URL" },
        { label: "WORKFLOW", value: "CRAWL + RUN" },
        { label: "REPORT", value: "PASS / FAIL" },
      ],
      shortDesc:
        "Built a website testing platform where users submit a URL and upload test cases. The system crawls the website, runs the uploaded test cases, and reports pass/fail results for each run.",
      highlights: [
        "Built a platform where users submit a URL; the system crawls the website and runs uploaded test cases.",
        "Reports pass/fail results for each execution run.",
        "Designed the end-to-end testing workflow and user experience.",
        "Developed with AI coding assistants.",
      ],
      tags: ["URL CRAWLING", "TEST EXECUTION", "PASS / FAIL REPORTING", "UX WORKFLOW", "AI-ASSISTED DEV"],
      icon: "terminal",
      screenshot: "",
      githubUrl: "",
    },
    {
      id: "ai-automation-rag-chatbot",
      num: "02",
      category: "Automation & AI",
      featured: false,
      kicker: "02 / INTERNSHIP PROJECT · PETRO INFOTECH",
      title: "AI Automation / RAG Chatbot",
      shortDesc:
        "Designed workflow automations with n8n and prototyped a Retrieval-Augmented Generation (RAG) chatbot during the AI Automation internship at Petro Infotech.",
      highlights: [
        "Automated multi-step operational workflows using n8n.",
        "Prototyped a Retrieval-Augmented Generation (RAG) chatbot.",
        "Iteratively tested and validated outputs alongside the software team.",
      ],
      tags: ["N8N", "RAG CHATBOT", "WORKFLOW AUTOMATION", "PETRO INFOTECH"],
      icon: "workflow",
      screenshot: "",
      githubUrl: "",
    },
    {
      id: "sentiment-analysis",
      num: "03",
      category: "ML & NLP",
      featured: false,
      kicker: "03 / MACHINE LEARNING · NLP",
      title: "Sentiment Analysis System",
      shortDesc:
        "Trained a three-class sentiment classifier in Python using text preprocessing and supervised machine learning techniques.",
      highlights: [
        "Implemented text preprocessing pipeline for natural language data.",
        "Trained and evaluated a three-class supervised sentiment classification model in Python.",
      ],
      tags: ["PYTHON", "NLP", "TEXT PREPROCESSING", "3-CLASS CLASSIFICATION"],
      icon: "brain",
      screenshot: "",
      githubUrl: "",
    },
    {
      id: "disease-prediction",
      num: "04",
      category: "ML & NLP",
      featured: false,
      kicker: "04 / MACHINE LEARNING · HEALTHCARE",
      title: "Disease Prediction System",
      shortDesc:
        "Developed a supervised machine learning model in Python that predicts potential illness based on input symptoms.",
      highlights: [
        "Built a symptom-based supervised machine learning prediction workflow.",
        "Implemented model training and prediction pipeline using Python.",
      ],
      tags: ["PYTHON", "MACHINE LEARNING", "SUPERVISED PREDICTION"],
      icon: "activity",
      screenshot: "",
      githubUrl: "",
    },
    {
      id: "smart-blind-stick",
      num: "05",
      category: "Hardware",
      featured: false,
      kicker: "05 / EMBEDDED SYSTEMS · ARDUINO",
      title: "Smart Blind Stick",
      shortDesc:
        "Built an Arduino Uno obstacle detector using ultrasonic sensors that detects nearby obstacles and triggers an alert.",
      highlights: [
        "Engineered an Arduino Uno prototype integrated with ultrasonic distance sensors.",
        "Programmed real-time obstacle detection logic in C/C++ to trigger user alerts.",
      ],
      tags: ["ARDUINO UNO", "ULTRASONIC SENSORS", "C / C++", "OBSTACLE DETECTION"],
      icon: "radar",
      screenshot: "",
      githubUrl: "",
    },
  ],

  certifications: [
    {
      num: "01",
      title: "Artificial Intelligence & Machine Learning Graduate",
      issuer: "IBM",
      date: "June 2026",
      credentialUrl: "",
      imageUrl: "",
    },
    {
      num: "02",
      title: "Scikit-Learn for Machine Learning Classification Problems",
      issuer: "Coursera",
      date: "Verified Coursework",
      credentialUrl: "",
      imageUrl: "",
    },
    {
      num: "03",
      title: "Deep Learning",
      issuer: "Illinois Institute of Technology (Coursera)",
      date: "Verified Coursework",
      credentialUrl: "",
      imageUrl: "",
    },
    {
      num: "04",
      title: "Probability & Statistics for Machine Learning & Data Science",
      issuer: "DeepLearning.AI",
      date: "Verified Coursework",
      credentialUrl: "",
      imageUrl: "",
    },
    {
      num: "05",
      title: "Pointers, Arrays, and Recursion",
      issuer: "Duke University (Coursera)",
      date: "Verified Coursework",
      credentialUrl: "",
      imageUrl: "",
    },
  ],
};
