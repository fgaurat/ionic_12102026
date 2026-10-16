import { Injectable, effect, signal } from '@angular/core';

export interface Preferences {
  hideCompleted: boolean;
  confirmDelete: boolean;
}

@Injectable({ providedIn: 'root' })
export class PreferencesService2 {
  readonly STORAGE_KEY = 'todolist.preferences';
  readonly DEFAULTS: Preferences = {
    hideCompleted: false,
    confirmDelete: true,
  };

  readonly hideCompleted = signal(this.read().hideCompleted);
  readonly confirmDelete = signal(this.read().confirmDelete);

  private read(): Preferences {
    try {
      return {
        ...this.DEFAULTS,
        ...JSON.parse(localStorage.getItem(this.STORAGE_KEY) ?? '{}'),
      };
    } catch {
      return this.DEFAULTS;
    }
  }

  constructor() {
    // Sauvegarde automatique à chaque changement
    effect(() => {
      const prefs: Preferences = {
        hideCompleted: this.hideCompleted(),
        confirmDelete: this.confirmDelete(),
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prefs));
    });
  }
}
