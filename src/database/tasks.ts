import { useSQLiteContext } from "expo-sqlite";

export type Task = {
  id?: number;
  title: string;
  description: string;
  priority: number;
  completed: boolean;
}

export function useTask() {
  const database = useSQLiteContext();

  async function addTask(task: Task) {
    const statement = await database.prepareAsync(
      "INSERT INTO Tasks (title, description, priority, completed) VALUES ($title, $description, $priority, $completed)"
    );

    try {
      const result = await statement.executeAsync({
        $title: task.title,
        $description: task.description,
        $priority: task.priority,
        $completed: task.completed ? 1 : 0,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  // tela de logout
  async function countTasksCompleted() {
    try {
      const result = await database.execAsync("SELECT COUNT(*) FROM Tasks WHERE completed = 1");
      return result;
    } catch (error) {
      throw error;
    }

  }

  // setar como completa para que seja possível exibir na tela tasks.tsx
  async function setCompletedTask(taskId: number) {
    try {
      const statement = await database.prepareAsync("UPDATE Tasks SET completed = 1 WHERE id = $id");
      const result = await statement.executeAsync({ $id: taskId });
      return result;
    } catch (error) {
      throw error;
    }
  }
  

  // exibir na tela tasks.tsx
  async function getAllTasksCompleted() {
    try {
      const result = await database.execAsync("SELECT * FROM Tasks WHERE completed = 1");
      return result;
    } catch (error) {
      throw error;
    }

  }

  return { addTask, countTasksCompleted, setCompletedTask, getAllTasksCompleted };
}