import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTask } from "../hooks/tasks";
import { PriorityFilter } from "../components/priorityFilter";
import { Task } from "../types/task";

export default function TaskCompleted() {
  const { username } = useLocalSearchParams();
  const { getAllTasksCompleted } = useTask();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

  // filtra as tarefas com base na prioridade selecionada
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

  function handleTaskPress(task: Task) {
    setSelectedTask(task);
  }

  return (
    <View className="flex-1 items-center font-archivo">
      <View className='flex flex-row items-end w-full h-24 border-b-2 bg-black'>
        <View className="flex flex-row justify-between items-end ml-10 w-60">
          <TouchableOpacity
            className="flex justify-center items-start h-16 w-16 top-4 right-5"
            onPress={() => router.push({ pathname: '/todo', params: { username } })}
          >
            <AntDesign name="back" size={24} color="white" />
          </TouchableOpacity>
          <Text className='text-3xl font-medium text-white right-11'>tarefas</Text>
        </View>
      </View>

      <View className="flex justify-end items-center w-full h-12 mt-3">
        <Text className="text-xl font-medium">tarefas concluídas</Text>
      </View>

      <PriorityFilter
        selectedPriority={selectedPriority}
        onSelectPriority={setSelectedPriority}
      />

      <View className="flex flex-row justify-end w-11/12 mt-2">
        <Text className="text-sm text-gray-500">
          {filteredTasks.length} {filteredTasks.length === 1 ? 'tarefa' : 'tarefas'}
        </Text>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="w-11/12 h-16 border-2 border-b-4 border-r-4 rounded-sm shadow-shape p-1 mt-4 ml-4 overflow-hidden justify-center"
            onPress={() => handleTaskPress(item)}
          >
            <Text className="text-lg font-medium ml-3" numberOfLines={1} ellipsizeMode="tail">
              {item.title} - {item.priority}
            </Text>
          </TouchableOpacity>
        )}
        style={{ width: '93%', marginLeft: 2, marginTop: 10 }}
      />

      <Modal visible={!!selectedTask} transparent={true} animationType="slide">
        <View className='flex flex-row justify-center items-end w-full h-24 border-b-2 bg-black'>
          <Text className="text-3xl font-medium text-white">detalhes da tarefa</Text>
        </View>

        <View className="flex-1 justify-center items-center bg-white">
          <View className="flex flex-col justify-between w-10/12 h-1/2 bg-white p-5 border-2 border-r-4 border-b-4 rounded-sm space-y-2 mb-24">
            <View className="flex flex-col space-y-3">
              <Text className="text-2xl font-semibold text-center underline">{selectedTask?.title}</Text>
              <Text className="text-base mt-2">{selectedTask?.description}</Text>
              <Text className="text-base mt-2">prioridade da tarefa: {selectedTask?.priority}</Text>
            </View>

            <View className="flex flex-col space-y-6 mt-14">
              <TouchableOpacity
                className='flex justify-center items-center border-2 border-r-4 border-b-4 h-12 w-70 mt-4 p-2 rounded-sm shadow-shape'
                onPress={() => setSelectedTask(null)}
              >
                <Text className="text-base font-medium">voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}