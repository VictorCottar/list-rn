import { type SQLiteDatabase }  from 'expo-sqlite';

export async function setupDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    ); 
  `);
}