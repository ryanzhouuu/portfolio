import { DesktopAction, WindowId, WINDOW_CONFIGS } from '@/context/windowTypes';
import { personalInfo, experience } from '@/lib/data';

export interface TerminalLine {
  id: string;
  kind: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string;
}

export interface CommandResult {
  lines: TerminalLine[];
  sideEffect?:
    | { action: DesktopAction }
    | { type: 'CLEAR_TERMINAL' };
}

let _lineCounter = 0;
function mkLine(kind: TerminalLine['kind'], text: string): TerminalLine {
  return { id: `line-${++_lineCounter}`, kind, text };
}

const APP_IDS = WINDOW_CONFIGS.map((c) => c.id);

export function parseCommand(raw: string): CommandResult {
  const input = raw.trim();
  const lower = input.toLowerCase();

  // Multi-word commands checked first
  if (lower === 'git log') {
    const lines: TerminalLine[] = [
      mkLine('system', 'commit history:'),
      ...experience.map((exp) =>
        mkLine('output', `  commit ${randomHash()} — ${exp.company}: ${exp.role} (${exp.period})`)
      ),
    ];
    return { lines };
  }

  if (lower === 'man ryan') {
    return {
      lines: [
        mkLine('system', 'RYAN(1)                  User Commands                 RYAN(1)'),
        mkLine('output', ''),
        mkLine('output', 'NAME'),
        mkLine('output', `  ${personalInfo.name} — ${personalInfo.title}`),
        mkLine('output', ''),
        mkLine('output', 'DESCRIPTION'),
        mkLine('output', `  ${personalInfo.bio}`),
        mkLine('output', ''),
        mkLine('output', 'SEE ALSO'),
        mkLine('output', `  github: ${personalInfo.github}`),
        mkLine('output', `  email:  ${personalInfo.email}`),
      ],
    };
  }

  if (lower === 'sudo hire-me') {
    return {
      lines: [
        mkLine('success', '[sudo] password for visitor: '),
        mkLine('success', 'Access granted.'),
        mkLine('success', 'Sending email to recruiters...'),
        mkLine('success', `✓ Email sent to ${personalInfo.email}`),
        mkLine('system',  'Good choice.'),
      ],
    };
  }

  if (lower === 'cat resume.pdf') {
    return {
      lines: [
        mkLine('error', 'Binary file (application/pdf). Cannot display.'),
        mkLine('system', 'Hint: use `open about` or `open experience` instead.'),
      ],
    };
  }

  // Single-word commands
  const [cmd, ...args] = input.split(/\s+/);
  const cmdLower = cmd.toLowerCase();

  if (cmdLower === 'help') {
    return {
      lines: [
        mkLine('system', 'Available commands:'),
        mkLine('output', '  whoami          — who is Ryan?'),
        mkLine('output', '  ls              — list apps'),
        mkLine('output', '  open [app]      — open an app window'),
        mkLine('output', '  git log         — work history as commits'),
        mkLine('output', '  man ryan        — the manual page'),
        mkLine('output', '  sudo hire-me    — easter egg'),
        mkLine('output', '  cat resume.pdf  — try it'),
        mkLine('output', '  clear           — clear terminal'),
      ],
    };
  }

  if (cmdLower === 'whoami') {
    return {
      lines: [
        mkLine('output', `${personalInfo.name}`),
        mkLine('output', `${personalInfo.title}`),
        mkLine('output', `${personalInfo.bio}`),
      ],
    };
  }

  if (cmdLower === 'ls') {
    return {
      lines: [
        mkLine('output', WINDOW_CONFIGS.map((c) => c.title).join('  ')),
      ],
    };
  }

  if (cmdLower === 'open') {
    const target = args[0]?.toLowerCase() as WindowId | undefined;
    if (!target) {
      return {
        lines: [mkLine('error', 'Usage: open [app]')],
      };
    }
    const match = APP_IDS.find((id) => id === target || id.startsWith(target));
    if (match) {
      return {
        lines: [mkLine('success', `Opening ${match}...`)],
        sideEffect: { action: { type: 'OPEN_WINDOW', id: match } },
      };
    }
    return {
      lines: [
        mkLine('error', `open: no such app '${target}'`),
        mkLine('system', `Available: ${APP_IDS.join(', ')}`),
      ],
    };
  }

  if (cmdLower === 'clear') {
    return {
      lines: [],
      sideEffect: { type: 'CLEAR_TERMINAL' },
    };
  }

  if (input === '') {
    return { lines: [] };
  }

  return {
    lines: [
      mkLine('error', `${input}: command not found. Type 'help' for available commands.`),
    ],
  };
}

function randomHash(): string {
  return Math.random().toString(16).slice(2, 9);
}
