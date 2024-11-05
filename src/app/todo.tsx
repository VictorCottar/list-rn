import { View } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from 'expo-router';
import { FooterTodo } from "../components/footers/footerTodo";
import { HeaderTodo } from "../components/headers/headerTodo";
import { useTask } from "../hooks/tasks";
import { TaskList } from "../components/taskList";
import { AddTaskModal } from "../components/addTaskModal";
import { TaskDetailModal } from "../components/taskDetailModal";
import { Task } from "../types/task";

export default function Todo() {
  const { username } = useLocalSearchParams();
  const { addTask, setCompletedTask, getAllTasks } = useTask();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const priorityOptions = [
    { label: 'alta', value: 'alta' },
    { label: 'média', value: 'média' },
    { label: 'baixa', value: 'baixa' },
  ];

  const handleAddTask = async () => {
    if (newTaskTitle !== '' && newTaskDescription !== '' && priority !== '') {
      const newTask: Task = {
        id: tasks.length + 1,
        title: newTaskTitle,
        description: newTaskDescription,
        priority: priority,
        completed: false
      };

      try {
        await addTask(newTask);
        setTasks([...tasks, newTask]);
        setModalVisible(false);
        setNewTaskTitle('');
        setNewTaskDescription('');
        setPriority('');
      } catch (error) {
        console.error("erro ao adicionar tarefa:", error);
        alert("erro ao salvar a tarefa.");
      }
    } else {
      alert("você precisa preencher todos os campos");
    }
  };

  const handleCompleteTask = async () => {
    if (selectedTask) {
      try {
        await setCompletedTask(selectedTask.id);
        const updatedTasks = tasks.map(task =>
          task.id === selectedTask.id ? { ...task, completed: true } : task
        );
        setTasks(updatedTasks);
        setSelectedTask(null);
      } catch (error) {
        console.error("erro ao concluir tarefa:", error);
        alert("erro ao concluir a tarefa.");
      }
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await getAllTasks();
        setTasks(savedTasks);
      } catch (error) {
        console.error("erro ao carregar tarefas:", error);
      }
    };
    loadTasks();
  }, []);

  return (
    <View className='flex-1 items-center font-archivo'>
      <HeaderTodo username={username as string} />

      <View className="flex justify-center items-center w-full h-2/3 mt-8 space-y-4">
        <TaskList
          tasks={tasks}
          onTaskPress={setSelectedTask}
        />

        <AddTaskModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleAddTask}
          title={newTaskTitle}
          setTitle={setNewTaskTitle}
          description={newTaskDescription}
          setDescription={setNewTaskDescription}
          priority={priority}
          setPriority={setPriority}
          priorityOptions={priorityOptions}
        />

        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onComplete={handleCompleteTask}
        />
      </View>

      <FooterTodo setModalVisible={setModalVisible} />
    </View>
  );
}