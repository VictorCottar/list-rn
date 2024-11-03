import { View, Text, TouchableOpacity, FlatList, TextInput, Modal } from "react-native";
import { useEffect } from "react";
import { useLocalSearchParams } from 'expo-router';
import { FooterTodo } from "../components/footers/footerTodo";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import { HeaderTodo } from "../components/headers/headerTodo";
import { useTask } from "../database/tasks";

export default function Todo() {
  const { username } = useLocalSearchParams();
  const { addTask, setCompletedTask, getAllTasks } = useTask();

  type Task = {
    id: number;
    title: string;
    description: string;
    priority: string;
    completed: boolean;
  };

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
        priority: (priority),
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

  function handleTaskPress(task: Task) {
    setSelectedTask(task);
  }

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await getAllTasks();
        setTasks(savedTasks);  // Atualiza o estado com as tarefas recuperadas
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

        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="w-11/12 h-16 border-2 border-b-4 border-r-4 rounded-sm shadow-shape p-1 mt-4 ml-4 overflow-hidden justify-center "
              onPress={() => handleTaskPress(item)}
            >
              <Text className="text-lg font-medium ml-3" numberOfLines={1} ellipsizeMode="tail">
                {item.title} - {item.priority}
              </Text>
            </TouchableOpacity>

          )}
          style={{ width: '93%', marginLeft: 2 }}
        />


        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View className='flex flex-row justify-between items-end w-full h-24 border-b-2 bg-black'>
            <Text className="text-3xl font-medium text-white left-24">adicionar tarefa</Text>
            <TouchableOpacity
              className="absolute top-14 right-5 p-2 rounded-full"
              onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={32} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex-1 justify-center items-center bg-white">
            <View className="w-10/12 bg-white p-5 border-2 border-r-4 border-b-4 rounded-sm space-y-2 mb-24">
              <Text className="text-2xl font-medium">título da tarefa</Text>
              <TextInput
                placeholder="título da tarefa"
                className='border-2 border-r-4 border-b-4 h-12 w-70 p-2 rounded-sm shadow-shape'
                value={newTaskTitle}
                onChangeText={setNewTaskTitle}
              />
              <Text className="text-2xl font-medium">descrição da tarefa</Text>
              <TextInput
                placeholder="descrição da tarefa"
                className='border-2 border-r-4 border-b-4 h-20 w-70 p-2 rounded-sm shadow-shape'
                value={newTaskDescription}
                onChangeText={setNewTaskDescription}
                numberOfLines={3}

              />

              <Text className="text-2xl font-medium">prioridade</Text>
              <View className="flex justify-center items-center">
                <Dropdown
                  className="w-full border-2 border-r-4 border-b-4 h-12 p-2 rounded-sm shadow-shape"
                  data={priorityOptions}
                  labelField="label"
                  valueField="value"
                  placeholder="selecione a prioridade"
                  value={priority}
                  onChange={item => setPriority(item.value)}
                />
              </View>

              <TouchableOpacity
                className='flex justify-center items-center border-2 border-r-4 border-b-4 h-12 w-70 mt-4 p-2 rounded-sm shadow-shape'
                onPress={handleAddTask}
              >
                <Text className="text-base font-medium">salvar tarefa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
                  onPress={handleCompleteTask}
                >
                  <Text className="text-base font-medium">concluir tarefa</Text>
                </TouchableOpacity>

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

      <FooterTodo setModalVisible={setModalVisible} />

    </View>
  );
}