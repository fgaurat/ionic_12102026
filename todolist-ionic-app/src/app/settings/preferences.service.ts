import { Service } from '@angular/core';
import { effect, signal } from '@angular/core';

export interface Preferences {
  hideCompleted: boolean;
  confirmDelete: boolean;
}

const STORAGE_KEY = 'todolist.preferences';
const DEFAULTS: Preferences = {
  hideCompleted: false,
  confirmDelete: true,
};
function read(): Preferences {
  try {
    return {
      //DEFAULTS, // { hideCompleted: false, confirmDelete: true }
      ...DEFAULTS, //  hideCompleted: false, confirmDelete: true
      ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}'),
    };
  } catch {
    return DEFAULTS;
  }
}

@Service()
export class PreferencesService {
  readonly hideCompleted = signal(read().hideCompleted);
  readonly confirmDelete = signal(read().confirmDelete);

  constructor() {
    // Sauvegarde automatique à chaque changement
    effect(() => {
      const prefs: Preferences = {
        hideCompleted: this.hideCompleted(),
        confirmDelete: this.confirmDelete(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    });
  }
}
