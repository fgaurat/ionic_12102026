import { Injectable, Service } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

import { Todo } from '../todos/todo';

const DB_NAME = 'todolist';

// Couche d'accès à SQLite : la base locale qui sert de cache des tâches.
// Le reste de l'app ne voit que ces 4 méthodes : all, replaceAll, upsert, remove.
@Service()
export class SqliteService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private isWeb = Capacitor.getPlatform() === 'web';

  // Ouverture de la base, faite une seule fois (au premier appel)
  private db?: Promise<SQLiteDBConnection>;

  private getDb() {
    throw Error('getDb');
    // En cas d'échec, on oublie la promesse rejetée pour retenter au prochain appel
    return (this.db ??= this.open().catch((e) => {
      this.db = undefined;
      throw e;
    }));
  }

  private async open(): Promise<SQLiteDBConnection> {
    if (this.isWeb) await this.initWeb();

    // Resynchronise les connexions connues côté JS et côté natif
    const consistent = (await this.sqlite.checkConnectionsConsistency()).result;
    const exists = (await this.sqlite.isConnection(DB_NAME, false)).result;

    const db =
      consistent && exists
        ? await this.sqlite.retrieveConnection(DB_NAME, false)
        : await this.sqlite.createConnection(
            DB_NAME,
            false,
            'no-encryption',
            1,
            false,
          );

    if (!(await db.isDBOpen()).result) await db.open();

    // id en TEXT : l'API peut renvoyer un nombre ou un UUID
    await db.execute(
      'CREATE TABLE IF NOT EXISTS todos (id TEXT PRIMARY KEY, title TEXT NOT NULL, completed INTEGER NOT NULL DEFAULT 0);',
    );
    return db;
  }

  private async initWeb() {
    const { defineCustomElements } = await import('jeep-sqlite/loader');
    defineCustomElements(window);
    document.body.appendChild(document.createElement('jeep-sqlite'));
    await customElements.whenDefined('jeep-sqlite');
    await this.sqlite.initWebStore();
  }

  // Sur le web, la base vit en mémoire : on la sauvegarde dans IndexedDB après chaque écriture
  private async persist() {
    if (this.isWeb) await this.sqlite.saveToStore(DB_NAME);
  }

  async all(): Promise<Todo[]> {
    const db = await this.getDb();
    const { values } = await db.query(
      'SELECT id, title, completed FROM todos ORDER BY id',
    );
    // SQLite n'a pas de booléen : completed est stocké en 0 / 1
    return (values ?? []).map((r) => ({
      id: r.id,
      title: r.title,
      completed: r.completed === 1,
    }));
  }

  // Remplace tout le contenu du cache par la liste reçue de l'API
  async replaceAll(todos: Todo[]) {
    const db = await this.getDb();
    await db.executeSet(
      [
        { statement: 'DELETE FROM todos', values: [] },
        ...todos.map((t) => ({
          statement:
            'INSERT INTO todos (id, title, completed) VALUES (?, ?, ?)',
          values: [t.id, t.title, t.completed ? 1 : 0],
        })),
      ],
      true, // une seule transaction : tout ou rien
    );
    await this.persist();
  }

  // Insère la tâche, ou la met à jour si l'id existe déjà
  async upsert(todo: Todo) {
    const db = await this.getDb();
    await db.run(
      `INSERT INTO todos (id, title, completed) VALUES (?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET title = excluded.title, completed = excluded.completed`,
      [todo.id, todo.title, todo.completed ? 1 : 0],
    );
    await this.persist();
  }

  async remove(id: Todo['id']) {
    const db = await this.getDb();
    await db.run('DELETE FROM todos WHERE id = ?', [id]);
    await this.persist();
  }
}
