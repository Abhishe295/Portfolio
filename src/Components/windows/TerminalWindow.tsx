import React, { useEffect, useRef, useState } from 'react';
import { Terminal, CornerDownLeft } from 'lucide-react';
import { useSystemStore } from '../../lib/useSystemStore';
import { projectsData } from '../../constants/projects';

interface LogLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

const COMMAND_LIST = [
  'help',
  'whoami',
  'about',
  'projects',
  'experience',
  'skills',
  'tech',
  'education',
  'hackathons',
  'stats',
  'favorite',
  'contact',
  'github',
  'leetcode',
  'resume',
  'bench',
  'run',
  'coffee',
  'bug',
  'motivation',
  'easteregg',
  'clear',
];

export default function TerminalWindow() {
  const { terminalHistory, addTerminalHistory } = useSystemStore();
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [logs, setLogs] = useState<LogLine[]>([
    { text: "abhishek's terminal — type 'help' to get started.", type: 'success' },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMAND_LIST.find((cmd) => cmd.startsWith(inputVal.toLowerCase()));
      if (match) setInputVal(match);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (terminalHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < terminalHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(terminalHistory[terminalHistory.length - 1 - nextIdx]);
        }
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = historyIndex - 1;
      if (nextIdx >= 0) {
        setHistoryIndex(nextIdx);
        setInputVal(terminalHistory[terminalHistory.length - 1 - nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    addTerminalHistory(trimmed);
    setHistoryIndex(-1);

    const newLogs: LogLine[] = [...logs, { text: `guest@abhishek:~$ ${cmdStr}`, type: 'input' }];

    switch (trimmed) {
      case 'help':
        newLogs.push({
          text:
            'Available Commands\n\n' +
            'about        - professional summary\n' +
            'whoami       - quick profile\n' +
            'projects     - featured projects\n' +
            'experience   - work history\n' +
            'skills       - technical skills\n' +
            'tech         - categorized stack\n' +
            'education    - academic background\n' +
            'hackathons   - competitions\n' +
            'stats        - engineering numbers\n' +
            'favorite     - personal tech picks\n' +
            'contact      - get in touch\n' +
            'github       - open GitHub\n' +
            'leetcode     - open LeetCode\n' +
            'resume       - download resume\n\n' +
            'bench        - gym stats\n' +
            'run          - running stats\n' +
            'coffee       - caffeine report\n' +
            'bug          - debugging status\n' +
            'motivation   - daily loop\n' +
            'easteregg    - hidden message\n\n' +
            'clear        - clear terminal',
          type: 'output',
        });
        break;

      case 'whoami':
        newLogs.push({
          text:
            'Name      : Abhishek\n' +
            'Role      : Software Engineer\n' +
            'Focus     : AI + Full Stack Development\n' +
            'Location  : India\n\n' +
            'Currently building production software\n' +
            'at Spot-n-Play.',
          type: 'output',
        });
        break;

      case 'about':
        newLogs.push({
          text:
            "I'm a Computer Science student focused on\n" +
            'AI and Full Stack Development.\n\n' +
            'I enjoy building software that solves\n' +
            'real-world problems, from healthcare AI\n' +
            'systems to production-ready web platforms.\n\n' +
            'Currently working at an LPU-incubated startup\n' +
            'while continuously improving my software\n' +
            'engineering skills.',
          type: 'output',
        });
        break;

      case 'projects': {
        const featured = projectsData.filter((p) => p.featured);
        const list = featured
          .map((p, i) => `${i + 1}. ${p.name}\n   ${p.shortDesc.split('.')[0]}`)
          .join('\n\n');
        newLogs.push({
          text: `Featured Projects\n\n${list}\n\nType "github" to explore more.`,
          type: 'output',
        });
        break;
      }

      case 'experience':
        newLogs.push({
          text:
            'Software Developer Intern\n' +
            'Spot-n-Play\n\n' +
            '• Production software\n' +
            '• Performance optimization\n' +
            '• Authentication & security\n' +
            '• Team collaboration\n\n' +
            '────────────────────────────\n\n' +
            'Freelance Developer\n\n' +
            'Factory Tool Management System\n\n' +
            '• Inventory management\n' +
            '• Secure CRUD operations\n' +
            '• Client delivery',
          type: 'output',
        });
        break;

      case 'skills':
        newLogs.push({
          text:
            'Core Skills\n\n' +
            'Backend Development\n' +
            'Frontend Development\n' +
            'Machine Learning\n' +
            'REST APIs\n' +
            'Database Design\n' +
            'Authentication\n' +
            'Problem Solving\n\n' +
            'Type "tech" for complete stack.',
          type: 'output',
        });
        break;

      case 'tech':
        newLogs.push({
          text:
            'Languages\n' +
            '────────────\n' +
            'Java\n' +
            'Python\n' +
            'JavaScript\n' +
            'SQL\n\n' +
            'Frontend\n' +
            '────────────\n' +
            'React\n' +
            'Tailwind\n' +
            'Vite\n\n' +
            'Backend\n' +
            '────────────\n' +
            'Node.js\n' +
            'Express\n' +
            'MongoDB\n\n' +
            'AI\n' +
            '────────────\n' +
            'PyTorch\n' +
            'TensorFlow\n' +
            'OpenCV\n' +
            'Scikit-Learn\n\n' +
            'Tools\n' +
            '────────────\n' +
            'Git\n' +
            'Docker\n' +
            'Postman\n' +
            'Cloudinary\n' +
            'Render',
          type: 'output',
        });
        break;

      case 'education':
        newLogs.push({
          text:
            'Bachelor of Technology\n\n' +
            'Computer Science &\n' +
            'Engineering (AI & ML)\n\n' +
            'Lovely Professional University\n\n' +
            'Expected Graduation\n' +
            '2027',
          type: 'output',
        });
        break;

      case 'hackathons':
        newLogs.push({
          text:
            'Participated in hackathons, including the\n' +
            'IIT Ropar Deep Learning Hackathon.\n\n' +
            'No wins yet — building toward that.',
          type: 'output',
        });
        break;

      case 'stats':
        newLogs.push({
          text:
            'Projects Built      : 25+\n\n' +
            'AI Projects         : 5\n\n' +
            'Full Stack Apps     : 8\n\n' +
            'DSA Problems        : 300+\n\n' +
            'Hackathons          : 3\n\n' +
            'Startup Experience  : 1\n\n' +
            'Freelance Clients   : 1\n\n' +
            'Currently Building\n\n' +
            '→ Production software at Spot-n-Play',
          type: 'output',
        });
        break;

      case 'favorite':
        newLogs.push({
          text:
            'Favorite Stack\n\n' +
            'Language       : Python\n\n' +
            'Framework      : React\n\n' +
            'Backend        : Node.js\n\n' +
            'AI Framework   : PyTorch\n\n' +
            'Database       : MongoDB\n\n' +
            'Editor         : VS Code',
          type: 'output',
        });
        break;

      case 'contact':
        newLogs.push({
          text:
            'Email\n\n' +
            'abhishekgigaiw@gmail.com\n\n' +
            'GitHub\n\n' +
            'github.com/Abhishe295\n\n' +
            'LinkedIn\n\n' +
            'linkedin.com/in/abhishek-kumar-pundir-ba4110326\n\n' +
            'Phone\n\n' +
            'Available on request',
          type: 'output',
        });
        break;

      case 'resume':
        newLogs.push({ text: 'Preparing Resume.pdf...', type: 'output' });
        try {
          const link = document.createElement('a');
          link.href = '/resume.pdf';
          link.download = 'Abhishek_Kumar_Pundir_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          newLogs.push({ text: 'Download Started ✓', type: 'success' });
        } catch {
          newLogs.push({ text: 'Could not start the download.', type: 'error' });
        }
        break;

      case 'github':
        newLogs.push({ text: 'Opening GitHub...\n\nRedirecting...', type: 'success' });
        window.open('https://github.com/Abhishe295', '_blank');
        break;

      case 'leetcode':
        newLogs.push({ text: 'Opening LeetCode...\n\nHappy Coding 🚀', type: 'success' });
        window.open('https://leetcode.com/u/Abhishek_Kumar9999/', '_blank');
        break;

      case 'bench':
        newLogs.push({
          text:
            'Current Bench PR\n\n' +
            '90 kg\n\n' +
            'Goal\n\n' +
            '100 kg\n\n' +
            'Progress\n\n' +
            '█████████░ 90%',
          type: 'output',
        });
        break;

      case 'run':
        newLogs.push({
          text:
            '5K Personal Best\n\n' +
            '29:19\n\n' +
            'Current Goal\n\n' +
            'Sub-20\n\n' +
            'Status\n\n' +
            'Still chasing...',
          type: 'output',
        });
        break;

      case 'coffee':
        newLogs.push({
          text:
            'Coffee Dependency\n\n' +
            '0%\n\n' +
            'Sleep Dependency\n\n' +
            '100%\n\n' +
            'Energy Source\n\n' +
            'Discipline',
          type: 'output',
        });
        break;

      case 'bug':
        newLogs.push({
          text:
            'Searching...\n\n' +
            '17 bugs found.\n\n' +
            '16 fixed.\n\n' +
            '1 disappeared after adding\n' +
            'console.log().',
          type: 'output',
        });
        break;

      case 'motivation':
        newLogs.push({
          text: 'while(alive){\n\n    learn();\n\n    build();\n\n    improve();\n\n}',
          type: 'output',
        });
        break;

      case 'easteregg':
        newLogs.push({
          text:
            'Access Granted.\n\n' +
            'Achievement Unlocked\n\n' +
            'Curiosity > Documentation\n\n' +
            'Thanks for exploring.\n\n' +
            'Now go hire me :)',
          type: 'success',
        });
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      default:
        newLogs.push({ text: `Command not found: '${trimmed}'. Type 'help' for a list.`, type: 'error' });
        break;
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <div className="flex flex-col h-full font-mono" onClick={() => inputRef.current?.focus()}>
      <div
        className="flex-1 p-5 overflow-y-auto space-y-3 text-xs md:text-sm select-text scrollbar-thin cursor-text"
      >
        {logs.map((log, idx) => {
          let color = 'text-primary/90';
          if (log.type === 'input') color = 'text-white font-bold';
          if (log.type === 'success') color = 'text-success';
          if (log.type === 'error') color = 'text-red-400 font-bold';

          return (
            <div key={idx} className={`${color} whitespace-pre-wrap leading-relaxed`}>
              {log.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="flex items-center gap-3 px-5 py-3 border-t border-primary/15 bg-black/20"
      >
        <Terminal className="w-3.5 h-3.5 text-primary/70 shrink-0" />
        <div className="flex-1 relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full bg-transparent border-none outline-none text-primary text-xs md:text-sm"
            placeholder="Type a command…"
            autoFocus
          />
          <div className="absolute right-0 text-[10px] text-primary/40 flex items-center gap-1 pointer-events-none">
            <span>Enter</span>
            <CornerDownLeft className="w-3 h-3" />
          </div>
        </div>
      </form>
    </div>
  );
}