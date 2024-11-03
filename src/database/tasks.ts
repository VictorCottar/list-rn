import { useSQLiteContext } from "expo-sqlite";

export type Task = {
  id?: number;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

interface ITask {
  id: number;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
};


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
  async function countTasksCompleted(): Promise<number> {
    try {
      // Especifica o tipo do resultado como um objeto com uma propriedade "COUNT(*)"
      const result = await database.getFirstAsync("SELECT COUNT(*) as count FROM Tasks WHERE completed = 1") as { count: number };
      
      // Retorna o valor de `count`
      return result.count;
    } catch (error) {
      console.error('Erro ao contar tarefas:', error);
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

  // exibir na tela tasksCompleted.tsx
  async function getAllTasksCompleted(): Promise<ITask[]> {
    try {
      const result = await database.getAllAsync("SELECT * FROM Tasks WHERE completed = 1 ORDER BY id DESC");
      return result.map((task: any ) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        completed: !!task.completed,
      }));
    } catch (error) {
      throw error;
    }
  }

  // exibir na tela tasks.tsx 
  async function getAllTasks(): Promise<ITask[]> {
    try {
      const result = await database.getAllAsync("SELECT * FROM Tasks WHERE COMPLETED = 0");
      return result.map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        completed: !!task.completed,
      }));
    } catch (error) {
      throw error;
    }
  }

  return { addTask, countTasksCompleted, setCompletedTask, getAllTasksCompleted, getAllTasks };
}