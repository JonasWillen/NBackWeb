/**
 * Themes — 12 popular color combinations applied live to the UX Lab.
 * Each theme overrides the CSS custom properties on :root.
 */

export const THEMES = [
  {
    id: 'midnight',
    name: 'Midnight Slate',
    vibe: 'Current app theme — dark blue-gray, calm and neutral',
    vars: { bg: '#0f172a', surface: '#1e293b', 'surface-2': '#334155', fg: '#e2e8f0', muted: '#94a3b8', accent: '#38bdf8', good: '#34d399', bad: '#f472b6' },
  },
  {
    id: 'nord',
    name: 'Nord',
    vibe: 'Popular developer palette — arctic blues on frost blue-gray',
    vars: { bg: '#2e3440', surface: '#3b4252', 'surface-2': '#4c566a', fg: '#eceff4', muted: '#a6acba', accent: '#88c0d0', good: '#a3be8c', bad: '#b48ead' },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    vibe: 'Iconic dark theme — purple with pink/green accents',
    vars: { bg: '#282a36', surface: '#343746', 'surface-2': '#44475a', fg: '#f8f8f2', muted: '#9aa0b5', accent: '#bd93f9', good: '#50fa7b', bad: '#ff79c6' },
  },
  {
    id: 'tokyonight',
    name: 'Tokyo Night',
    vibe: 'Trendy editor theme — deep navy with cyan/purple',
    vars: { bg: '#1a1b26', surface: '#24283b', 'surface-2': '#3b4261', fg: '#c0caf5', muted: '#8189af', accent: '#7aa2f7', good: '#9ece6a', bad: '#f7768e' },
  },
  {
    id: 'solarized',
    name: 'Solarized Dark',
    vibe: 'Classic readability-first palette — warm earth tones',
    vars: { bg: '#002b36', surface: '#073642', 'surface-2': '#094a5a', fg: '#eee8d5', muted: '#93a1a1', accent: '#268bd2', good: '#859900', bad: '#d33682' },
  },
  {
    id: 'gruvbox',
    name: 'Gruvbox',
    vibe: 'Retro groove — warm beige/green/orange, low eye strain',
    vars: { bg: '#282828', surface: '#3c3836', 'surface-2': '#504945', fg: '#ebdbb2', muted: '#a89984', accent: '#fe8019', good: '#b8bb26', bad: '#fb4934' },
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin Mocha',
    vibe: 'Sofisticated pastel theme — huge in the dev community',
    vars: { bg: '#1e1e2e', surface: '#313244', 'surface-2': '#45475a', fg: '#cdd6f4', muted: '#9399b2', accent: '#cba6f7', good: '#a6e3a1', bad: '#f38ba8' },
  },
  {
    id: 'lightmaterial',
    name: 'Material Light',
    vibe: 'Clean Google-style light theme — great daylight readability',
    vars: { bg: '#fafafa', surface: '#ffffff', 'surface-2': '#e0e0e0', fg: '#1f1f1f', muted: '#666666', accent: '#1a73e8', good: '#1e8e3e', bad: '#d93025' },
  },
  {
    id: 'paper',
    name: 'Paper Cream',
    vibe: 'Warm off-white paper look — cozy, low-glare light mode',
    vars: { bg: '#fdf6e3', surface: '#f5ecd7', 'surface-2': '#e8dcc0', fg: '#3b3228', muted: '#8a7d6b', accent: '#c8701f', good: '#7d8f00', bad: '#b3424a' },
  },
  {
    id: 'neon',
    name: 'Synthwave Neon',
    vibe: 'Cyberpunk/outrun vibes — pitch black with neon glow',
    vars: { bg: '#0d0221', surface: '#190b33', 'surface-2': '#2a1454', fg: '#e7d5ff', muted: '#8f7bb8', accent: '#ff2ec4', good: '#00f5d4', bad: '#ff5e5e' },
  },
  {
    id: 'mono',
    name: 'High Contrast Mono',
    vibe: 'Accessibility-first — maximum contrast, color-blind safe',
    vars: { bg: '#000000', surface: '#1a1a1a', 'surface-2': '#333333', fg: '#ffffff', muted: '#aaaaaa', accent: '#ffff00', good: '#00ff00', bad: '#ff0000' },
  },
  {
    id: 'ocean',
    name: 'Ocean Depth',
    vibe: 'Teal gradient mood — dark aqua with coral highlights',
    vars: { bg: '#0b2027', surface: '#14454d', 'surface-2': '#1f6f78', fg: '#e0fbfc', muted: '#8ab8be', accent: '#ff7f51', good: '#3ddc97', bad: '#ff5c8a' },
  },
];

export function applyTheme(root, themeId) {
  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(`--${k}`, v));
  root.dataset.theme = theme.id;
  return theme;
}
