import { isColorSupported } from 'picocolors';

const RESET = '\x1b[0m';

// #DB8163 (RGB 219, 129, 99) をベースに明→暗のグラデーション (6段階)
const GRADIENT_COLORS: [number, number, number][] = [
  [240, 180, 158], // 最も明るい
  [230, 160, 133],
  [219, 129, 99], // ベースカラー (#DB8163)
  [196, 108, 78],
  [172, 88, 58],
  [148, 70, 40], // 最も暗い
];

function rgb(r: number, g: number, b: number): string {
  return `\x1b[38;2;${r};${g};${b}m`;
}

// カラー非対応ターミナルでも読めるよう dim に fallback
const DIM = isColorSupported ? rgb(150, 150, 150) : '';
const TEXT = isColorSupported ? rgb(219, 129, 99) : '';

const LOGO_LINES = [
  '███████╗██████╗ ██╗███╗   ██╗███╗   ██╗███████╗██████╗ ',
  '██╔════╝██╔══██╗██║████╗  ██║████╗  ██║██╔════╝██╔══██╗',
  '███████╗██████╔╝██║██╔██╗ ██║██╔██╗ ██║█████╗  ██████╔╝',
  '╚════██║██╔═══╝ ██║██║╚██╗██║██║╚██╗██║██╔══╝  ██╔══██╗',
  '███████║██║     ██║██║ ╚████║██║ ╚████║███████╗██║  ██║',
  '╚══════╝╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝',
];

function cmd(command: string, args: string, description: string): void {
  const reset = isColorSupported ? RESET : '';
  console.log(
    `  ${DIM}$${reset} ${TEXT}npx @suntory-n-water/cc-spinner ${command} ${DIM}${args}${reset}  ${DIM}${description}${reset}`,
  );
}

export function showLogo(): void {
  console.log();
  LOGO_LINES.forEach((line, i) => {
    const color = GRADIENT_COLORS[i];
    if (isColorSupported && color) {
      const [r, g, b] = color;
      console.log(`${rgb(r, g, b)}${line}${RESET}`);
    } else {
      console.log(line);
    }
  });
  console.log();
}

export function showBanner(): void {
  showLogo();
  const reset = isColorSupported ? RESET : '';
  console.log(
    `${DIM}CLI tool to distribute and apply spinnerVerbs themes for Claude Code${reset}`,
  );
  console.log();
  cmd('add', '<theme>', 'Apply a theme');
  cmd('preview', '<theme>', 'Preview verbs');
  cmd('list', '', 'List available themes');
  cmd('find', '<query>', 'Find themes');
  console.log();
  console.log(`${DIM}try:${reset} npx @suntory-n-water/cc-spinner add frieren`);
  console.log();
}
