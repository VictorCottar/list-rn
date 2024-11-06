import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect, useMemo } from "react";
import { useTask } from "../hooks/tasks";
import { PriorityFilter } from "../components/priorityFilter";
import { HeaderTasksCompleted } from "../components/headers/headerTasksCompleted";
import { TaskList } from "../components/taskList";
import { Task } from "../types/task";
import { CompletedTaskDetail } from "../components/completedTaskDetail";

export default function TaskCompleted() {
  const { username } = useLocalSearchParams();
  const { getAllTasksCompleted } = useTask();
  const usernameString = Array.isArray(username) ? username[0] : username || '';

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    if (!selectedPriority) return tasks;
    return tasks.filter(task => task.priority === selectedPriority);
  }, [tasks, selectedPriority]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksCompleteds = await getAllTasksCompleted();
        setTasks(tasksCompleteds);
      } catch (error) {
        console.error("erro ao carregar tarefas:", error);
      }
    };
    loadTasks();
  }, []);

  return (
    <View className="flex-1 items-center font-archivo">
      <HeaderTasksCompleted username={usernameString} />

      <PriorityFilter
        selectedPriority={selectedPriority}
        onSelectPriority={setSelectedPriority}
      />

      <View className="flex flex-row justify-end w-11/12 mt-2">
        <Text className="text-sm text-gray-500">
          {filteredTasks.length} {filteredTasks.length === 1 ? 'tarefa' : 'tarefas'}
        </Text>
      </View>

      <TaskList
        tasks={filteredTasks}
        onTaskPress={setSelectedTask}
      />

      <CompletedTaskDetail
        task={selectedTask}
        visible={!!selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </View>
  );
}