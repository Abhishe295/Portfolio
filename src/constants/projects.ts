import MindWell from '../assets/MindWell.png';
import Coshira from '../assets/Coshira.png';
import Chatty from '../assets/Chatty.jpg';
import MemoryCard from '../assets/MemoryCard.jpg';
import MusicPlayer from '../assets/MusicPlayer.png';
import Age from '../assets/Age.png';
import Auth from '../assets/Auth.png';
import Calc from '../assets/Calc.png';
import chatbot from '../assets/chatbot.png';
import clock from '../assets/clock.png';
import imagegen from '../assets/imagegen.png';
import qr from '../assets/qr.png';
import solar from '../assets/solar.png';
import t2v from '../assets/t2v.png';
import tictac from '../assets/tictac.png';
import weath from '../assets/weath.png';
import Infinity from '../assets/Infinity.png';
import todo from '../assets/todo.png';
import Note from '../assets/Note.png';
import Musify from '../assets/Musify.png';
import HelpX from '../assets/HelpX.png';
import ProjectU from "../assets/ProjectU.png"

export interface Project {
  name: string;
  image?: string;
  shortDesc: string;
  description: string;
  tags: string[];
  link: string;
  liveUrl?: string;
  architecture: string;
  challenges: string;
  features: string[];
  featured?: boolean;
  // The one masterpiece - shown separately, front and center, so a visitor
  // never has to guess which of 25 projects is the one to actually click.
  signature?: boolean;
}

export const projectsData: Project[] = [
  {
    name: "ProjectU",
    featured: true,
    image: ProjectU,
    shortDesc: "A private space for couples and long-distance friends to sync music and share how they're feeling, in real time.",
    description: "ProjectU is built for people who live far apart - couples, best friends, anyone who wants to feel closer without guessing each other's mood. You sign in, get a unique pairing code, and share it with the one person you want to connect with. Once paired, you can listen to music in perfect sync no matter the distance, and share how you're feeling directly instead of texting 'you good?' back and forth. Your pair space is private end-to-end, while the music library itself is global so everyone's picks add to a shared pool anyone can discover.",
    tags: ["MERN", "Socket.io", "WebRTC", "End-to-End Encryption", "Real-time Sync"],
    link: "https://project-u-rho.vercel.app/",
    liveUrl: "https://project-u-rho.vercel.app/",
    architecture: "A paired-session model: two accounts join a private room via a shared invite code, connected through Socket.io for real-time state sync (playback position, mood status). Session data between a pair is end-to-end encrypted, while the music catalog itself is a shared/global layer both accounts read from.",
    challenges: "Keeping playback perfectly synchronized between two listeners on completely different networks and latencies, without one person's song noticeably lagging behind the other's.",
    features: [
      "Pairing via a private, one-time invite code.",
      "Synchronous music playback across any distance.",
      "Mood sharing - show how you feel instead of explaining it.",
      "End-to-end encrypted pair sessions with a shared global music library."
    ]
  },
  {
    name: "MindWell",
    featured: true,
    signature: true,
    image: MindWell,
    shortDesc: "A thoughtful mental wellness platform featuring AI mood analytics, daily reflections diary, and interactive mindfulness companion.",
    description: "MindWell is a comprehensive, full-stack mental wellness system designed to assist users in tracking emotional states, maintaining digital journals, and communicating with a conversational AI therapist. It leverages advanced signal processing and computer vision to analyze user sentiment in real-time.",
    tags: ["MERN", "Python", "AI", "OpenCV", "Librosa", "Socket.io"],
    link: "https://github.com/Abhishe295/ThinkBoard",
    liveUrl: "https://mindwell-three.vercel.app/",
    architecture: "Client-server model utilizing React on the frontend, Node/Express for authentication and operations, and FastAPI for Python-based voice/facial sentiment analytics. Real-time updates are piped through Socket.io.",
    challenges: "Synchronizing real-time video/voice streams with ML prediction models without dropping frames or bottlenecking Express handlers.",
    features: [
      "Facial expression analysis using OpenCV and CNN models.",
      "Vocal tone emotion detection using Librosa feature extraction.",
      "Real-time dual websocket channels for instant chat sync.",
      "Visual emotion graphs plotting weekly and monthly mood trends."
    ]
  },
  {
    name: "Musify",
    featured: true,
    image: Musify,
    shortDesc: "Smart music streaming engine that recommends music based on user mood queries and interactive Gemini AI analytics.",
    description: "Musify integrates modern web audio routing with neural Gemini queries to recommend song playlists matching the listener's mood. It provides customized playlists, visual equalizers, and interactive chat-to-play features.",
    tags: ["React", "Express", "DaisyUI", "API", "ML", "Gemini API"],
    link: "https://github.com/Abhishe295",
    liveUrl: "https://musfiy.vercel.app/",
    architecture: "React interface using DaisyUI styling, backed by an Express routing server connecting the Gemini-1.5-Pro API and local database vectors.",
    challenges: "Crafting structured prompt constraints to prevent Gemini from suggesting unplayable or broken tracks.",
    features: [
      "AI semantic mood parsing for song matching.",
      "Dynamic HTML5 Audio visualizer matching player frequencies.",
      "Custom playlist saving and user preferences caching."
    ]
  },
  {
    name: "HelpX",
    featured: true,
    image: HelpX,
    shortDesc: "Real-time emergency coordination dashboard linking citizens with regional community volunteers.",
    description: "HelpX acts as a digital emergency response system, dynamically mapping coordinate pins and pairing distressed users with active volunteers within a specified radius.",
    tags: ["React", "Express", "Socket.io", "MongoDB"],
    link: "https://github.com/Abhishe295",
    liveUrl: "https://help-x-wheat.vercel.app/",
    architecture: "MERN Stack + Socket.io rooms. Coordinates are stored in MongoDB as GeoJSON coordinates for spatial indexing.",
    challenges: "Updating active client positions dynamically and broadcast matching efficiently under high simulated load.",
    features: [
      "GeoJSON 2D sphere querying for locating nearest helpers.",
      "Real-time chat rooms spawning instantly upon request approval.",
      "Active SOS dashboard tracking responder transit status."
    ]
  },
  {
    name: "Music-Player",
    image: MusicPlayer,
    shortDesc: "Responsive music dashboard with shuffle playlists, audio controls, and an animated FUI dashboard interface.",
    description: "An elegant, lightweight music dashboard featuring playlist queues, custom shuffle formulas, dynamic timeline seeking, and smooth visual transitions.",
    tags: ["JavaScript", "HTML5", "CSS", "Web Audio"],
    link: "https://github.com/Abhishe295/Music-Player-with-shuffled-list",
    architecture: "Vanilla Javascript with functional component architecture and customized responsive CSS variables.",
    challenges: "Handling seamless transition between track audio streams and maintaining accurate seek state during rapid skipping.",
    features: [
      "Fisher-Yates shuffle algorithm implementation for bias-free queues.",
      "Responsive seekable progress meters.",
      "Dynamic background gradient matching album cover palette."
    ]
  },
  {
    name: "Memory Card Game",
    image: MemoryCard,
    shortDesc: "Dynamic emoji-based matching puzzle game with scaling difficulty levels and leaderboard memory score tracking.",
    description: "An interactive web puzzle testing user memory. Cards rotate in 3D using modern CSS perspective properties, with tracking statistics for speed and precision.",
    tags: ["JavaScript", "Game Logic", "CSS", "Animations"],
    link: "https://github.com/Abhishe295/Memory---card-game-with-levels",
    architecture: "Stateful vanilla JavaScript DOM engine with advanced transition timings and local storage scoring.",
    challenges: "Preventing card selection glitches during flip and reset animations.",
    features: [
      "Scaling level system (easy, medium, hard layout grids).",
      "Pure CSS 3D card flipping cards.",
      "High score boards storing best times."
    ]
  },
  {
    name: "Project-Coshira",
    image: Coshira,
    shortDesc: "Academic sharing portal for students to distribute learning resources, textbooks, and interactive notes.",
    description: "Coshira provides a centralized portal for college students to catalog, search, and exchange course notes, syllabus guides, and sample test papers.",
    tags: ["JavaScript", "HTML5", "CSS", "Resource Sharing"],
    link: "https://github.com/Abhishe295/Project-Coshira",
    architecture: "Vanilla frontend layout utilizing local state arrays and responsive CSS Grid distributions.",
    challenges: "Creating lightweight, search-indexed file categories entirely inside client memory.",
    features: [
      "Category filter grid for quick resource sorting.",
      "Dynamic resource upload card simulation.",
      "Full offline fallback capability using localStorage caching."
    ]
  },
  {
    name: "Chatty",
    featured: true,
    image: Chatty,
    shortDesc: "Real-time communication app featuring active typing feedback, custom room nodes, and interactive emojis.",
    description: "Chatty is a full-featured real-time chat client, featuring room management, persistent profiles, typing status indicators, and offline message queue buffering.",
    tags: ["Node.js", "Express", "Socket.io", "React"],
    link: "https://github.com/Abhishe295/REalTime---Chatapp-",
    architecture: "React components tracking client sockets, with a Node/Express backend coordinating socket rooms and message storage.",
    challenges: "Handling rapid client reconnects without duplicating socket listener instances.",
    features: [
      "Instant typing feedback broadcasts.",
      "Custom channel nodes creation.",
      "Auto-scrolling message streams."
    ]
  },
  {
    name: "Scroll",
    shortDesc: "Gesture-based page scrolling tool parsing computer vision hand signals in real-time.",
    description: "Scroll maps camera feeds to computer vision gestures, allowing users to scroll, click, and navigate websites hands-free using finger tracking.",
    tags: ["Python", "OpenCV", "MediaPipe", "TensorFlow"],
    link: "https://github.com/Abhishe295/Scroll",
    architecture: "Python engine utilizing MediaPipe for hand landmark coordinates, translated into OS-level mouse inputs.",
    challenges: "Reducing tracking jitter to prevent shaky mouse clicks or scrolling feedback loops.",
    features: [
      "Smooth cursor interpolation algorithms.",
      "Pinch-to-scroll and double-tap gestures.",
      "Configurable calibration window for variable lightning."
    ]
  },
  {
    name: "Solar-System",
    image: solar,
    shortDesc: "Interactive 3D solar system rendering orbital calculations and gravitational vector displays.",
    description: "A beautiful celestial simulator rendering accurate scaling, speed multipliers, and gravitational vector calculations using pure web technologies.",
    tags: ["Canvas", "HTML5", "JavaScript", "CSS"],
    link: "https://github.com/Abhishe295/Solar-System",
    architecture: "HTML5 2D Canvas rendering loop with trigonometry-based planetary orbital position steps.",
    challenges: "Rendering smooth trails behind orbiting bodies without bogging down CPU thread execution.",
    features: [
      "Orbit pathway toggles.",
      "Interactive planet click-to-focus zoom scales.",
      "Dynamic asteroid belt animation systems."
    ]
  },
  {
    name: "Encrypted-Communication",
    shortDesc: "Dual micro-controller Morse and cryptographic speech-to-text transmission console.",
    description: "A secure hardware terminal that encrypts typed or spoken messages, translates them into Morse pulses, and transmits them to receiver modules.",
    tags: ["Arduino", "C++", "Python", "pyttsx3", "SpeechRec"],
    link: "https://github.com/Abhishe295/Encrypted-Communication",
    architecture: "Arduino serial controllers parsing text streams, coupled with a Python desktop daemon managing microphone inputs and encryption algorithms.",
    challenges: "Calibrating photodiode response times to read high-speed optical Morse code pulse streams.",
    features: [
      "XOR cryptographic cipher encoding options.",
      "Text-to-speech audio feedback readouts.",
      "Dual hardware transmitter/receiver interface."
    ]
  },
  {
    name: "Jarvis",
    shortDesc: "Python speech assistant executing local application automation, media searches, and terminal queries.",
    description: "Jarvis acts as a custom OS dashboard agent, performing local operations such as firing browser targets, playing media streams, and managing file trees via speech triggers.",
    tags: ["Python", "SpeechRec", "NLP", "pyautogui", "pywhatkit"],
    link: "https://github.com/Abhishe295/Jarvis",
    architecture: "Modular Python scripting structured around Google Speech recognition engines and OS command hooks.",
    challenges: "Resolving noisy speech segments in offline settings without crashing active listener loops.",
    features: [
      "Regex-based pattern matching for voice triggers.",
      "OS process launcher integrations.",
      "Automated WhatsApp message scheduling triggers."
    ]
  },
  {
    name: "Authenticator",
    image: Auth,
    shortDesc: "Secure full-stack authentication dashboard with JWT sessions, email tokens, and account diagnostics.",
    description: "An industry-aligned authentication blueprint incorporating secured password storage, email validation triggers, JSON Web Token state control, and session timeouts.",
    tags: ["React", "JWT", "MongoDB", "Express"],
    link: "https://github.com/Abhishe295/Authenticator",
    architecture: "Express server implementing bcrypt and jsonwebtoken, with a React client utilizing state context wrappers.",
    challenges: "Mitigating CSRF risks by utilizing secure HTTP-only cookies for token persistence.",
    features: [
      "Automatic session token refreshing.",
      "Responsive field validation and strength meters.",
      "Email activation triggers using Nodemailer."
    ]
  },
  {
    name: "Clock",
    image: clock,
    shortDesc: "Minimalist HUD-inspired clock interface aligning background telemetry to current hour cycles.",
    description: "A beautiful FUI clock utilizing system date APIs, rendering rotating circular indicators and theme transitions matching day-night cycles.",
    tags: ["JavaScript", "CSS", "HTML5"],
    link: "https://github.com/Abhishe295/Clock",
    architecture: "Vanilla Javascript updating DOM elements inside a precise 1000ms scheduler.",
    challenges: "Transitioning animations smoothly when shifting between 23:59 and 00:00 limits.",
    features: [
      "Hour/minute/second dial loaders.",
      "Automatic dark-light theme adaptation.",
      "24-hour military clock display toggle."
    ]
  },
  {
    name: "Text-to-Voice-converter",
    image: t2v,
    shortDesc: "Web speech converter with customizable accent sliders, reading speeds, and text parsing nodes.",
    description: "A utility converting typed strings to high-fidelity spoken voice streams, supporting multi-language settings using native browser synthesis engines.",
    tags: ["Web Speech API", "JavaScript"],
    link: "https://github.com/Abhishe295/Text-to-Voice-converter",
    architecture: "Vanilla Javascript binding target inputs directly to the browser window.speechSynthesis controls.",
    challenges: "Normalizing browser voice engine inconsistencies across Safari, Chrome, and Firefox.",
    features: [
      "Voice selection lists loading native OS voices.",
      "Pitch and rate slider controls.",
      "Active reading trackers highlighting spoken text blocks."
    ]
  },
  {
    name: "QR-Code-generate",
    image: qr,
    shortDesc: "FUI barcode encoder translating inputs, targets, and contact details into instant QR matrices.",
    description: "A client utility that generates high-definition QR vector cards from text inputs, allowing instant mobile scanning.",
    tags: ["qrcode.js", "HTML5", "JavaScript"],
    link: "https://github.com/Abhishe295/QR-Code-generate",
    architecture: "Lightweight canvas generation using structured binary matrix libraries.",
    challenges: "Maintaining barcode scanning contrast ratios across custom CSS site themes.",
    features: [
      "Vector-based image downloads.",
      "Interactive pixel density configurations.",
      "URL validator warning users before generating code."
    ]
  },
  {
    name: "To-do-list",
    image: todo,
    shortDesc: "Task planning board featuring drag-and-drop hierarchy adjustments and local cache sync.",
    description: "A clean dashboard checking off tasks, displaying progress meters, and structuring todo sub-items with quick animations.",
    tags: ["HTML5", "CSS", "JavaScript", "LocalStorage"],
    link: "https://github.com/Abhishe295/To-do-list",
    architecture: "Vanilla state tracker hooking into browser LocalStorage pipelines.",
    challenges: "Arranging list transitions and slide animations without reflow delay jumps.",
    features: [
      "Category grouping tabs.",
      "Completed task filters.",
      "Auto-save triggers syncing data instantly."
    ]
  },
  {
    name: "Note-Pad",
    image: Note,
    shortDesc: "Client note notepad offering markdown headers, character telemetry, and auto-saving files.",
    description: "A distraction-free web notepad displaying active character metrics, word counts, and rich markdown visualization panels.",
    tags: ["HTML5", "JavaScript", "CSS"],
    link: "https://github.com/Abhishe295/Note-Pad",
    architecture: "Pure JS updating text nodes with high speed keyup callbacks.",
    challenges: "Supporting rich tab character indentations inside a standard textarea.",
    features: [
      "Character and word metric trackers.",
      "HTML preview generators.",
      "Auto-saving note templates."
    ]
  },
  {
    name: "Age-Calculator",
    image: Age,
    shortDesc: "A precise date-span calculator calculating exact age spans down to milliseconds.",
    description: "Calculates precise durations between birth logs and current timestamps, detailing total years, months, weeks, and hours elapsed.",
    tags: ["JavaScript"],
    link: "https://github.com/Abhishe295/Age-Calculator",
    architecture: "Mathematical date calculation engine executing boundary logic for varying month lengths.",
    challenges: "Ensuring accurate duration outputs during leap-year overlaps.",
    features: [
      "Interactive calendar widgets.",
      "Detailed time metrics readout grid.",
      "Animated counter animations counting up to target ages."
    ]
  },
  {
    name: "Calculator",
    image: Calc,
    shortDesc: "Dynamic calculator with history buffers, expression trees, and quick keyboard listeners.",
    description: "A sleek scientific calculator executing math queries using mathematical parser formulas with clear memory storage readouts.",
    tags: ["JavaScript", "Math.js"],
    link: "https://github.com/Abhishe295/Calculator",
    architecture: "Vanilla calculations module integrating key press events with dynamic screen display values.",
    challenges: "Handling expression string errors safely without crashing internal calculation values.",
    features: [
      "Live equation history buffers.",
      "Percentage calculations logic.",
      "FUI neon click effects."
    ]
  },
  {
    name: "Chat-bot",
    image: chatbot,
    shortDesc: "Contextual chatbot utilizing Gemini APIs to process visual inputs and text conversations.",
    description: "A conversation dashboard accepting base64 file payloads and prompt queries, displaying smart answers in a modern message layout.",
    tags: ["JavaScript", "Gemini API", "HTML5"],
    link: "https://github.com/Abhishe295/Chat-bot-accepts-pictures-also",
    architecture: "Single page dashboard querying public AI APIs through local client hooks.",
    challenges: "Handling large media payload encodings without blocking client UI input actions.",
    features: [
      "Image thumbnail previews.",
      "Real-time token text streams.",
      "Conversation node layout animations."
    ]
  },
  {
    name: "Search-for-images",
    image: imagegen,
    shortDesc: "Infinite scrolling media finder pulling high-resolution photos via REST APIs.",
    description: "An image gallery dashboard that loads high-res photography matching keyword search criteria, using async query systems.",
    tags: ["Unsplash API", "JavaScript", "HTML5"],
    link: "https://github.com/Abhishe295/Search-for-images",
    architecture: "Async fetch patterns mapping API data to dynamic CSS grid blocks.",
    challenges: "Configuring lazy load offsets to trigger before scrolling to the bottom.",
    features: [
      "Interactive image modal displays.",
      "Direct photographer profile link mappings.",
      "Download trigger shortcuts."
    ]
  },
  {
    name: "INFINITY-HUB",
    image: Infinity,
    shortDesc: "Cinematic catalog cataloging trending television shows and movie watchlist items.",
    description: "A dashboard displaying multimedia cards, categorized lists, and ratings panels with responsive layouts.",
    tags: ["HTML5", "CSS", "JavaScript"],
    link: "https://github.com/Abhishe295/INFINITY-HUB",
    architecture: "Static HTML pages linked with CSS classes and custom search overlays.",
    challenges: "Positioning dense grid configurations neatly across differing mobile viewport sizes.",
    features: [
      "Interactive category filters.",
      "Watchlist toggle controls.",
      "Hover trailers scale details."
    ]
  },
  {
    name: "Tic-Tac-Toe",
    image: tictac,
    shortDesc: "Interactive game grid showcasing smart AI blocking moves and scoring stats.",
    description: "A grid game offering user vs user or user vs AI modes, executing Minimax path decision models for the machine opponent.",
    tags: ["JavaScript", "HTML5", "CSS"],
    link: "https://github.com/Abhishe295/Tic-Tac-Toe",
    architecture: "Grid cell status arrays synced with game condition loops.",
    challenges: "Ensuring instantaneous AI coordinate selections without breaking gameplay pacing.",
    features: [
      "Unbeatable AI Minimax decision triggers.",
      "Animated scoreboards tracking streaks.",
      "Visual grid win-line markers."
    ]
  },
  {
    name: "Weather-App",
    image: weath,
    shortDesc: "Location-aware meteorology tool loading weather matrices and themed backgrounds.",
    description: "A responsive meteorology console pulling local temperature metrics, atmospheric pressure, and humidity values based on location settings.",
    tags: ["OpenWeather API", "Geolocation", "JavaScript"],
    link: "https://github.com/Abhishe295/Weather-with-geo-loaction",
    architecture: "Async client requesting regional data based on Geolocation API coordinates.",
    challenges: "Resolving city query fallback search inputs when coordinates fail to resolve.",
    features: [
      "Weather conditions change active themes.",
      "Interactive Wind speed indicators.",
      "Dynamic weather graphics loader."
    ]
  }
];