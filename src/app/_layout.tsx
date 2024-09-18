import { Slot } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { setupDatabase } from '../database/database';

export default function Layout() {
  return (
    <SQLiteProvider databaseName='list.db' onInit={setupDatabase}>
      <Slot />
    </SQLiteProvider>
  );
}