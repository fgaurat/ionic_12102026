import { Service } from '@angular/core';

import { effect, signal } from '@angular/core';

const STORAGE_KEY = 'todolist.theme';

export type ThemeMode = 'system' | 'light' | 'dark';

export interface Accent {
  id: string;
  label: string;
  color: string; // hex
}

export const ACCENTS: Accent[] = [
  { id: 'blue', label: 'Bleu', color: '#0054e9' },
  { id: 'green', label: 'Vert', color: '#2dd36f' },
  { id: 'purple', label: 'Violet', color: '#6a64ff' },
  { id: 'orange', label: 'Orange', color: '#f57c00' },
  { id: 'pink', label: 'Rose', color: '#e91e63' },
];

interface Stored {
  mode: ThemeMode;
  accent: string;
}

function read(): Stored {
  try {
    return {
      mode: 'system',
      accent: 'blue',
      ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}'),
    };
  } catch {
    return { mode: 'system', accent: 'blue' };
  }
}

// Mélange une couleur hex avec du noir (ratio < 0) ou du blanc (ratio > 0)
function mix(hex: string, ratio: number): string {
  const target = ratio < 0 ? 0 : 255;
  const r = Math.abs(ratio);
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return (
    '#' +
    channels
      .map((c) =>
        Math.round(c + (target - c) * r)
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  );
}

function contrastFor(hex: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? '#000000' : '#ffffff';
}

@Service()
export class ThemeService {
  readonly mode = signal<ThemeMode>(read().mode);
  readonly accent = signal<string>(read().accent);

  private media = window.matchMedia('(prefers-color-scheme: dark)');
  private systemDark = signal(this.media.matches);

  constructor() {
    this.media.addEventListener('change', (e) =>
      this.systemDark.set(e.matches),
    );

    // Mode clair / sombre : on pose la classe `ion-palette-dark` sur <html>
    effect(() => {
      const dark =
        this.mode() === 'dark' ||
        (this.mode() === 'system' && this.systemDark());
      document.documentElement.classList.toggle('ion-palette-dark', dark);
    });

    // Couleur d'accent : on redéfinit les variables CSS de `primary`
    effect(() => {
      const hex = (ACCENTS.find((a) => a.id === this.accent()) ?? ACCENTS[0])
        .color;
      const rgb = [1, 3, 5]
        .map((i) => parseInt(hex.slice(i, i + 2), 16))
        .join(', ');
      const style = document.documentElement.style;
      style.setProperty('--ion-color-primary', hex);
      style.setProperty('--ion-color-primary-rgb', rgb);
      style.setProperty('--ion-color-primary-contrast', contrastFor(hex));
      style.setProperty('--ion-color-primary-shade', mix(hex, -0.12));
      style.setProperty('--ion-color-primary-tint', mix(hex, 0.12));
    });

    effect(() => {
      const stored: Stored = { mode: this.mode(), accent: this.accent() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    });
  }
}
