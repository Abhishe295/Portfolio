// The RAG knowledge base for "ask-me.app". Each entry is one retrievable
// chunk: a `section` label (shown to the user as a "Source"), and `text`
// the embedding model actually indexes. Keep chunks focused on one topic
// each - that's what makes retrieval precise instead of muddy.
//
// This mirrors the real content already living in the portfolio's
// IdentityWindow, TimelineWindow ("Focus"), ContactWindow and projects.ts,
// so the assistant never says anything that contradicts the rest of the
// site. If you update those, update this file too.

const PROFILE = [
  {
    id: 'about',
    section: 'About',
    text:
      "Abhishek Kumar Pundir is a Computer Science student (B.Tech CSE, AI & Machine Learning) " +
      'at Lovely Professional University, expected to graduate in 2027. He is focused on AI and ' +
      'Full-Stack Development. He enjoys building software that solves real-world problems, from ' +
      'healthcare AI systems to production-ready web platforms. He is currently working at an ' +
      'LPU-incubated startup called Spot-n-Play while continuously improving his software engineering skills.',
  },
  {
    id: 'whoami',
    section: 'About',
    text:
      'Quick profile: Name - Abhishek. Role - Software Engineer. Focus - AI + Full Stack Development. ' +
      'Location - India. He is currently building production software at Spot-n-Play.',
  },
  {
    id: 'why-i-build',
    section: 'About',
    text:
      "Abhishek enjoys building software that solves real problems, whether it's an AI model, a web " +
      'platform, or an internal business tool. Every project teaches him something new about writing ' +
      'reliable, scalable software.',
  },
  {
    id: 'beyond-coding',
    section: 'About',
    text:
      'Beyond writing code, Abhishek has worked directly with freelance clients, collaborated inside a ' +
      'real startup team at Spot-n-Play, is comfortable translating vague requirements into working ' +
      'software, and believes good software starts with understanding users first.',
  },
  {
    id: 'current-focus',
    section: 'About',
    text:
      "Abhishek's current engineering focus: building production software at Spot-n-Play, strengthening " +
      'backend architecture and security, learning advanced Machine Learning, preparing for Software ' +
      'Engineering and AI roles, and continuously solving DSA problems. He is currently learning System ' +
      'Design, Docker, CI/CD, AWS, LLMs, and Distributed Systems, and is currently reading "Designing ' +
      'Data-Intensive Applications".',
  },
  {
    id: 'principles',
    section: 'About',
    text:
      "Abhishek's engineering principles: build before you optimize, measure before you assume, simple " +
      'solutions beat clever ones, users matter more than frameworks, and every project should solve a ' +
      'real problem.',
  },
  {
    id: 'experience-spotnplay',
    section: 'Experience',
    text:
      'Abhishek works as a Software Developer Intern at Spot-n-Play, an LPU-incubated startup. This is ' +
      'his current role. His work there includes reducing unnecessary frontend re-renders and optimizing ' +
      'API requests, implementing production-ready features for a sports-tech platform connecting players ' +
      'and communities, strengthening authentication workflows and application security, and collaborating ' +
      'with developers in a live startup environment.',
  },
  {
    id: 'experience-freelance',
    section: 'Experience',
    text:
      'Abhishek worked as a Freelance Full Stack Developer, building a Factory Tool Management System for ' +
      'a client. He developed a custom CRUD-based management system, built an inventory system for ' +
      'tracking defective factory tools, implemented secure role-based data management, and delivered ' +
      "software aligned to the client's exact workflow requirements.",
  },
  {
    id: 'education',
    section: 'Education',
    text:
      'Abhishek is pursuing a Bachelor of Technology in Computer Science & Engineering with a ' +
      'specialization in AI & Machine Learning at Lovely Professional University. Expected graduation: 2027.',
  },
  {
    id: 'hackathons',
    section: 'Hackathons',
    text:
      'Abhishek has participated in hackathons, including the IIT Ropar Deep Learning Hackathon. He has ' +
      'not won yet - still building toward that. In total he has participated in 3 hackathons.',
  },
  {
    id: 'stats',
    section: 'Stats',
    text:
      'Engineering numbers: 25+ projects built, 5 AI/ML projects, 8 full-stack applications, 300+ DSA ' +
      'problems solved, 3 hackathons participated in, 1 startup experience (Spot-n-Play), and 1 freelance ' +
      'client project delivered. He is currently building production software at Spot-n-Play.',
  },
  {
    id: 'favorites',
    section: 'Skills',
    text:
      "Abhishek's favorite stack: favorite language is Python, favorite frontend framework is React, " +
      'favorite backend runtime is Node.js, favorite AI framework is PyTorch, favorite database is ' +
      'MongoDB, and favorite code editor is VS Code.',
  },
  {
    id: 'skills-core',
    section: 'Skills',
    text:
      "Abhishek's core skills: Backend Development, Frontend Development, Machine Learning, REST API " +
      'design, Database Design, Authentication systems, and general Problem Solving / DSA.',
  },
  {
    id: 'tech-languages',
    section: 'Skills',
    text: 'Languages Abhishek codes in: Java, Python, JavaScript, SQL.',
  },
  {
    id: 'tech-frontend',
    section: 'Skills',
    text: "Abhishek's frontend stack: React, Tailwind CSS, Vite.",
  },
  {
    id: 'tech-backend',
    section: 'Skills',
    text: "Abhishek's backend stack: Node.js, Express, MongoDB.",
  },
  {
    id: 'tech-ai',
    section: 'Skills',
    text: "Abhishek's AI/ML stack: PyTorch, TensorFlow, OpenCV, Scikit-Learn.",
  },
  {
    id: 'tech-tools',
    section: 'Skills',
    text: "Dev tools Abhishek uses: Git, Docker, Postman, Cloudinary, Render.",
  },
  {
    id: 'contact',
    section: 'Contact',
    text:
      'Contact Abhishek by email at abhishekgigaiw@gmail.com, on GitHub at github.com/Abhishe295, or on ' +
      'LinkedIn at linkedin.com/in/abhishek-kumar-pundir-ba4110326. Phone is available on request. He is ' +
      'open to Software Engineering Internships, AI/ML roles, Backend Development roles, and Freelance ' +
      'opportunities.',
  },
];

// One retrievable chunk per project, built from the same facts as the
// portfolio's Projects window - name, what it does, stack, and standout
// features, so specific "what did you use for X" questions retrieve well.
const PROJECTS = [
  {
    name: 'ProjectU',
    featured: true,
    tags: ['MERN', 'Socket.io', 'WebRTC', 'End-to-End Encryption', 'Real-time Sync'],
    text:
      "ProjectU is a private space for couples and long-distance friends to sync music and share how " +
      "they're feeling, in real time. You sign in, get a unique pairing code, and share it with the one " +
      'person you want to connect with. Once paired, you can listen to music in perfect sync no matter ' +
      "the distance, and share your mood directly instead of texting 'you good?' back and forth. Pair " +
      'sessions are end-to-end encrypted, while the music catalog itself is a shared/global layer both ' +
      'accounts read from, so everyone\'s picks add to a pool anyone can discover. The hardest part was ' +
      'keeping playback perfectly synchronized between two listeners on different networks and latencies. ' +
      'Live at https://project-u-rho.vercel.app/.',
  },
  {
    name: 'MindWell',
    featured: true,
    signature: true,
    tags: ['MERN', 'Python', 'AI', 'OpenCV', 'Librosa', 'Socket.io'],
    text:
      "MindWell is Abhishek's signature project - the one he'd point to first. It's a comprehensive " +
      'full-stack mental wellness platform for tracking emotional states, keeping digital journals, and ' +
      'talking to a conversational AI therapist companion. It uses OpenCV and CNN models for facial ' +
      'expression analysis, Librosa for vocal tone emotion detection, real-time dual websocket channels ' +
      'for instant chat sync via Socket.io, and visual emotion graphs plotting weekly/monthly mood trends. ' +
      'The architecture is React on the frontend, Node/Express for auth and operations, and FastAPI for ' +
      'Python-based voice/facial sentiment analytics. The main challenge was synchronizing real-time ' +
      'video/voice streams with ML predictions without dropping frames or bottlenecking Express handlers.',
  },
  {
    name: 'Musify',
    featured: true,
    tags: ['React', 'Express', 'DaisyUI', 'ML', 'Gemini API'],
    text:
      'Musify is a smart music streaming engine that recommends songs based on a mood query, using the ' +
      'Gemini API for AI semantic mood parsing. It includes a dynamic HTML5 audio visualizer matching the ' +
      "player's frequencies and custom playlist saving with cached user preferences. Built with React and " +
      'DaisyUI on the frontend, Express on the backend. The tricky part was writing structured prompt ' +
      'constraints so Gemini would not suggest unplayable or broken tracks.',
  },
  {
    name: 'HelpX',
    featured: true,
    tags: ['React', 'Express', 'Socket.io', 'MongoDB'],
    text:
      'HelpX is a real-time emergency coordination dashboard that links citizens with regional community ' +
      'volunteers, dynamically mapping coordinate pins and pairing distressed users with active volunteers ' +
      'within a radius. Built on the MERN stack with Socket.io rooms; coordinates are stored in MongoDB as ' +
      'GeoJSON for 2D-sphere spatial querying to find the nearest helper. It also has real-time chat rooms ' +
      'that spawn instantly on request approval and an active SOS dashboard tracking responder transit ' +
      'status. The hard part was updating client positions and broadcasting matches efficiently under load.',
  },
  {
    name: 'Music-Player',
    tags: ['JavaScript', 'HTML5', 'CSS', 'Web Audio'],
    text:
      'A responsive vanilla-JavaScript music dashboard with shuffle playlists (a real Fisher-Yates shuffle ' +
      'for bias-free queues), responsive seekable progress meters, and a background gradient that adapts ' +
      'to the album cover palette.',
  },
  {
    name: 'Memory Card Game',
    tags: ['JavaScript', 'Game Logic', 'CSS', 'Animations'],
    text:
      'A memory-matching puzzle game with scaling difficulty (easy/medium/hard grids), pure-CSS 3D card ' +
      'flip animations, and local-storage high score boards.',
  },
  {
    name: 'Project-Coshira',
    tags: ['JavaScript', 'HTML5', 'CSS', 'Resource Sharing'],
    text:
      'An academic resource-sharing portal for students to catalog and exchange course notes, syllabus ' +
      'guides, and sample papers, with full offline fallback via localStorage caching.',
  },
  {
    name: 'Chatty',
    featured: true,
    tags: ['Node.js', 'Express', 'Socket.io', 'React'],
    text:
      'Chatty is a full real-time chat client with room management, persistent profiles, live typing-status ' +
      'indicators, and offline message queue buffering. React frontend tracking client sockets, Node/Express ' +
      'backend coordinating socket rooms and message storage. The tricky part was handling rapid client ' +
      'reconnects without duplicating socket listener instances.',
  },
  {
    name: 'Scroll',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'TensorFlow'],
    text:
      'Scroll is a gesture-based, hands-free page control tool: it maps a webcam feed through MediaPipe ' +
      'hand-landmark tracking into OS-level mouse input, supporting pinch-to-scroll and double-tap gestures ' +
      'with smooth cursor interpolation to reduce jitter.',
  },
  {
    name: 'Solar-System',
    tags: ['Canvas', 'HTML5', 'JavaScript', 'CSS'],
    text:
      'An interactive 3D-feeling solar system simulator built on HTML5 Canvas with trigonometry-based ' +
      'orbital position steps, adjustable speed multipliers, orbit-path toggles, and click-to-focus zoom.',
  },
  {
    name: 'Encrypted-Communication',
    tags: ['Arduino', 'C++', 'Python', 'pyttsx3', 'SpeechRec'],
    text:
      'A hardware project: a dual microcontroller system that encrypts typed or spoken messages with an ' +
      'XOR cipher, converts them to Morse pulses, and transmits them optically to a receiver module, with ' +
      'text-to-speech feedback on the receiving end.',
  },
  {
    name: 'Jarvis',
    tags: ['Python', 'SpeechRec', 'NLP', 'pyautogui', 'pywhatkit'],
    text:
      'Jarvis is a Python speech assistant that automates local tasks by voice - launching apps, playing ' +
      'media, running terminal-style commands - using Google Speech Recognition and OS-level command hooks, ' +
      'plus automated WhatsApp message scheduling.',
  },
  {
    name: 'Authenticator',
    tags: ['React', 'JWT', 'MongoDB', 'Express'],
    text:
      'A secure full-stack authentication blueprint with bcrypt password hashing, JWT session control, ' +
      'HTTP-only cookies to mitigate CSRF, automatic session token refresh, and Nodemailer-powered email ' +
      'activation.',
  },
  {
    name: 'Clock',
    tags: ['JavaScript', 'CSS', 'HTML5'],
    text:
      'A minimalist HUD-style clock with rotating dial indicators and automatic dark/light theming that ' +
      'follows the day-night cycle.',
  },
  {
    name: 'Text-to-Voice-converter',
    tags: ['Web Speech API', 'JavaScript'],
    text:
      "A text-to-speech utility built on the browser's native Web Speech API, with voice selection, pitch " +
      'and rate sliders, and live highlighting of the text currently being read aloud.',
  },
  {
    name: 'QR-Code-generate',
    tags: ['qrcode.js', 'HTML5', 'JavaScript'],
    text:
      'A QR code generator producing high-definition, vector-downloadable codes from text input, with a ' +
      'URL validator that warns before generating a code from a malformed link.',
  },
  {
    name: 'To-do-list',
    tags: ['HTML5', 'CSS', 'JavaScript', 'LocalStorage'],
    text:
      'A task board with category grouping tabs, completed-task filters, and instant auto-save into ' +
      'browser LocalStorage.',
  },
  {
    name: 'Note-Pad',
    tags: ['HTML5', 'JavaScript', 'CSS'],
    text:
      'A distraction-free web notepad with live character/word counters, an HTML preview mode, and ' +
      'auto-saving notes.',
  },
  {
    name: 'Age-Calculator',
    tags: ['JavaScript'],
    text:
      'A precise date-span calculator computing exact age down to the day, correctly handling leap-year ' +
      'edge cases.',
  },
  {
    name: 'Calculator',
    tags: ['JavaScript', 'Math.js'],
    text:
      'A scientific calculator with a live equation-history buffer, percentage calculations, and safe ' +
      'expression parsing that never crashes on malformed input.',
  },
  {
    name: 'Chat-bot',
    tags: ['JavaScript', 'Gemini API', 'HTML5'],
    text:
      'A contextual chatbot using the Gemini API that accepts both images (as base64 payloads) and text, ' +
      'streaming responses in real time.',
  },
  {
    name: 'Search-for-images',
    tags: ['Unsplash API', 'JavaScript', 'HTML5'],
    text:
      'An infinite-scroll image search tool pulling high-resolution photography from the Unsplash API, ' +
      'with lazy-loading tuned to trigger before the user hits the bottom of the page.',
  },
  {
    name: 'INFINITY-HUB',
    tags: ['HTML5', 'CSS', 'JavaScript'],
    text:
      'A movie/TV watchlist catalog with category filters and hover-preview cards, responsive across ' +
      'mobile viewport sizes.',
  },
  {
    name: 'Tic-Tac-Toe',
    tags: ['JavaScript', 'HTML5', 'CSS'],
    text:
      'Tic-Tac-Toe with an unbeatable AI opponent built on the Minimax algorithm, plus animated ' +
      'scoreboards tracking win streaks.',
  },
  {
    name: 'Weather-App',
    tags: ['OpenWeather API', 'Geolocation', 'JavaScript'],
    text:
      'A location-aware weather app pulling live temperature, pressure, and humidity from the OpenWeather ' +
      'API via the Geolocation API, with a city-search fallback when coordinates fail to resolve, and a ' +
      'UI theme that changes with current conditions.',
  },
];

function projectChunk(p) {
  const tags = p.tags?.length ? ` Built with ${p.tags.join(', ')}.` : '';
  return {
    id: `project-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    section: 'Projects',
    text: `${p.name}: ${p.text}${tags}`,
  };
}

export const knowledgeBase = [...PROFILE, ...PROJECTS.map(projectChunk)];
